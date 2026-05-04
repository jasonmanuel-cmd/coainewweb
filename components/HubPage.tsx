"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Phase = "smoke" | "title" | "reveal" | "done";

export function HubPage() {
  const [phase, setPhase] = useState<Phase>("smoke");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 1800);
    const t2 = setTimeout(() => setPhase("reveal"), 4000);
    const t3 = setTimeout(() => setPhase("done"), 5800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="hub-root">
      {/* Smoke layers */}
      <div className={`hub-smoke-wrap ${phase === "reveal" || phase === "done" ? "hub-smoke-out" : ""}`}>
        <div className="hub-smoke hub-smoke-1" />
        <div className="hub-smoke hub-smoke-2" />
        <div className="hub-smoke hub-smoke-3" />
        <div className="hub-smoke hub-smoke-4" />
        <div className="hub-smoke hub-smoke-5" />
      </div>

      {/* "Coming This Summer" title */}
      <div className={`hub-title-wrap ${phase === "title" || phase === "reveal" ? "hub-title-in" : ""} ${phase === "reveal" || phase === "done" ? "hub-title-out" : ""}`}>
        <p className="hub-eyebrow">Chaotically Organized AI presents</p>
        <h1 className="hub-title">Coming This Summer</h1>
        <div className="hub-title-line" />
      </div>

      {/* Three panels */}
      <div className={`hub-panels ${phase === "done" ? "hub-panels-in" : ""}`}>

        {/* LEFT — LeadShield */}
        <a
          href="https://leadshield.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hub-panel hub-panel-left"
        >
          <div className="hub-panel-glow hub-glow-blue" />
          <div className="hub-panel-inner">
            <div className="hub-panel-badge hub-badge-blue">Missed Call Text Back</div>
            <div className="hub-panel-logo hub-logo-blue">🛡️</div>
            <h2 className="hub-panel-name hub-name-blue">LeadShield</h2>
            <p className="hub-panel-tagline">Stop losing $8,500/month to missed calls</p>
            <p className="hub-panel-desc">
              AI-powered auto-reply for contractors and tradespeople. When you&apos;re on the job,
              LeadShield answers your missed calls with intelligent SMS — scores leads HOT, WARM,
              or COLD — so you call back the right ones first.
            </p>
            <div className="hub-panel-cta hub-cta-blue">
              <span>Learn More</span>
              <span className="hub-cta-arrow">→</span>
            </div>
            <div className="hub-panel-colors">
              <span className="hub-dot" style={{ background: "#00E5FF" }} />
              <span className="hub-dot" style={{ background: "#0070FF" }} />
            </div>
          </div>
        </a>

        {/* CENTER — COAI */}
        <Link href="/home" className="hub-panel hub-panel-center">
          <div className="hub-panel-glow hub-glow-green" />
          <div className="hub-center-badge">★ Main Hub ★</div>
          <div className="hub-panel-inner">
            <div className="hub-panel-badge hub-badge-green">AI Marketing &amp; Web</div>
            <div className="hub-panel-logo hub-logo-green">⚡</div>
            <h2 className="hub-panel-name hub-name-green">Chaotically<br />Organized AI</h2>
            <p className="hub-panel-tagline">AI that works as hard as you do</p>
            <p className="hub-panel-desc">
              Full-service AI marketing, website design, and automation for local businesses.
              We turn chaos into growth — websites, SEO, content, and AI tools built for the
              real world.
            </p>
            <div className="hub-panel-cta hub-cta-green">
              <span>Enter Site</span>
              <span className="hub-cta-arrow">→</span>
            </div>
            <div className="hub-panel-colors">
              <span className="hub-dot" style={{ background: "#00ff64" }} />
              <span className="hub-dot" style={{ background: "#050505", border: "1px solid #333" }} />
            </div>
          </div>
        </Link>

        {/* RIGHT — SiteER */}
        <a
          href="https://siteer.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hub-panel hub-panel-right"
        >
          <div className="hub-panel-glow hub-glow-red" />
          <div className="hub-panel-inner">
            <div className="hub-panel-badge hub-badge-red">Website Diagnostics</div>
            <div className="hub-panel-logo hub-logo-red">🚨</div>
            <h2 className="hub-panel-name hub-name-red">SiteER</h2>
            <p className="hub-panel-tagline">The emergency room for sick websites</p>
            <p className="hub-panel-desc">
              Instant website audit in 60 seconds. Get your site&apos;s A–F grade, find the exact
              dollar amount you&apos;re losing every month, and receive a shareable treatment plan
              your developer can act on today.
            </p>
            <div className="hub-panel-cta hub-cta-red">
              <span>Scan Your Site</span>
              <span className="hub-cta-arrow">→</span>
            </div>
            <div className="hub-panel-colors">
              <span className="hub-dot" style={{ background: "#ff4d5e" }} />
              <span className="hub-dot" style={{ background: "#ffb15c" }} />
            </div>
          </div>
        </a>

      </div>

      <style>{`
        .hub-root {
          position: fixed;
          inset: 0;
          z-index: 9000;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: var(--font-space-grotesk, system-ui, sans-serif);
        }

        /* ── SMOKE ── */
        .hub-smoke-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          transition: opacity 1.2s ease;
        }
        .hub-smoke-wrap.hub-smoke-out { opacity: 0; }
        .hub-smoke {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          animation: smokeFloat 3.5s ease-in-out forwards;
        }
        .hub-smoke-1 {
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(60,60,70,0.9) 0%, transparent 70%);
          top: 10%; left: -10%;
          animation-delay: 0s;
        }
        .hub-smoke-2 {
          width: 500px; height: 500px;
          background: radial-gradient(ellipse, rgba(40,40,55,0.85) 0%, transparent 70%);
          top: 30%; left: 20%;
          animation-delay: 0.3s;
        }
        .hub-smoke-3 {
          width: 700px; height: 350px;
          background: radial-gradient(ellipse, rgba(55,55,65,0.9) 0%, transparent 70%);
          top: 50%; right: -15%;
          animation-delay: 0.6s;
        }
        .hub-smoke-4 {
          width: 450px; height: 450px;
          background: radial-gradient(ellipse, rgba(30,30,45,0.8) 0%, transparent 70%);
          bottom: 5%; left: 30%;
          animation-delay: 0.9s;
        }
        .hub-smoke-5 {
          width: 550px; height: 300px;
          background: radial-gradient(ellipse, rgba(50,50,60,0.85) 0%, transparent 70%);
          top: 5%; right: 10%;
          animation-delay: 0.2s;
        }
        @keyframes smokeFloat {
          0%   { opacity: 0; transform: translateX(-30px) translateY(20px) scale(0.85); }
          30%  { opacity: 1; }
          70%  { opacity: 0.9; }
          100% { opacity: 0.7; transform: translateX(30px) translateY(-20px) scale(1.1); }
        }

        /* ── TITLE ── */
        .hub-title-wrap {
          position: absolute;
          text-align: center;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 1s ease, transform 1s ease;
          z-index: 10;
          pointer-events: none;
        }
        .hub-title-wrap.hub-title-in {
          opacity: 1;
          transform: translateY(0);
        }
        .hub-title-wrap.hub-title-out {
          opacity: 0;
          transform: translateY(-16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .hub-eyebrow {
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin: 0 0 12px;
        }
        .hub-title {
          font-family: var(--font-headline, system-ui, sans-serif);
          font-size: clamp(2.4rem, 6vw, 5rem);
          font-weight: 800;
          color: #fff;
          margin: 0;
          letter-spacing: -0.02em;
          text-shadow: 0 0 60px rgba(255,255,255,0.15);
        }
        .hub-title-line {
          width: 80px;
          height: 2px;
          background: rgba(255,255,255,0.3);
          margin: 16px auto 0;
        }

        /* ── PANELS ── */
        .hub-panels {
          display: flex;
          align-items: stretch;
          gap: 0;
          width: 100%;
          height: 100vh;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1s ease, transform 1s ease;
          pointer-events: none;
        }
        .hub-panels.hub-panels-in {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }

        .hub-panel {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          overflow: hidden;
          cursor: pointer;
          border: none;
          transition: flex 0.5s cubic-bezier(0.2,0.8,0.2,1);
        }
        .hub-panel:hover { flex: 1.35; }

        .hub-panel-left   { background: linear-gradient(160deg, #020818 0%, #040d1f 60%, #050f28 100%); }
        .hub-panel-center { background: linear-gradient(160deg, #020802 0%, #040f04 60%, #061208 100%); }
        .hub-panel-right  { background: linear-gradient(160deg, #0d0202 0%, #1a0304 60%, #220404 100%); }

        .hub-panel-left::after, .hub-panel-center::after {
          content: '';
          position: absolute;
          right: 0; top: 10%; bottom: 10%;
          width: 1px;
        }
        .hub-panel-left::after   { background: linear-gradient(to bottom, transparent, rgba(0,229,255,0.15), transparent); }
        .hub-panel-center::after { background: linear-gradient(to bottom, transparent, rgba(255,77,94,0.15), transparent); }

        .hub-panel-glow {
          position: absolute;
          width: 400px; height: 400px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.18;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          transition: opacity 0.5s;
        }
        .hub-panel:hover .hub-panel-glow { opacity: 0.32; }
        .hub-glow-blue  { background: radial-gradient(ellipse, #00E5FF, #0070FF); }
        .hub-glow-green { background: radial-gradient(ellipse, #00ff64, #10d98a); }
        .hub-glow-red   { background: radial-gradient(ellipse, #ff4d5e, #ffb15c); }

        .hub-center-badge {
          position: absolute;
          top: 20px;
          left: 50%; transform: translateX(-50%);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(0,255,100,0.5);
          border: 1px solid rgba(0,255,100,0.2);
          padding: 4px 12px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .hub-panel-inner {
          position: relative;
          z-index: 2;
          padding: 48px 32px;
          text-align: center;
          max-width: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .hub-panel-badge {
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 20px;
          font-weight: 600;
        }
        .hub-badge-blue  { color: #00E5FF; background: rgba(0,229,255,0.1); border: 1px solid rgba(0,229,255,0.25); }
        .hub-badge-green { color: #00ff64; background: rgba(0,255,100,0.08); border: 1px solid rgba(0,255,100,0.2); }
        .hub-badge-red   { color: #ff4d5e; background: rgba(255,77,94,0.1); border: 1px solid rgba(255,77,94,0.25); }

        .hub-panel-logo { font-size: 2.8rem; line-height: 1; }
        .hub-logo-blue  { filter: drop-shadow(0 0 20px #00E5FF); }
        .hub-logo-green { filter: drop-shadow(0 0 20px #00ff64); }
        .hub-logo-red   { filter: drop-shadow(0 0 20px #ff4d5e); }

        .hub-panel-name {
          font-family: var(--font-headline, system-ui, sans-serif);
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .hub-name-blue  { color: #fff; text-shadow: 0 0 30px rgba(0,229,255,0.4); }
        .hub-name-green { color: #fff; text-shadow: 0 0 30px rgba(0,255,100,0.4); }
        .hub-name-red   { color: #fff; text-shadow: 0 0 30px rgba(255,77,94,0.4); }

        .hub-panel-tagline {
          font-size: 0.8rem;
          font-weight: 600;
          margin: 0;
          opacity: 0.7;
          color: #fff;
        }

        .hub-panel-desc {
          font-size: 0.78rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.5);
          margin: 0;
          max-width: 260px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hub-panel:hover .hub-panel-desc { opacity: 1; transform: translateY(0); }

        .hub-panel-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 10px 24px;
          border-radius: 6px;
          margin-top: 8px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hub-panel:hover .hub-panel-cta { transform: translateY(-2px); }
        .hub-cta-blue  { color: #00E5FF; border: 1px solid rgba(0,229,255,0.4); background: rgba(0,229,255,0.06); }
        .hub-cta-green { color: #00ff64; border: 1px solid rgba(0,255,100,0.4); background: rgba(0,255,100,0.06); }
        .hub-cta-red   { color: #ff4d5e; border: 1px solid rgba(255,77,94,0.4); background: rgba(255,77,94,0.06); }
        .hub-panel:hover .hub-cta-blue  { box-shadow: 0 0 30px rgba(0,229,255,0.2); }
        .hub-panel:hover .hub-cta-green { box-shadow: 0 0 30px rgba(0,255,100,0.2); }
        .hub-panel:hover .hub-cta-red   { box-shadow: 0 0 30px rgba(255,77,94,0.2); }

        .hub-cta-arrow { transition: transform 0.25s ease; }
        .hub-panel:hover .hub-cta-arrow { transform: translateX(4px); }

        .hub-panel-colors { display: flex; gap: 6px; margin-top: 4px; }
        .hub-dot { width: 8px; height: 8px; border-radius: 50%; }

        @media (max-width: 760px) {
          .hub-panels { flex-direction: column; height: auto; min-height: 100vh; }
          .hub-panel { flex: none; min-height: 33.33vh; }
          .hub-panel:hover { flex: none; }
          .hub-panel-left::after, .hub-panel-center::after {
            right: auto; top: auto; bottom: 0; left: 10%; right: 10%;
            width: auto; height: 1px;
          }
          .hub-panel-desc { opacity: 1; transform: none; }
          .hub-panel-inner { padding: 32px 24px; }
        }
      `}</style>
    </div>
  );
}
