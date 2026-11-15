import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { expect, it, vi } from "vitest";

let widget: Record<string, (...args: string[]) => void>;
vi.mock("@marsidev/react-turnstile", () => ({ Turnstile: (props: typeof widget) => { widget = props; return null; } }));
import { TurnstileField } from "@/components/security/TurnstileField";

it("invalidates a prior token on verification failure and keeps direct contact available", async () => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-only");
  const host = document.createElement("div"); const root = createRoot(host); const token = vi.fn();
  try {
    await act(async () => root.render(React.createElement(TurnstileField, { onToken: token })));
    expect(host.querySelector('a[href^="mailto:"]')).not.toBeNull();
    await act(async () => widget.onSuccess("prior-token"));
    await act(async () => widget.onUnsupported());
    expect(token).toHaveBeenLastCalledWith("");
    expect(host.querySelector('[role="alert"]')?.textContent).toContain("regular browser");
    await act(async () => widget.onSuccess("new-token"));
    expect(host.querySelector('[role="alert"]')).toBeNull();
    await act(async () => widget.onExpire());
    expect(token).toHaveBeenLastCalledWith("");
  } finally { await act(async () => root.unmount()); vi.unstubAllEnvs(); }
});
