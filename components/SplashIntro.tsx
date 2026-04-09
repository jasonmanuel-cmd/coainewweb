"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function SplashIntro() {
  const [hidden, setHidden] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showRain, setShowRain] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const splashSeen = window.sessionStorage.getItem("coai-splash-seen");
    if (splashSeen) {
      setHidden(true);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setHidden(true);
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let running = true;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -60);

    const draw = () => {
      if (!running) return;
      frame += 1;
      ctx.fillStyle = "rgba(2, 7, 8, 0.13)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#62ffad";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i += 1) {
        const digit = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(digit, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.65;
      }
      if (frame % 2 === 0) requestAnimationFrame(draw);
      else setTimeout(() => requestAnimationFrame(draw), 16);
    };

    const t1 = setTimeout(() => {
      setShowMatrix(true);
      draw();
    }, 700);
    const t2 = setTimeout(() => setShowRain(true), 2600);
    const t3 = setTimeout(() => {
      running = false;
      window.sessionStorage.setItem("coai-splash-seen", "1");
      setHidden(true);
    }, 5600);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="splash">
      <canvas ref={canvasRef} className={`matrix-canvas ${showMatrix ? "matrix-show" : ""}`} />
      <div className="splash-center">
        <Image src="/logo.png" width={240} height={240} alt="Chaotically Organized AI logo" className="splash-logo" priority />
        <h1 className="splash-title">CHAOTICALLY ORGANIZED AI</h1>
      </div>
      <div className="splash-flash" />
      <div className={`keyword-rain ${showRain ? "rain-show" : ""}`}>
        {["GEO", "AEO", "SEO", "GEO", "AEO", "SEO", "GEO", "AEO", "SEO"].map((word, idx) => (
          <span key={`${word}-${idx}`} style={{ left: `${idx * 11 + 2}%`, animationDelay: `${(idx % 3) * 0.2}s` }}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
