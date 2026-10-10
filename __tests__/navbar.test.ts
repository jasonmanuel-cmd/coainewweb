import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement("a", { href, ...props }, children)
}));
vi.mock("next/image", () => ({
  default: ({ priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
    React.createElement("img", props)
}));

import { RevampNavbar } from "@/components/revamp/RevampNavbar";

describe("responsive navigation", () => {
  let host: HTMLDivElement;

  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    host = document.createElement("div");
    document.body.append(host);
  });

  afterEach(() => {
    host.remove();
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
  });

  it("opens and closes the mobile navigation and its Explore menu", async () => {
    const root = createRoot(host);
    await act(async () => root.render(React.createElement(RevampNavbar)));

    const menuButton = host.querySelector<HTMLButtonElement>('button[aria-label="Open navigation menu"]');
    expect(menuButton).not.toBeNull();
    expect(menuButton?.getAttribute("aria-expanded")).toBe("false");

    await act(async () => menuButton?.click());
    expect(menuButton?.getAttribute("aria-expanded")).toBe("true");
    expect(host.querySelector(".revamp-nav-links")?.classList.contains("is-open")).toBe(true);

    const exploreButton = Array.from(host.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Explore")
    );
    expect(exploreButton).not.toBeUndefined();
    await act(async () => exploreButton?.click());
    expect(exploreButton?.getAttribute("aria-expanded")).toBe("true");
    expect(host.querySelector(".revamp-nav-more")?.classList.contains("is-open")).toBe(true);

    await act(async () => menuButton?.click());
    expect(menuButton?.getAttribute("aria-expanded")).toBe("false");

    await act(async () => root.unmount());
  });
});
