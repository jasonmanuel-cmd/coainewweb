"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type LighthousePayload = {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
};

const CIRC = 188.5;

function scoreColor(score: number) {
  if (score >= 90) return "#4ade80";
  if (score >= 50) return "#facc15";
  return "#f87171";
}

export function LpLighthouseSection() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("Enter any URL above - including your competitors'");
  const [statusTone, setStatusTone] = useState<"muted" | "ok" | "error">("muted");
  const [loading, setLoading] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [scores, setScores] = useState<LighthousePayload | null>(null);

  const cards = useMemo(
    () => [
      { id: "perf", label: "Performance", score: scores?.performance ?? null },
      { id: "seo", label: "SEO", score: scores?.seo ?? null },
      { id: "acc", label: "Accessibility", score: scores?.accessibility ?? null },
      { id: "bp", label: "Best Practices", score: scores?.bestPractices ?? null }
    ],
    [scores]
  );

  async function runScan() {
    const target = url.trim();
    if (!target) {
      setStatusTone("error");
      setStatus("Please enter a URL first.");
      return;
    }

    setLoading(true);
    setShowCta(false);
    setScores(null);
    setStatusTone("ok");
    setStatus("Scanning... this takes about 10 seconds");

    try {
      const res = await fetch(`/api/lighthouse?url=${encodeURIComponent(target)}`);
      const data = (await res.json()) as LighthousePayload & { error?: string };
      if (!res.ok) {
        setStatusTone("error");
        setStatus(data.error?.trim() || "Scan failed. Check the URL and try again.");
        return;
      }
      setScores(data);
      setStatusTone("muted");
      setStatus("Scan complete - mobile scores via Google Lighthouse");
      setShowCta(true);
    } catch {
      setStatusTone("error");
      setStatus("Scan failed. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="site-scanner" className="lp-lh-section">
      <div className="lp-lh-container">
        <div className="lp-lh-header">
          <p className="lp-lh-kicker">Live Diagnostic Tool</p>
          <h2>See How Your Site Scores Right Now</h2>
          <p>
            Run a live Google Lighthouse audit on any URL. Performance, SEO, Accessibility, and Best Practices -
            scored instantly.
          </p>
        </div>

        <div className="lp-lh-input-row">
          <input
            id="lh-url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void runScan();
              }
            }}
            placeholder="yoursite.com or www.yoursite.com"
            aria-label="URL to scan"
          />
          <button id="lh-scan-btn" onClick={() => void runScan()} disabled={loading}>
            {loading ? "Scanning..." : "Run Scan"}
          </button>
        </div>

        <p className={`lp-lh-status lp-lh-${statusTone}`}>{status}</p>

        <div className="lp-lh-scores-grid" id="lh-scores-grid">
          {cards.map((card) => {
            const score = card.score;
            const color = score === null ? "#333" : scoreColor(score);
            const offset = score === null ? CIRC : CIRC - (score / 100) * CIRC;
            return (
              <div key={card.id} className="lp-lh-card" style={{ borderColor: score === null ? "#1e1e1e" : `${color}33` }}>
                <div className="lp-lh-ring-wrap">
                  <svg viewBox="0 0 72 72" width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="36" cy="36" r="30" fill="none" stroke="#1e1e1e" strokeWidth="6" />
                    <circle
                      cx="36"
                      cy="36"
                      r="30"
                      fill="none"
                      stroke={color}
                      strokeWidth="6"
                      strokeDasharray={CIRC}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke 0.5s" }}
                    />
                  </svg>
                  <div className="lp-lh-ring-num" style={{ color }}>
                    {score ?? "--"}
                  </div>
                </div>
                <span className="lp-lh-card-label">{card.label}</span>
              </div>
            );
          })}
        </div>

        {showCta ? (
          <div id="lh-cta" className="lp-lh-cta">
            <p>Low scores mean lost leads. We fix that - fast.</p>
            <Link href="/intake">Get My Site Fixed</Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

