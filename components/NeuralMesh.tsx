"use client";

import { useEffect, useRef } from "react";

/**
 * Cipher field + original “starry” backdrop:
 * - Twinkling green stars (static field, sin pulse) — from the legacy NeuralMesh star layer
 * - Drifting nodes, distance-based neural links, cursor repulsion, shooting streak — Cipher logic
 */
const CONFIG = {
  particleCount: 120,
  connectionDist: 150,
  mouseRadius: 200,
  /** Area divisor: more stars on larger screens */
  starAreaDivisor: 52000,
  /** Node dot (network) */
  nodeColor: "rgba(0, 255, 136, 0.75)",
  /** Links between nearby nodes */
  lineRgb: "0, 255, 100",
  lineOpacityMax: 0.14,
  shootingStarFreq: 0.005
} as const;

type Star = { x: number; y: number; r: number; phase: number };

class Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  private w: number;
  private h: number;

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.5;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
  }

  update(mouse: { x: number | null; y: number | null }) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = this.w;
    if (this.x > this.w) this.x = 0;
    if (this.y < 0) this.y = this.h;
    if (this.y > this.h) this.y = 0;

    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0 && dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
        this.x -= (dx / dist) * force * 2;
        this.y -= (dy / dist) * force * 2;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = CONFIG.nodeColor;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let particles: Particle[] = [];
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let frameId = 0;
    const mouse = { x: null as number | null, y: null as number | null };
    const sStar = { x: 0, y: 0, active: false, vx: 20, vy: 20 };

    function init() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;

      const starCount = Math.max(40, Math.floor((w * h) / CONFIG.starAreaDivisor));
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.35 + Math.random() * 1.15,
        phase: Math.random() * Math.PI * 2
      }));

      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle(w, h));
      }
    }

    function drawStars(t: number) {
      const phaseScale = t * 0.0014;
      for (const s of stars) {
        const alpha = 0.06 + ((Math.sin(phaseScale + s.phase) + 1) / 2) * 0.2;
        c.fillStyle = `rgba(120, 255, 159, ${alpha})`;
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fill();
      }
    }

    function connect() {
      const { connectionDist: maxD, lineRgb, lineOpacityMax } = CONFIG;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxD) {
            const opacity = (1 - dist / maxD) * lineOpacityMax;
            c.strokeStyle = `rgba(${lineRgb}, ${opacity})`;
            c.lineWidth = 0.5;
            c.beginPath();
            c.moveTo(particles[a].x, particles[a].y);
            c.lineTo(particles[b].x, particles[b].y);
            c.stroke();
          }
        }
      }
    }

    function drawShootingStar() {
      if (!sStar.active && Math.random() < CONFIG.shootingStarFreq) {
        sStar.active = true;
        sStar.x = Math.random() * w;
        sStar.y = 0;
      }
      if (sStar.active) {
        c.beginPath();
        c.strokeStyle = "rgba(180, 255, 210, 0.55)";
        c.lineWidth = 1;
        c.moveTo(sStar.x, sStar.y);
        c.lineTo(sStar.x - 60, sStar.y + 60);
        c.stroke();
        sStar.x += sStar.vx;
        sStar.y += sStar.vy;
        if (sStar.y > h || sStar.x > w) sStar.active = false;
      }
    }

    function animate(now: number) {
      const t = now;
      c.clearRect(0, 0, w, h);
      drawStars(t);
      for (const p of particles) {
        p.update(mouse);
        p.draw(c);
      }
      connect();
      drawShootingStar();
      frameId = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      mouse.x = null;
      mouse.y = null;
    };

    init();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      id="cipher-canvas"
      ref={canvasRef}
      className="neural-canvas cipher-canvas"
      aria-hidden="true"
    />
  );
}
