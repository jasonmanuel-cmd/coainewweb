import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { HqWorkspace } from "@/components/hq/HqWorkspace";

const lead = { id: "00000000-0000-4000-8000-000000000001", business_name: "First synthetic lead", first_name: "Demo", email: "unit@example.com", phone: "", business_website: "none", source: "intake", intent: "build", industry: "", sms_consent: "no", stage: "new", notes: "Original note", follow_up_on: "2020-01-01", created_at: "2020-01-01T00:00:00Z", updated_at: "2020-01-01T00:00:00Z", details: {} };
let host: HTMLDivElement, root: Root;
let finishSave: (response: Response) => void;
let confirm: ReturnType<typeof vi.fn>;
const button = (text: string) => [...host.querySelectorAll('button')].find(b => b.textContent === text)!;
const change = async (element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, value: string) => {
  await act(async () => {
    const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
  });
};
const selectLead = async () => act(async () => host.querySelector<HTMLButtonElement>('.hq-lead')!.click());
const submit = async () => act(async () => host.querySelector('.hq-detail form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
const unload = () => { const event = new Event('beforeunload', { cancelable: true }); window.dispatchEvent(event); return event.defaultPrevented; };
beforeEach(async () => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div'); document.body.append(host); root = createRoot(host);
  confirm = vi.fn(() => false); vi.stubGlobal('confirm', confirm);
  vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
    if (init?.method === 'PATCH') return new Promise<Response>(resolve => { finishSave = resolve; });
    const body = url.endsWith('session') ? { capture_enabled: true } : url.includes('notifications') ? { enabled: true, notifications: [] } : url.includes('activity') ? { days: [] } : { leads: [lead, { ...lead, id: '00000000-0000-4000-8000-000000000002', business_name: 'Second synthetic lead' }], total: 101 };
    return new Response(JSON.stringify(body));
  }));
  await act(async () => root.render(React.createElement(HqWorkspace)));
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

it.each(['notes', 'date', 'stage', 'completion'] as const)('protects unsaved %s on selection and unload', async field => {
  await selectLead(); expect(unload()).toBe(false);
  if (field === 'notes') await change(host.querySelector('textarea')!, 'Draft note');
  if (field === 'date') await change(host.querySelector('input[type=date]')!, '2030-01-01');
  if (field === 'stage') await change(host.querySelector('.hq-detail select')!, 'contacted');
  if (field === 'completion') await act(async () => button('Record follow-up completion').click());
  expect(host.textContent).toContain('Unsaved changes'); expect(unload()).toBe(true);
  await act(async () => host.querySelectorAll<HTMLButtonElement>('.hq-lead')[1].click());
  expect(confirm).toHaveBeenCalledOnce(); expect(host.querySelector('.hq-detail h2')!.textContent).toBe(lead.business_name);
  confirm.mockReturnValue(true);
  await act(async () => host.querySelectorAll<HTMLButtonElement>('.hq-lead')[1].click());
  expect(host.querySelector('.hq-detail h2')!.textContent).toBe('Second synthetic lead'); expect(unload()).toBe(false);
});

it('keeps the draft when filters, search, paging, refresh, home and logout are canceled', async () => {
  await act(async () => button('Next').click());
  await selectLead(); await act(async () => button('Record follow-up completion').click());
  const requests = vi.mocked(fetch).mock.calls.length;
  await change(host.querySelector('[aria-label="Follow-up queue"]')!, 'overdue');
  await change(host.querySelector('.hq-toolbar select')!, 'contacted');
  await change(host.querySelector('#hq-search')!, 'demo');
  await act(async () => host.querySelector('.hq-toolbar form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  for (const label of ['Previous', 'Next', 'Refresh inbox', 'Sign out']) await act(async () => button(label).click());
  const homeClick = new MouseEvent('click', { bubbles: true, cancelable: true });
  await act(async () => host.querySelector('.hq-header a')!.dispatchEvent(homeClick));
  expect(homeClick.defaultPrevented).toBe(true); expect(confirm).toHaveBeenCalledTimes(8);
  expect(vi.mocked(fetch).mock.calls).toHaveLength(requests);
  expect(host.textContent).toContain('Page 2'); expect(host.querySelector('textarea')!.value).toContain('Completed follow-up');
  expect(host.querySelector<HTMLSelectElement>('[aria-label="Follow-up queue"]')!.value).toBe('all');
});

it('blocks navigation and duplicate saves until a delayed save settles, then preserves a failed draft for retry', async () => {
  await selectLead(); await change(host.querySelector('textarea')!, 'Draft note'); await submit(); await submit();
  const requests = vi.mocked(fetch).mock.calls.length;
  await act(async () => host.querySelectorAll<HTMLButtonElement>('.hq-lead')[1].click());
  for (const label of ['Next', 'Refresh inbox', 'Sign out']) await act(async () => button(label).click());
  await change(host.querySelector('[aria-label="Follow-up queue"]')!, 'due');
  expect(confirm).not.toHaveBeenCalled(); expect(vi.mocked(fetch).mock.calls).toHaveLength(requests);
  expect(unload()).toBe(true); expect(host.querySelector('.hq-detail h2')!.textContent).toBe(lead.business_name);
  await act(async () => finishSave(new Response(JSON.stringify({ error: 'Storage unavailable' }), { status: 503 })));
  expect(host.textContent).toContain('Storage unavailable'); expect(host.querySelector('textarea')!.value).toBe('Draft note');
  await act(async () => host.querySelectorAll<HTMLButtonElement>('.hq-lead')[1].click()); expect(confirm).toHaveBeenCalledOnce();
  await submit();
  await act(async () => finishSave(new Response('{"ok":true}')));
  expect(unload()).toBe(false); expect(host.textContent).toContain('Select an inquiry');
  await act(async () => host.querySelectorAll<HTMLButtonElement>('.hq-lead')[1].click());
  expect(host.querySelector('.hq-detail h2')!.textContent).toBe('Second synthetic lead');
  const patches = vi.mocked(fetch).mock.calls.filter(([, init]) => init?.method === 'PATCH');
  expect(patches).toHaveLength(2); expect(JSON.parse(patches[1][1]!.body as string)).toMatchObject({ id: lead.id, notes: 'Draft note' });
});

it('retains the draft after failed sign-out and prevents edits while sign-out is pending', async () => {
  await selectLead(); await change(host.querySelector('textarea')!, 'Draft before logout');
  confirm.mockReturnValue(true);
  let finishLogout!: (response: Response) => void;
  vi.mocked(fetch).mockImplementationOnce(() => new Promise<Response>(resolve => { finishLogout = resolve; }));
  await act(async () => button('Sign out').click());
  expect(host.querySelector('textarea')!.disabled).toBe(true);
  expect(button('Save lead').disabled).toBe(true);
  await act(async () => finishLogout(new Response('{"error":"Unavailable"}', { status: 503 })));
  expect(host.textContent).toContain('Sign-out could not finish');
  expect(host.querySelector('textarea')!.value).toBe('Draft before logout');
  expect(host.querySelector('textarea')!.disabled).toBe(false); expect(unload()).toBe(true);
});
