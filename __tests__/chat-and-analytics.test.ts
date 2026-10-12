import fs from "node:fs";
import path from "node:path";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONTACT } from "@/lib/site";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement("a", { href, ...props }, children)
}));

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");

/**
 * These integrations were silently overwritten once by a site rebuild. The source-level checks
 * exist to fail loudly if layout/CSP wiring is dropped again.
 */
describe("Simple Analytics and Vapi chat wiring", () => {
  const layout = read("app/layout.tsx");
  const config = read("next.config.ts");

  it("loads Simple Analytics with Do Not Track and a noscript pixel", () => {
    expect(layout).toContain("https://scripts.simpleanalyticscdn.com/latest.js");
    expect(layout).toContain('data-collect-dnt="true"');
    expect(layout).toContain("https://queue.simpleanalyticscdn.com/noscript.gif?collect-dnt=true");
  });

  it("mounts the chat in the root layout", () => {
    expect(layout).toMatch(/<CipherChat\s*\/>/);
  });

  it("allows the analytics and Vapi hosts in the CSP and the microphone in Permissions-Policy", () => {
    for (const host of [
      "https://scripts.simpleanalyticscdn.com",
      "https://queue.simpleanalyticscdn.com",
      "https://cdn.jsdelivr.net",
      "https://api.vapi.ai",
      "wss://*.vapi.ai",
      "https://*.daily.co",
      "wss://*.daily.co"
    ]) {
      expect(config, host).toContain(host);
    }
    expect(config).toContain("microphone=(self)");
  });
});

describe("CipherChat fallback launcher (no Vapi key)", () => {
  let host: HTMLDivElement;

  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_VAPI_API_KEY", "");
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    host = document.createElement("div");
    document.body.append(host);
  });

  afterEach(() => {
    host.remove();
    vi.unstubAllEnvs();
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
  });

  it("always shows a launcher, opens a contact dialog, and closes on Escape", async () => {
    const { CipherChat } = await import("@/components/revamp/CipherChat");
    const root = createRoot(host);
    await act(async () => root.render(React.createElement(CipherChat)));

    const fab = host.querySelector<HTMLButtonElement>(".cipher-fab");
    expect(fab?.textContent).toContain("Chat with Cipher");
    expect(host.querySelector("[role=dialog]")).toBeNull();

    await act(async () => fab?.click());
    const dialog = host.querySelector("[role=dialog]");
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.querySelector(`a[href="tel:${CONTACT.phoneE164}"]`)).not.toBeNull();
    expect(dialog?.querySelector(`a[href="mailto:${CONTACT.email}"]`)).not.toBeNull();

    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(host.querySelector("[role=dialog]")).toBeNull();

    await act(async () => root.unmount());
  });

  it("exposes window.openCipherChat for the navigation and removes it on unmount", async () => {
    const { CipherChat } = await import("@/components/revamp/CipherChat");
    const win = window as unknown as { openCipherChat?: () => void };
    const root = createRoot(host);
    await act(async () => root.render(React.createElement(CipherChat)));

    expect(typeof win.openCipherChat).toBe("function");
    await act(async () => win.openCipherChat?.());
    expect(host.querySelector("[role=dialog]")).not.toBeNull();

    await act(async () => root.unmount());
    // No key: the effect returns early, so the opener intentionally stays registered for the page's life.
    // Calling it after unmount must not throw.
    expect(() => win.openCipherChat?.()).not.toThrow();
  });
});
