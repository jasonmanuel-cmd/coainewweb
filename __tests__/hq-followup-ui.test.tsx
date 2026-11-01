import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { HqWorkspace } from "@/components/hq/HqWorkspace";
import { readFileSync, writeFileSync } from "node:fs";
const fixture = { id: "00000000-0000-4000-8000-000000000001", business_name: "Synthetic contractor", first_name: "Demo", email: "unit@example.com", phone: "6615550100", business_website: "none", source: "intake", intent: "build", industry: "", sms_consent: "no", stage: "new", notes: "Existing note", follow_up_on: "2020-01-01", created_at: "2020-01-01T00:00:00Z", updated_at: "2020-01-01T00:00:00Z", details: { utm_source: "facebook" } };
let host: HTMLDivElement, root: Root;
let patch: Record<string, unknown> | undefined;
beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  patch = undefined; host = document.createElement("div"); document.body.append(host); root = createRoot(host);
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    if (init?.method === "PATCH") { patch = JSON.parse(init.body as string); return new Response('{"ok":true}'); }
    const body = url.endsWith("session") ? { capture_enabled: true } : url.includes("notifications") ? { enabled: true, notifications: [{ lead_id: fixture.id, business_name: fixture.business_name, source: "intake", attempts: 1, status: "unconfirmed" }] } : url.includes("activity") ? { days: [] } : { leads: [fixture], total: 1 };
    return new Response(JSON.stringify(body));
  }));
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });
it("requests full-inbox queues and makes completion a visible, explicit save", async () => {
  await act(async () => root.render(React.createElement(HqWorkspace)));
  const queue = host.querySelector<HTMLSelectElement>('[aria-label="Follow-up queue"]')!;
  await act(async () => { queue.value = "overdue"; queue.dispatchEvent(new Event("change", { bubbles: true })); });
  expect(vi.mocked(fetch).mock.calls.some(([url]) => String(url).includes("queue=overdue"))).toBe(true);
  expect(host.textContent).toContain("Overdue since 2020-01-01");
  await act(async () => host.querySelector<HTMLButtonElement>(".hq-lead")!.click());
  expect(host.textContent).toContain("do not text"); expect(host.textContent).toContain("facebook");
  const complete = [...host.querySelectorAll("button")].find(b => b.textContent === "Record follow-up completion")!;
  await act(async () => complete.click());
  expect(host.textContent).toContain("Save lead to retain it"); expect(patch).toBeUndefined();
  // Optional static visual fixture for local QA; no production API or authentication bypass.
  if (process.env.COAI_QA_HTML) writeFileSync(process.env.COAI_QA_HTML, `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>COAI synthetic HQ visual fixture</title><style>body{margin:0;background:#09110e}*{box-sizing:border-box}${readFileSync("app/hq/hq.css", "utf8")}</style></head><body>${host.innerHTML}</body></html>`);
  expect(host.querySelector<HTMLInputElement>('input[type="date"]')!.value).toBe("");
  await act(async () => host.querySelector(".hq-detail form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(patch).toMatchObject({ follow_up_on: null, updated_at: fixture.updated_at });
  expect(patch?.notes).toContain("Existing note"); expect(patch?.notes).toContain("Completed follow-up scheduled for 2020-01-01");
  expect(host.textContent).toContain("Automatic retries are off");
  expect(host.textContent).toContain("Acceptance unconfirmed");
});
