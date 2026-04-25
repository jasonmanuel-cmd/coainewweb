"use client";

import React from "react";

const VALUES = [
  {
    code: "01 · Integrity",
    title: "No Bullshit Architecture",
    text: "Every recommendation is made because it serves the client's business, not because it generates a higher invoice."
  },
  {
    code: "02 · Transparency",
    title: "Clear Scope, Every Time",
    text: "You know exactly what you're getting before work begins. Milestone-based contracts and plain-language deliverables."
  },
  {
    code: "03 · Ownership",
    title: "Sovereign By Default",
    text: "Every build transfers full ownership to the client. The code, the hosting, the data — all of it belongs to you."
  },
  {
    code: "04 · Precision",
    title: "One Shot, One Kill",
    text: "Operations experience means we scope tightly and execute cleanly. We don't iterate endlessly because we didn't think it through."
  }
];

const STORY = [
  {
    year: "The Foundation",
    title: "15 Years in the Field",
    text: "Before building websites, Jason spent 15+ years in real operations — event production, construction, retail, and cannabis. Systems that had to work."
  },
  {
    year: "The Shift",
    title: "From Operator to Builder",
    text: "The transition came from watching Bakersfield businesses bleed revenue from broken digital infrastructure — slow sites and unanswered calls."
  },
  {
    year: "The Company",
    title: "Chaotically Organized AI, LLC",
    text: "COAI operates on a Tripod System: The Dreamer (vision), The Oracle (strategy), and The Engineer (execution). Small, precise operation."
  }
];

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(16,217,138,0.05))" }}>
        <div className="container">
          <span className="section-eyebrow">The Operator Behind the System</span>
          <h1 className="section-title">Built by someone who&apos;s<br /><span className="text-green">actually been in the field.</span></h1>
          <p className="section-sub">
            Not a developer who discovered marketing. Not a marketer who learned to code. An operations veteran who built systems because he had to.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "start" }}>
          {/* Founder card */}
          <div className="pkg-card" style={{ padding: "40px", textAlign: "center" }}>
            <div style={{ width: "80px", height: "80px", background: "var(--gradient-brand)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "1.5rem", fontWeight: 800, color: "#fff", lineHeight: "80px" }}>JRM</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>Jason Robert Manuel</h2>
            <div style={{ fontSize: ".85rem", color: "var(--accent-blue)", fontWeight: 700, marginBottom: "24px" }}>Founder & CEO · The Dreamer</div>
            <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {[
                ["Base", "Bakersfield, CA"],
                ["Experience", "15+ Years"],
                ["Sites Live", "6+ Sovereign Builds"],
                ["Direct Line", "(661) 610-9198"]
              ].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: "var(--text-muted2)" }}>{l}</span>
                  <span style={{ color: "var(--text-soft)", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "32px" }}>
              <a href="tel:+16616109198" className="btn-green" style={{ width: "100%", justifyContent: "center" }}>
                Call Jason Directly
              </a>
              <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}>
                Run My Diagnostic →
              </a>
            </div>
          </div>

          {/* Story blocks */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {STORY.map(s => (
              <div key={s.year}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".75rem", color: "var(--accent-green)", marginBottom: "8px" }}>{s.year}</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: ".95rem", color: "var(--text-soft)", lineHeight: 1.7 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginTop: "100px" }}>
          <span className="section-eyebrow">Operating Values</span>
          <h2 className="section-title">The <span className="text-green">Team Good Protocol.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginTop: "40px" }}>
            {VALUES.map(v => (
              <div key={v.code} className="pkg-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--accent-blue)", marginBottom: "10px" }}>{v.code}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ fontSize: ".85rem", color: "var(--text-soft)", lineHeight: 1.6 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
