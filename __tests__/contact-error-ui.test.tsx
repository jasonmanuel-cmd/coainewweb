import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const widget = vi.hoisted(() => ({ onToken: undefined as undefined | ((token: string) => void), mounts: 0 }));
vi.mock("@/components/security/TurnstileField", () => ({ TurnstileField: (props: { onToken: (token: string) => void }) => {
  widget.onToken = props.onToken;
  React.useEffect(() => { widget.mounts++; props.onToken("fresh-synthetic-token"); }, []);
  return null;
} }));
vi.mock("@/lib/crm/attribution", () => ({ inquiryAttribution: () => ({}) }));
vi.mock("@/lib/forms/submission-identity", () => ({ submissionIdentity: () => "00000000-0000-4000-8000-000000000001", finishSubmission: vi.fn() }));
import { ContactMarketingForm } from "@/components/contact/ContactMarketingForm";

let host: HTMLDivElement, root: Root;
beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "synthetic-key");
  widget.mounts = 0;
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: "Please check your phone and try again." }), { status: 400 })));
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

it("keeps the server error visible and focused after automatic verification succeeds again", async () => {
  await act(async () => root.render(React.createElement(ContactMarketingForm)));
  const form = host.querySelector("form")!;
  host.querySelector<HTMLInputElement>('[name="first_name"]')!.value = "Test";
  await act(async () => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(widget.mounts).toBe(2);
  const alert = host.querySelector<HTMLElement>('[role="alert"]')!;
  expect(alert.textContent).toContain("Please check your phone");
  expect(document.activeElement).toBe(alert);
  expect(host.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled).toBe(false);
  expect(host.querySelector<HTMLInputElement>('[name="first_name"]')!.value).toBe("Test");
  await act(async () => widget.onToken!("another-fresh-token"));
  expect(host.querySelector('[role="alert"]')?.textContent).toContain("Please check your phone");
  expect(fetch).toHaveBeenCalledOnce();
  expect(host.textContent).not.toContain("MESSAGE RECEIVED");
});

it("clears the old error only when a new submission actually starts, then shows a real success", async () => {
  await act(async () => root.render(React.createElement(ContactMarketingForm)));
  const form = host.querySelector("form")!;
  await act(async () => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(host.querySelector('[role="alert"]')).not.toBeNull();
  let finish!: (value: Response) => void;
  vi.mocked(fetch).mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
  await act(async () => form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(host.querySelector('[role="alert"]')).toBeNull();
  expect(host.querySelector<HTMLButtonElement>('[type="submit"]')!.disabled).toBe(true);
  await act(async () => finish(new Response('{"ok":true}')));
  expect(host.textContent).toContain("MESSAGE RECEIVED");
});
