"use client";

import { useEffect, useMemo, useRef } from "react";

type BreachVisualizerProps = {
  intensity?: number;
};

type Layer = {
  y: number;
  h: number;
  alpha: number;
};

export function BreachVisualizer({ intensity = 1 }: BreachVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const layers = useMemo<Layer[]>(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        y: i,
        h: 1,
        alpha: 0.15 - i * 0.008
      })),
    []
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let running = true;
    let t0 = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width));
      canvas.height = Math.max(1, Math.floor(rect.height));
    };

    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // Fixed breach x so the visual feels like one consistent “breach point”
    let breachX = 0.58;

    const draw = () => {
      if (!running) return;

      const now = performance.now();
      const w = canvas.width;
      const h = canvas.height;
      const t = (now - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      // Dark back
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, w, h);

      // Layered “schema stack”
      const stackTop = h * 0.12;
      const stackBottom = h * 0.9;
      const stackHeight = stackBottom - stackTop;

      for (let i = 0; i < layers.length; i += 1) {
        const y = stackTop + (i / layers.length) * stackHeight;
        const layerAlpha = layers[i].alpha;
        ctx.strokeStyle = `rgba(0, 255, 100, ${layerAlpha})`;
        ctx.lineWidth = 1;

        const jitter = Math.sin(t * 1.2 + i) * 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.12, y + jitter);
        ctx.lineTo(w * 0.88, y - jitter);
        ctx.stroke();

        // Small “code tokens” on each layer
        ctx.fillStyle = `rgba(0,255,100,${Math.max(0.03, layerAlpha * 0.5)})`;
        ctx.font = "12px monospace";
        ctx.fillText(`schema_${i}`, w * 0.14, y + 6);
      }

      // Breach portal
      const bx = w * breachX;
      const portalW = w * (0.16 + 0.01 * Math.sin(t * 3.1));
      const portalH = h * 0.44;
      const px = bx - portalW / 2;
      const py = h * 0.28;

      // Portal glow
      const glow = 0.35 + 0.25 * Math.sin(t * 5.2);
      ctx.fillStyle = `rgba(0, 255, 100, ${0.12 * intensity * glow})`;
      ctx.fillRect(px - 12, py - 12, portalW + 24, portalH + 24);

      // Breach “light leak”
      const leakIntensity = 0.7 * intensity * (0.6 + 0.4 * Math.sin(t * 4.7));
      const leakGrad = ctx.createLinearGradient(bx, py, bx + portalW * 0.25, py + portalH);
      leakGrad.addColorStop(0, `rgba(0,255,100,${0.0})`);
      leakGrad.addColorStop(0.25, `rgba(0,255,100,${0.35 * leakIntensity})`);
      leakGrad.addColorStop(1, `rgba(0,255,100,${0.05 * leakIntensity})`);

      ctx.fillStyle = leakGrad;
      ctx.fillRect(px, py, portalW, portalH);

      // Breach outline / scan slices
      ctx.strokeStyle = `rgba(0,255,100,${0.55 * intensity})`;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(px, py, portalW, portalH);

      // Scanline sweep
      const sweepY = py + portalH * ((t * 0.18) % 1);
      ctx.strokeStyle = `rgba(0,255,100,${0.45 * intensity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px - 10, sweepY);
      ctx.lineTo(px + portalW + 10, sweepY);
      ctx.stroke();

      // Foreground gantry + armored technician silhouette (low-detail, “diagnostic operative”)
      const baseY = h * 0.88;
      const gantryLeft = w * 0.22;
      const gantryRight = w * 0.78;
      ctx.strokeStyle = `rgba(0,255,100,${0.18 * intensity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gantryLeft, baseY);
      ctx.lineTo(gantryRight, baseY);
      ctx.stroke();

      // Tech body
      const techX = w * 0.46;
      const techY = h * 0.52;
      const techW = w * 0.06;
      const techH = h * 0.24;

      // legs
      ctx.fillStyle = `rgba(0,255,100,${0.08 * intensity})`;
      ctx.fillRect(techX - techW * 0.18, baseY - techH * 0.18, techW * 0.08, techH * 0.18);
      ctx.fillRect(techX + techW * 0.10, baseY - techH * 0.18, techW * 0.08, techH * 0.18);

      // torso
      ctx.fillStyle = `rgba(255,255,255,${0.03 + 0.02 * intensity})`;
      ctx.fillRect(techX - techW / 2, baseY - techH, techW, techH);

      // helmet
      ctx.beginPath();
      ctx.fillStyle = `rgba(0,255,100,${0.16 * intensity})`;
      ctx.arc(techX, baseY - techH - techW * 0.15, techW * 0.32, 0, Math.PI * 2);
      ctx.fill();

      // scanner beam to breach
      const beamT = 0.5 + 0.5 * Math.sin(t * 2.1);
      const beamStartX = techX;
      const beamStartY = baseY - techH * 0.9;
      const beamEndX = px + portalW / 2;
      const beamEndY = py + portalH * (0.35 + 0.2 * beamT);
      const grad = ctx.createLinearGradient(beamStartX, beamStartY, beamEndX, beamEndY);
      grad.addColorStop(0, `rgba(0,255,100,${0.0})`);
      grad.addColorStop(0.25, `rgba(0,255,100,${0.25 * intensity})`);
      grad.addColorStop(1, `rgba(0,255,100,${0.65 * intensity})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(beamStartX, beamStartY);
      ctx.lineTo(beamEndX, beamEndY);
      ctx.stroke();

      // Beam “pulse” blob near breach
      ctx.fillStyle = `rgba(0,255,100,${0.18 * intensity * (0.4 + 0.6 * beamT)})`;
      ctx.beginPath();
      ctx.arc(beamEndX, beamEndY, Math.max(2, w * 0.008), 0, Math.PI * 2);
      ctx.fill();

      setTimeout(() => {
        raf = requestAnimationFrame(draw);
      }, 20);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [intensity, layers]);

  return <canvas ref={canvasRef} className="breach-canvas" aria-hidden="true" />;
}

