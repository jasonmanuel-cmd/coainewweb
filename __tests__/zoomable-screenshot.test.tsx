import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ fill: _fill, sizes: _sizes, quality: _quality, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    sizes?: string;
    quality?: number;
  }) => React.createElement("img", props)
}));

import { ZoomableScreenshot } from "@/components/revamp/ZoomableScreenshot";

describe("zoomable Lead Engine screenshot", () => {
  let host: HTMLDivElement;
  let root: Root | null;
  let previousOverflow: string;

  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    previousOverflow = document.body.style.overflow;
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(() => {
    if (root) {
      act(() => root?.unmount());
      root = null;
    }
    document.body.style.overflow = previousOverflow;
    host.remove();
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT = false;
  });

  const renderScreenshot = async () => {
    await act(async () => {
      root?.render(
        React.createElement(ZoomableScreenshot, {
          src: "/projects/coai-lead-engine.webp",
          alt: "COAI Lead Engine dashboard screenshot",
          sizes: "50vw",
          className: "lead-engine-image-frame",
          imageClassName: "lead-engine-image"
        })
      );
    });
  };

  it("opens a full-size accessible dialog when clicked and closes from its button", async () => {
    await renderScreenshot();

    const previewButton = host.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');
    expect(previewButton).not.toBeNull();
    expect(previewButton?.style.position).toBe("relative");
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    await act(async () => previewButton?.click());
    const dialog = document.body.querySelector<HTMLDivElement>('[role="dialog"]');
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-label")).toContain("Enlarged screenshot");
    expect(dialog?.querySelector("img")?.getAttribute("src")).toBe("/projects/coai-lead-engine.webp");
    expect(document.body.style.overflow).toBe("hidden");

    const closeButton = dialog?.querySelector<HTMLButtonElement>(".zoomable-screenshot-close");
    expect(document.activeElement).toBe(closeButton);
    await act(async () => closeButton?.click());
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(document.activeElement).toBe(previewButton);
  });

  it("closes when the backdrop is clicked or Escape is pressed", async () => {
    await renderScreenshot();
    const previewButton = host.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]');

    await act(async () => previewButton?.click());
    const backdrop = document.body.querySelector<HTMLDivElement>(".zoomable-screenshot-backdrop");
    expect(backdrop).not.toBeNull();
    await act(async () => backdrop?.click());
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    await act(async () => previewButton?.click());
    await act(async () => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });
});
