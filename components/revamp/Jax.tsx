"use client";

import React from "react";

interface JaxPageProps {
  onNavigate: (page: string) => void;
}

export function JaxPage({ onNavigate }: JaxPageProps) {
  return (
    <div style={{ padding: "100px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "60px", alignItems: "center" }}>
          <div>
            <div className="hero-pill">
              <span className="pill-dot" style={{ background: "#00f0ff", boxShadow: "0 0 6px rgba(0,240,255,0.8)" }}></span>
              PRE-DEPLOYMENT · BAKERSFIELD 661
            </div>
            <h1 className="hero-h1">Turn Your Chaos<br /><span style={{ color: "var(--accent-cyan)" }}>Into Code.</span></h1>
            <p className="hero-sub">
              JAX Sentinel is an autonomous AI agent layer for service business operators. It intercepts missed demand, qualifies intent, and routes bookings while you focus on the work.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              <a className="btn-primary" style={{ background: "linear-gradient(135deg, #00f0ff, #6c63ff)", boxShadow: "0 8px 24px rgba(0,240,255,0.2)" }} onClick={() => onNavigate("intake")}>Join Waitlist →</a>
              <a className="btn-outline">Read Technical Brief</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["◈ Missed-Call Recovery", "Intercepts unanswered calls and auto-routes callback requests"],
                ["◉ Intent Qualification", "Conversational AI screens leads before human handoff"],
                ["⬛ Booking Automation", "Routes confirmed intent straight to your calendar"]
              ].map(([t, d]) => (
                <div key={t} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.2rem", color: "var(--accent-cyan)", width: 32, flexShrink: 0 }}>{t.split(" ")[0]}</div>
                  <div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{t.split(" ").slice(1).join(" ")}</div>
                    <div style={{ fontSize: ".88rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ position: "relative" }}>
            <div style={{ 
              width: "100%", aspectRatio: "4/5", background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", overflow: "hidden",
              position: "relative"
            }}>
              {/* Placeholder for image if not found */}
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", opacity: 0.1 }}>JAX</div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(3,3,6,0.8) 0%, transparent 50%)" }} />
              <div style={{ position: "absolute", bottom: "32px", left: "32px", display: "flex", gap: "8px" }}>
                <span style={{ fontSize: ".65rem", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", background: "rgba(16,217,138,0.15)", color: "var(--accent-green)", border: "1px solid rgba(16,217,138,0.3)" }}>ACTIVE</span>
                <span style={{ fontSize: ".65rem", fontWeight: 800, padding: "4px 12px", borderRadius: "4px", background: "rgba(0,240,255,0.15)", color: "var(--accent-cyan)", border: "1px solid rgba(0,240,255,0.3)" }}>SENTINEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
