"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type SpotlightGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * One delegated pointer handler for a grid of spotlight cards. It writes CSS
 * variables directly (no React state or per-card listeners) and does nothing
 * on touch or when reduced motion is requested.
 */
export function SpotlightGrid({ children, className = "" }: SpotlightGridProps) {
  const activeCard = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useRef<boolean | null>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    if (prefersReducedMotion.current === null) {
      prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    if (prefersReducedMotion.current) return;

    const target = event.target instanceof Element
      ? event.target.closest<HTMLElement>("[data-spotlight-card]")
      : null;

    if (!target || !event.currentTarget.contains(target)) {
      activeCard.current?.classList.remove("is-spotlit");
      activeCard.current = null;
      return;
    }

    if (activeCard.current !== target) {
      activeCard.current?.classList.remove("is-spotlit");
      activeCard.current = target;
      target.classList.add("is-spotlit");
    }

    const bounds = target.getBoundingClientRect();
    target.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    target.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };

  const clearSpotlight = () => {
    activeCard.current?.classList.remove("is-spotlit");
    activeCard.current = null;
  };

  return (
    <div className={className} onPointerMove={handlePointerMove} onPointerLeave={clearSpotlight}>
      {children}
    </div>
  );
}
