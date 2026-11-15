import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/link", () => ({ default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => React.createElement("a", { href, ...props }, children) }));
import { LeadResponseDemo } from "@/components/demo/LeadResponseDemo";

describe("lead response demo", () => {
  let host: HTMLDivElement;
  let root: Root;
  beforeEach(async () => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    host = document.createElement("div"); document.body.append(host); root = createRoot(host);
    await act(async () => root.render(React.createElement(LeadResponseDemo)));
  });
  afterEach(async () => { await act(async () => root.unmount()); host.remove(); vi.unstubAllGlobals(); });
  async function click(text: string) {
    const button = [...host.querySelectorAll("button")].find((item) => item.textContent === text);
    expect(button).toBeDefined(); await act(async () => button!.click());
  }
  it("shows the complete handoff and resets without sending anything", async () => {
    const network = vi.fn(); vi.stubGlobal("fetch", network);
    await click("Simulate a missed call");
    expect(host.textContent).toContain("Message preview only · not sent");
    await click("Add the job details");
    await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    expect(host.textContent).toContain("Ready for an owner callback");
    expect(host.textContent).toContain("Fence repair");
    expect(host.textContent).toContain("No appointment has been booked");
    expect(network).not.toHaveBeenCalled();
    expect(host.querySelector('a[href="/intake?pkg=2"]')).not.toBeNull();
    await click("Start again");
    expect(host.textContent).not.toContain("Ready for an owner callback");
  });
  it("routes an out-of-area request to human review instead of claiming a booking", async () => {
    await click("Simulate a missed call"); await click("Add the job details");
    const select = host.querySelector<HTMLSelectElement>("#demo-zip")!;
    await act(async () => { select.value = "Outside this example service area"; select.dispatchEvent(new Event("change", { bubbles: true })); });
    await act(async () => host.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    expect(host.textContent).toContain("Needs service-area review");
    expect(host.textContent).toContain("Confirm the job is in your service area");
  });
});
