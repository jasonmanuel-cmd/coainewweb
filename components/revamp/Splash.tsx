"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type SplashProps = {
  storageKey?: string;
  durationMs?: number;
  onDone?: () => void;
};

type Phase = "enter" | "visible" | "door-open";

export function Splash({
  storageKey = "coai:splash:v1",
  durationMs = 4000,
  onDone,
}: SplashProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<Phase>("enter");

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(storageKey);
      if (seen === "1") return;
      sessionStorage.setItem(storageKey, "1");
    } catch {}

    setShouldRender(true);
    setPhase("enter");

    const enterMs = prefersReducedMotion ? 0 : 200;
    const t1 = window.setTimeout(() => setPhase("visible"), enterMs);
    const t2 = window.setTimeout(() => setPhase("door-open"), enterMs + durationMs);
    const exitMs = prefersReducedMotion ? 0 : 900;
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

  const dismiss = () => {
    if (!shouldRender || phase === "door-open") return;
    setPhase("door-open");
    const exitMs = prefersReducedMotion ? 0 : 900;
    window.setTimeout(() => {
      setShouldRender(false);
      onDone?.();
    }, exitMs);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`door-splash door-splash--${prefersReducedMotion ? "exit" : phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome"
      onClick={dismiss}
    >
      <div className="door-splash__panel door-splash__panel--left" aria-hidden="true">
        <div className="door-splash__doorFace" />
      </div>
      <div className="door-splash__panel door-splash__panel--right" aria-hidden="true">
        <div className="door-splash__doorFace" />
      </div>
      <div className="door-splash__content">
        <div className="door-splash__badge">
          <span className="door-splash__badgeDot" />
          <span className="door-splash__badgeText">COAI SYSTEM ONLINE</span>
        </div>
        <div className="door-splash__logo">
          <Image src="/newlogo.png" alt="COAI" width={200} height={75} style={{ objectFit: "contain", width: "auto", height: "clamp(40px, 8vw, 75px)" }} />
        </div>
        <h2 className="door-splash__title">Welcome to where the future lives</h2>
        <p className="door-splash__sub">and tradesmen succeed.</p>
        <div className="door-splash__hint">Tap to open</div>
      </div>
    </div>
  );
}
