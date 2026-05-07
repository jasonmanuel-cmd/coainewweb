"use client";

import Link from "next/link";

export function HubPage() {
  return (
    <div className="hub-root">
      {/* Three panels */}
      <div className="hub-panels">

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
            <ul className="hub-panel-bullets hub-bullets-blue">
              <li>📞 Auto-texts missed callers in seconds</li>
              <li>💸 Recover ~$8,500/mo in lost leads</li>
              <li>🔥 Scores leads HOT, WARM, or COLD</li>
              <li>🔁 Re-engages cold leads automatically</li>
              <li>⚙️ Zero setup — live in minutes</li>
            </ul>
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
          position: relative;
          min-height: 100svh;
          background: #000;
          display: flex;
          align-items: stretch;
          justify-content: center;
          overflow-x: hidden;
          overflow-y: auto;
          font-family: var(--font-space-grotesk, system-ui, sans-serif);
        }

        /* ── PANELS ── */
        .hub-panels {
          display: flex;
          align-items: stretch;
          gap: 0;
          width: 100%;
          min-height: 100svh;
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
        .hub-panel:hover .hub-panel-desc,
        .hub-panel:focus-within .hub-panel-desc { opacity: 1; transform: translateY(0); }

        .hub-panel-bullets {
          list-style: none;
          padding: 0;
          margin: 2px 0 0;
          text-align: left;
          max-width: 240px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .hub-panel:hover .hub-panel-bullets,
        .hub-panel:focus-within .hub-panel-bullets { opacity: 1; transform: translateY(0); }
        .hub-panel-bullets li {
          font-size: 0.79rem;
          line-height: 1.5;
          margin-bottom: 7px;
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .hub-bullets-blue li { color: rgba(180,240,255,0.82); }

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

        /* ── TABLET (761px–1024px) ── */
        @media (min-width: 761px) and (max-width: 1024px) {
          .hub-panel-inner { padding: 36px 20px; max-width: 280px; gap: 10px; }
          .hub-panel-name { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
          .hub-panel-tagline { font-size: clamp(0.72rem, 1.2vw, 0.85rem); }
          .hub-panel-badge { font-size: 0.58rem; padding: 3px 10px; }
          .hub-panel-logo { font-size: 2.4rem; }
          .hub-panel-cta { padding: 9px 18px; font-size: 0.72rem; }
          .hub-panel-glow { width: 300px; height: 300px; }
        }

        /* ── MOBILE (<760px) ── */
        @media (max-width: 760px) {
          .hub-root { overflow-y: auto; }
          .hub-panels { flex-direction: column; min-height: 100svh; }
          .hub-panel { flex: none; min-height: clamp(190px, 33.33svh, 300px); }
          .hub-panel:hover { flex: none; }
          .hub-panel-left::after, .hub-panel-center::after {
            right: auto; top: auto; bottom: 0; left: 10%; right: 10%;
            width: auto; height: 1px;
          }
          .hub-panel-desc { opacity: 1; transform: none; }
          .hub-panel-bullets { opacity: 1; transform: none; }
          .hub-panel-inner { padding: 28px 24px; gap: 8px; }
          .hub-panel-logo { font-size: 2.4rem; }
          .hub-panel-cta { min-height: 44px; padding: 12px 22px; }
          .hub-panel-glow { width: 250px; height: 250px; }
        }

        /* ── SMALL MOBILE (<480px) ── */
        @media (max-width: 480px) {
          .hub-panel-inner { padding: 20px 16px; }
          .hub-panel-name { font-size: 1.4rem; }
          .hub-panel-tagline { font-size: 0.74rem; }
          .hub-panel-colors { display: none; }
          .hub-panel-bullets li { font-size: 0.75rem; margin-bottom: 5px; }
          .hub-eyebrow { font-size: 0.65rem; letter-spacing: 0.15em; }
          .hub-title { font-size: clamp(1.8rem, 8vw, 3rem); }
        }
      `}</style>
    </div>
  );
}
