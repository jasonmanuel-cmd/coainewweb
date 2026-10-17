import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const navigate = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: navigate }) }));
vi.mock("next/link", () => ({ default: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => React.createElement("a", { href, ...props }, children) }));
vi.mock("@/components/security/TurnstileField", () => ({ TurnstileField: ({ onToken }: { onToken: (value: string) => void }) => React.createElement("button", { type: "button", onClick: () => onToken("synthetic-token") }, "Complete test verification") }));
import { IntakeWizard } from "@/components/intake/IntakeWizard";
import { ContactMarketingForm } from "@/components/contact/ContactMarketingForm";

let host: HTMLDivElement;
let root: Root;
beforeEach(async () => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key");
  vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
  window.localStorage.clear(); navigate.mockClear();
  host = document.createElement("div"); document.body.append(host); root = createRoot(host);
  await act(async () => root.render(React.createElement(IntakeWizard, { packageInterest: "2" })));
});

it("prevents duplicate contact sends and preserves the form when delivery fails", async () => {
  await act(async () => root.render(React.createElement(ContactMarketingForm)));
  for (const [name, value] of Object.entries({ first_name: "Demo", business_name: "Example Contractor", phone: "6615550100", email: "demo@example.com", business_website: "none" })) {
    host.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value = value;
  }
  const verification = [...host.querySelectorAll("button")].find((item) => item.textContent === "Complete test verification")!;
  await act(async () => verification.click());
  let finish!: (value: Response) => void;
  const network = vi.fn(() => new Promise<Response>((resolve) => { finish = resolve; }));
  vi.stubGlobal("fetch", network);
  await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(host.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true);
  await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(network).toHaveBeenCalledTimes(1);
  await act(async () => finish(new Response(JSON.stringify({ error: "Delivery unavailable" }), { status: 502 })));
  expect(host.querySelector('[role="alert"]')?.textContent).toContain("Delivery unavailable");
  expect(host.querySelector<HTMLInputElement>('[name="email"]')!.value).toBe("demo@example.com");
  expect(host.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true);
});
afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

it("lets a build buyer skip the estimate and recover from a failed submission without losing contact details", async () => {
  async function click(text: string) {
    const button = [...host.querySelectorAll("button")].find((item) => item.textContent?.includes(text));
    expect(button).toBeDefined(); await act(async () => button!.click());
  }
  await click("Trades & Contractors"); await click("No website");
  await click("Skip the estimate");
  expect(host.querySelector<HTMLInputElement>('[name="business_website"]')!.value).toBe("none");
  expect(host.textContent).toContain("$997 to start / $1,000 at launch");
  for (const [name, value] of Object.entries({ first_name: "Demo", business_name: "Example Contractor", phone: "6615550100", email: "demo@example.com" })) {
    host.querySelector<HTMLInputElement>(`[name="${name}"]`)!.value = value;
  }
  await click("Complete test verification");
  const network = vi.fn(async () => new Response(JSON.stringify({ error: "Please try again." }), { status: 502 }));
  vi.stubGlobal("fetch", network);
  await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
  expect(host.querySelector('[role="alert"]')?.textContent).toContain("Please try again");
  expect(host.querySelector<HTMLInputElement>('[name="email"]')!.value).toBe("demo@example.com");
  expect(navigate).not.toHaveBeenCalled();
  const submit = host.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  expect(submit.disabled).toBe(true); // failed requests require a fresh verification token
  const [, options] = network.mock.calls[0] as unknown as [string, RequestInit];
  const body = JSON.parse(options.body as string);
  expect(body.package_interest).toBe("2");
  expect(body.form_type).toBe("build_inquiry");
  expect(body.sms_consent).toBe("no");
  expect(options.signal).toBeDefined();
});
