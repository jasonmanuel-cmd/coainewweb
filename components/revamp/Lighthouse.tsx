"use client";

import React from "react";

export function Lighthouse() {
  const scores = [
    { label: "Performance", value: 100, color: "#10d98a" },
    { label: "Accessibility", value: 100, color: "#10d98a" },
    { label: "Best Practices", value: 100, color: "#10d98a" },
    { label: "SEO", value: 100, color: "#10d98a" }
  ];

  return (
    <section style={{ padding: "80px 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="section-eyebrow">Technical Audit Baseline</span>
          <h2 className="section-title">We build for <span className="text-green">perfect scores.</span></h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Most agencies deliver sites that fail basic Core Web Vitals. We don&apos;t. Every COAI build starts with a target baseline of 100/100 across the board.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
          {scores.map(s => (
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
              <div style={{ fontSize: ".7rem", color: "var(--text-muted)", marginTop: "4px", fontFamily: "var(--font-mono)" }}>PASSED</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,217,138,0.1)", border: "1px solid rgba(16,217,138,0.2)", padding: "8px 20px", borderRadius: "30px" }}>
            <span style={{ width: "8px", height: "8px", background: "#10d98a", borderRadius: "50%" }}></span>
            <span style={{ fontSize: ".75rem", fontWeight: 700, color: "#10d98a", letterSpacing: "0.5px" }}>AUDIT PROTOCOL: JAX SENTINEL STACK v1.0.4</span>
          </div>
        </div>
      </div>
    </section>
  );
}
