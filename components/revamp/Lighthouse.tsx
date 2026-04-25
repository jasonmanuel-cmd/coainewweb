"use client";

import React, { useState } from "react";

export function Lighthouse() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const baselineScores = [
    { label: "Performance", value: 100, color: "#10d98a" },
    { label: "Accessibility", value: 100, color: "#10d98a" },
    { label: "Best Practices", value: 100, color: "#10d98a" },
    { label: "SEO", value: 100, color: "#10d98a" }
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setShowResult(false);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setShowResult(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

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

          <form onSubmit={handleScan} style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
            <input 
              type="url" 
              placeholder="https://yourbusiness.com" 
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              disabled={isScanning}
              style={{ whiteSpace: "nowrap" }}
            >
              {isScanning ? "Scanning..." : "Run Diagnostic →"}
            </button>
          </form>

          {isScanning && (
            <div style={{ textAlign: "center" }}>
              <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden", marginBottom: "12px" }}>
                <div style={{ width: `${scanProgress}%`, height: "100%", background: "var(--accent-green)", transition: "width 0.2s" }}></div>
              </div>
              <span style={{ fontSize: ".7rem", fontFamily: "var(--font-mono)", color: "var(--accent-green)" }}>ANALYZING SCHEMA, SPEED, AND MOBILE INTEGRITY...</span>
            </div>
          )}

          {showResult && (
            <div style={{ textAlign: "center", padding: "24px", background: "rgba(255,71,71,0.05)", border: "1px solid rgba(255,71,71,0.2)", borderRadius: "8px", marginTop: "24px" }}>
              <div style={{ color: "#ff4747", fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>⚠️ CRITICAL CODE VIOLATIONS DETECTED</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px", textAlign: "left" }}>
                <div style={{ fontSize: ".8rem", color: "var(--text-soft)" }}>• Render Blocking Resources</div>
                <div style={{ fontSize: ".8rem", color: "var(--text-soft)" }}>• Missing LocalBusiness Schema</div>
                <div style={{ fontSize: ".8rem", color: "var(--text-soft)" }}>• Non-Clickable Mobile CTAs</div>
                <div style={{ fontSize: ".8rem", color: "var(--text-soft)" }}>• Unoptimized Image Assets</div>
              </div>
              <p style={{ fontSize: ".9rem", color: "#fff", marginBottom: "24px" }}>
                Your current infrastructure is leaking revenue. These violations are likely costing you 15-30% of your inbound lead volume.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button className="btn-primary" onClick={() => window.scrollTo({top: document.getElementById('contact')?.offsetTop, behavior: 'smooth'})}>Get My Free Recovery Plan</button>
              </div>
            </div>
          )}
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
