"use client";

import React, { useEffect, useMemo, useState } from "react";

type SplashProps = {
  /** Session-only key. */
  storageKey?: string;
  /** How long to show before auto-dismissing. */
  durationMs?: number;
  /** Called after exit animation completes. */
  onDone?: () => void;
};

type Phase = "enter" | "visible" | "exit";

export function Splash({
  storageKey = "coai:splash:v1",
  durationMs = 3500,
  onDone,
}: SplashProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    // Session-only: show once per tab/session.
    try {
      const seen = sessionStorage.getItem(storageKey);
      if (seen === "1") return;
      sessionStorage.setItem(storageKey, "1");
    } catch {
      // If storage is blocked, still show the splash.
    }

    setShouldRender(true);
    setPhase("enter");

    const enterMs = prefersReducedMotion ? 0 : 200;
    const t1 = window.setTimeout(() => setPhase("visible"), enterMs);
    const t2 = window.setTimeout(() => setPhase("exit"), enterMs + durationMs);
    const exitMs = prefersReducedMotion ? 0 : 320;
    const t3 = window.setTimeout(() => {
      setShouldRender(false);
      onDone?.();
    }, enterMs + durationMs + exitMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [durationMs, onDone, prefersReducedMotion, storageKey]);

  const dismissNow = () => {
    if (!shouldRender) return;
    setPhase("exit");
    const exitMs = prefersReducedMotion ? 0 : 220;
    window.setTimeout(() => {
      setShouldRender(false);
      onDone?.();
    }, exitMs);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`splash splash--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
      onClick={dismissNow}
    >
      <div className="splash__backdrop" aria-hidden="true" />
      <div className="splash__frame">
        <div className="splash__glass" />
        <div className="splash__content">
          <div className="splash__badge" aria-hidden="true">
            <span className="splash__badgeDot" />
            <span className="splash__badgeText">COAI SYSTEM ONLINE</span>
          </div>

          <div className="splash__mark" aria-hidden="true">
            <span className="splash__shield" />
          </div>

          <h2 className="splash__title">Welcome to where the future lives</h2>
          <p className="splash__sub">and tradesmen succeed.</p>

          <div className="splash__hint">Tap to skip</div>
        </div>
      </div>
    </div>
  );
}
