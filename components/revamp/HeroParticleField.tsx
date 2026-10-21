"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
};

/**
 * Lightweight pointer-reactive particle canvas for the homepage hero.
 * The canvas is decorative, pauses offscreen/in background tabs, and stays off
 * when reduced motion is requested. Pointer coordinates only update local data;
 * there is no React state update on pointer movement.
 */
export function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.closest<HTMLElement>(".cinematic-hero");
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !host || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000, inside: false, lastMove: 0 };
    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastFrame = 0;
    let visible = true;
    let pageVisible = document.visibilityState === "visible";
    let pixelRatio = 1;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.max(14, Math.min(46, Math.round((width * height) / 26000)));
      particles.length = 0;
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.24,
          radius: 0.8 + Math.random() * 1.35,
          alpha: 0.16 + Math.random() * 0.38
        });
      }
    };

    const draw = (time: number) => {
      frameId = 0;
      if (!visible || !pageVisible) return;
      if (time - lastFrame < 32) {
        frameId = window.requestAnimationFrame(draw);
        return;
      }

      const delta = lastFrame === 0 ? 1 : Math.min(2, (time - lastFrame) / 16.67);
      lastFrame = time;
      context.clearRect(0, 0, width, height);

      const pointerStrength = pointer.inside
        ? Math.max(0, 1 - (time - pointer.lastMove) / 1200)
        : 0;
      const influenceRadius = Math.min(190, Math.max(115, width * 0.14));

      for (const particle of particles) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vx *= 0.994;
        particle.vy *= 0.994;

        if (pointerStrength > 0) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < influenceRadius) {
            const force = (1 - distance / influenceRadius) * 0.12 * pointerStrength;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }

        if (particle.x < -4) particle.x = width + 4;
        else if (particle.x > width + 4) particle.x = -4;
        if (particle.y < -4) particle.y = height + 4;
        else if (particle.y > height + 4) particle.y = -4;
      }

      const connectionRadius = Math.min(112, Math.max(76, width * 0.085));
      const connectionRadiusSquared = connectionRadius * connectionRadius;
      context.lineWidth = 0.7;
      for (let first = 0; first < particles.length; first += 1) {
        const a = particles[first];
        for (let second = first + 1; second < particles.length; second += 1) {
          const b = particles[second];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared >= connectionRadiusSquared) continue;
          const opacity = (1 - Math.sqrt(distanceSquared) / connectionRadius) * 0.12;
          context.strokeStyle = `rgba(113, 255, 165, ${opacity})`;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = `rgba(177, 255, 195, ${particle.alpha})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId === 0 && visible && pageVisible) {
        frameId = window.requestAnimationFrame(draw);
      }
    };
    const stop = () => {
      if (frameId !== 0) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.inside = true;
      pointer.lastMove = performance.now();
    };
    const onPointerMove = (event: PointerEvent) => updatePointer(event);
    const onPointerDown = (event: PointerEvent) => updatePointer(event);
    const onPointerLeave = () => {
      pointer.inside = false;
    };
    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    };
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        stop();
        context.clearRect(0, 0, width, height);
      } else {
        start();
      }
    };

    resize();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    resizeObserver?.observe(host);
    if (!resizeObserver) window.addEventListener("resize", resize);

    const intersectionObserver = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        }, { threshold: 0 });
    intersectionObserver?.observe(host);

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerdown", onPointerDown, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onReducedMotionChange);
    start();

    return () => {
      stop();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerdown", onPointerDown);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onReducedMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="cinematic-hero-particles" aria-hidden="true" />;
}
