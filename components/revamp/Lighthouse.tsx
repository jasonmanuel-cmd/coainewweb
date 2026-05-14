"use client";

import React, { useMemo, useState } from "react";
import type { PsiStrategy } from "@/lib/pagespeed-insights";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

type LighthousePayload = {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  strategy?: PsiStrategy;
  lighthouseVersion?: string | null;
  fetchTime?: string | null;
  finalUrl?: string | null;
  cruxOverall?: string | null;
};

function scoreColor(score: number | null) {
  if (score === null) return "rgba(255,255,255,0.35)";
  if (score >= 90) return "#4ade80";
  if (score >= 50) return "#facc15";
  return "#f87171";
}

function formatCrux(overall: string | null | undefined): string | null {
  if (!overall || overall === "NONE") return null;
  const map: Record<string, string> = {
    FAST: "Real users (Chrome): typically fast",
    AVERAGE: "Real users (Chrome): mixed experience",
    SLOW: "Real users (Chrome): often slow"
  };
  return map[overall] ?? `Real users (Chrome): ${overall}`;
}

export function Lighthouse() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<PsiStrategy>("mobile");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Enter any URL above - including your competitors'.");
  const [statusTone, setStatusTone] = useState<"muted" | "ok" | "error">("muted");
  const [scores, setScores] = useState<LighthousePayload | null>(null);

  const baselineScores = useMemo(
    () => [
    { label: "Performance", value: 100, color: "#E8A020" },
    { label: "Accessibility", value: 100, color: "#E8A020" },
    { label: "Best Practices", value: 100, color: "#E8A020" },
    { label: "SEO", value: 100, color: "#E8A020" }
    ],
    []
  );

  const cards = useMemo(
    () => [
      { id: "perf", label: "Performance", score: scores?.performance ?? null },
      { id: "seo", label: "SEO", score: scores?.seo ?? null },
      { id: "acc", label: "Accessibility", score: scores?.accessibility ?? null },
      { id: "bp", label: "Best Practices", score: scores?.bestPractices ?? null }
    ],
    [scores]
  );

  async function runScan(e?: React.FormEvent) {
    e?.preventDefault();
    const target = url.trim();
    if (!target) {
      setStatusTone("error");
      setStatus("Please enter a URL first.");
      return;
    }

    setLoading(true);
    setScores(null);
    setStatusTone("ok");
    setStatus("Scanning... Google PageSpeed lab run (can take 15-30s). ");

    try {
      const qs = new URLSearchParams({ url: target, strategy });
      const res = await fetch(`/api/lighthouse?${qs.toString()}`);
      const data = (await res.json()) as LighthousePayload & { error?: string };
      if (!res.ok) {
        setStatusTone("error");
        setStatus(data.error?.trim() || "Scan failed. Check the URL and try again.");
        return;
      }
      setScores(data);
      setStatusTone("muted");
      const strat = data.strategy === "desktop" ? "Desktop" : "Mobile";
      setStatus(`Scan complete - ${strat} lab data (PageSpeed Insights API).`);
    } catch {
      setStatusTone("error");
      setStatus("Scan failed. Check the URL and try again.");
    } finally {
      setLoading(false);
    }
  }

  const cruxLine = scores ? formatCrux(scores.cruxOverall) : null;

  return (
    <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-eyebrow">Technical Audit Baseline</span>
          <h2 className="section-title">We build for <span className="text-amber">perfect scores.</span></h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Most agencies deliver sites that fail basic Core Web Vitals. We don&apos;t. Every COAI build starts with a target baseline of 100/100 across the board.
          </p>
        </div>

        {/* Our Scores */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "24px", marginBottom: "60px" }}>
          {baselineScores.map(s => (
            <div key={s.label} className="pkg-card" style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ 
                width: "80px", height: "80px", borderRadius: "50%", 
                border: `4px solid ${s.color}`, display: "flex", 
                alignItems: "center", justifyContent: "center", 
                fontSize: "1.5rem", fontWeight: 800, color: "#fff",
                marginBottom: "16px", background: `rgba(16,217,138,0.05)`
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: ".9rem", fontWeight: 700, color: "#fff" }}>{s.label}</div>
              <div style={{ fontSize: ".7rem", color: "var(--text-muted)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>COAI STANDARD</div>
            </div>
          ))}
        </div>

        {/* Interactive Test */}
        <div className="pkg-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px", border: "1px solid rgba(16,217,138,0.2)" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Test Your Infrastructure</h3>
            <p style={{ fontSize: ".9rem", color: "var(--text-soft)" }}>Enter your URL below to run a deep-scan for code violations and revenue leaks.</p>
          </div>

          <form onSubmit={runScan} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <input 
              type="url" 
              placeholder="https://yourbusiness.com" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  void runScan();
                }
              }}
              style={{ 
                flex: 1, 
                background: "rgba(255,255,255,0.05)", 
                border: "1px solid rgba(255,255,255,0.1)", 
                padding: "16px 20px", 
                borderRadius: "8px", 
                color: "#fff",
                outline: "none"
              }}
            />
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ whiteSpace: "nowrap" }}
            >
              {loading ? "Scanning..." : (
                <>
                  Run Diagnostic <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </button>
          </form>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <div role="group" aria-label="Lab device" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: ".72rem", color: "var(--text-muted2)", fontFamily: "var(--font-mono)" }}>Lab device</span>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStrategy("mobile")}
                disabled={loading}
                aria-pressed={strategy === "mobile"}
                style={{ padding: "10px 14px", borderRadius: 8, fontSize: 14 }}
              >
                Mobile
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStrategy("desktop")}
                disabled={loading}
                aria-pressed={strategy === "desktop"}
                style={{ padding: "10px 14px", borderRadius: 8, fontSize: 14 }}
              >
                Desktop
              </button>
            </div>
          </div>

          <p style={{ textAlign: "center", fontSize: ".8rem", color: statusTone === "error" ? "#f87171" : statusTone === "ok" ? "var(--accent)" : "var(--text-muted)", margin: "0 0 16px" }}>
            {status}
          </p>

          {loading ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ width: "35%", height: "100%", background: "var(--accent)", transform: "translateX(-40%)", animation: "revamp-indeterminate 1.2s ease-in-out infinite" }} />
              </div>
              <span style={{ fontSize: ".7rem", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>ANALYZING SCHEMA, SPEED, AND MOBILE INTEGRITY...</span>
            </div>
          ) : null}

          {scores ? (
            <div style={{ marginTop: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                {cards.map((c) => {
                  const color = scoreColor(c.score);
                  return (
                    <div key={c.id} className="pkg-card" style={{ padding: 18, textAlign: "center", borderColor: `${color}33` }}>
                      <div style={{ fontSize: "2.1rem", fontWeight: 900, color }}>{c.score === null ? "—" : c.score}</div>
                      <div style={{ fontSize: ".75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginTop: 4 }}>{c.label}</div>
                    </div>
                  );
                })}
              </div>

              {scores.lighthouseVersion ? (
                <p style={{ marginTop: 12, textAlign: "center", fontSize: ".75rem", color: "var(--text-muted)" }}>
                  <CheckCircle2 size={14} aria-hidden="true" style={{ verticalAlign: "-2px", marginRight: 6, color: "var(--accent)" }} />
                  Lighthouse {scores.lighthouseVersion}
                  {scores.finalUrl ? <> · Audited: <span style={{ color: "var(--text-soft)" }}>{scores.finalUrl}</span></> : null}
                  {cruxLine ? <> <br />{cruxLine}</> : null}
                </p>
              ) : null}

              <div style={{ textAlign: "center", padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", marginTop: "18px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "#fff", fontWeight: 800, marginBottom: 10 }}>
                  <AlertTriangle size={18} aria-hidden="true" style={{ color: "var(--amber)" }} />
                  Want a written fix plan?
                </div>
                <p style={{ fontSize: ".88rem", color: "var(--text-soft)", marginBottom: 14 }}>
                  We translate these scores into a prioritized punch list (speed, mobile conversion, SEO entity/schema).
                </p>
                <button className="btn-primary" onClick={() => window.scrollTo({ top: document.getElementById("contact")?.offsetTop, behavior: "smooth" })}>
                  Get My Free Recovery Plan
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,217,138,0.1)", border: "1px solid rgba(16,217,138,0.2)", padding: "8px 20px", borderRadius: "30px" }}>
            <span style={{ width: "8px", height: "8px", background: "#E8A020", borderRadius: "50%" }}></span>
            <span style={{ fontSize: ".75rem", fontWeight: 700, color: "#E8A020", letterSpacing: "0.5px" }}>AUDIT PROTOCOL: JAX SENTINEL STACK v1.0.4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
