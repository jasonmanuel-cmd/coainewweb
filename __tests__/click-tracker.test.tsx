import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/pricing" }));
import { ClickTracker } from "@/components/analytics/ClickTracker";
import { MobileCallBar } from "@/components/analytics/MobileCallBar";

describe("contact-action tracking", () => {
  let host: HTMLDivElement;
  let dl: Array<Record<string, unknown>>;
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    dl = [];
    (window as unknown as { dataLayer: unknown[] }).dataLayer = dl;
    host = document.createElement("div");
    document.body.append(host);
  });
  afterEach(() => { host.remove(); vi.restoreAllMocks(); });

  it("records phone, email, social and intake clicks with fixed labels only", async () => {
    const root = createRoot(host);
    await act(async () => root.render(
      <div>
        <ClickTracker />
        <a id="t" href="tel:+16616830228">Call</a>
        <a id="m" href="mailto:a@b.co">Mail</a>
        <a id="s" href="https://www.instagram.com/chaoticallyorganizedai661/">IG</a>
        <a id="i" href="/intake?pkg=website">Go</a>
        <a id="b" href="https://calendar.app.google/EPr6vGFuVZ7e7pEa7">Book</a>
        <a id="x" href="/about">About</a>
      </div>
    ));
    for (const id of ["t", "m", "s", "i", "b", "x"]) await act(async () => { host.querySelector<HTMLAnchorElement>(`#${id}`)!.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })); });
    expect(dl.map((e) => e.event)).toEqual(["phone_click", "email_click", "social_click", "cta_click", "booking_click"]);
    expect(dl[2]).toMatchObject({ network: "instagram", page: "/pricing" });
    expect(JSON.stringify(dl)).not.toContain("a@b.co");
  });

  it("shows the mobile call bar with a tel link", async () => {
    const root = createRoot(host);
    await act(async () => root.render(<MobileCallBar />));
    expect(host.querySelector<HTMLAnchorElement>(".mobile-call-bar a")?.getAttribute("href")).toBe("tel:+16616830228");
  });
});
