"use client";

import React, { useState } from "react";

export function IntakePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", business: "", phone: "", url: "", service: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setFormData(f => ({ ...f, [k]: v }));

  if (submitted) return (
    <div style={{ padding: "120px 0", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px", color: "var(--accent-green)" }}>◉</div>
        <h2 className="section-title">Diagnostic Submitted</h2>
        <p className="section-sub" style={{ margin: "0 auto 32px" }}>Your roadmap is being generated. Data has been routed to <strong>chaoticallyorganizedai@gmail.com</strong>. Jason will follow up within 24 hours with a prioritized fix list — no fluff, no pressure, just data.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", background: "rgba(16,217,138,.1)", border: "1px solid rgba(16,217,138,.22)", color: "#10d98a", padding: "6px 16px", borderRadius: 4, fontWeight: 700 }}>DIAGNOSTIC QUEUED</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "100px 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" }}>
          <div className="intake-intro">
            <span className="section-eyebrow">Free Diagnostic</span>
            <h1 className="section-title">Run Your<br /><span className="text-green">Growth Diagnostic</span></h1>
            <p className="section-sub">No high-pressure sales process. You get a prioritized fix roadmap and package fit before any implementation begins.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "40px" }}>
              {[
                ["Tell us about your business", "Name, industry, current website"],
                ["Describe your challenge", "Where you're losing leads or revenue"],
                ["Get your roadmap", "Free prioritized fix list within 24h"]
              ].map(([t, d], i) => (
                <div key={t} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ 
                    width: "32px", height: "32px", borderRadius: "50%", 
                    background: step > i + 1 ? "var(--accent-green)" : "var(--gradient-brand)", 
                    color: step > i + 1 ? "#032219" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: ".8rem", fontWeight: 800, flexShrink: 0
                  }}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: ".95rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{t}</div>
                    <div style={{ fontSize: ".82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pkg-card" style={{ padding: "40px" }}>
            <div style={{ fontSize: ".72rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "20px" }}>
              Step {step} of 3 — {["Business Info", "Your Challenge", "Contact Details"][step - 1]}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {step === 1 && (
                <>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Your Name</label>
                    <input 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                      value={formData.name} onChange={e => update("name", e.target.value)} placeholder="Jason Manuel" 
                    />
                  </div>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Business Name</label>
                    <input 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                      value={formData.business} onChange={e => update("business", e.target.value)} placeholder="Your Business, LLC" 
                    />
                  </div>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Industry</label>
                    <select 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                      value={formData.service} onChange={e => update("service", e.target.value)}
                    >
                      <option value="">Select your industry</option>
                      <option>HVAC & Mechanical</option><option>Plumbing</option><option>Home Services</option><option>Restaurant / Food</option><option>Retail</option><option>Professional Services</option><option>Other</option>
                    </select>
                  </div>
                </>
              )}
              
              {step === 2 && (
                <>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Current Website URL</label>
                    <input 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                      value={formData.url} onChange={e => update("url", e.target.value)} placeholder="https://yourbusiness.com" 
                    />
                  </div>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Biggest Challenge</label>
                    <textarea 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none", resize: "none" }}
                      rows={5} value={formData.goal} onChange={e => update("goal", e.target.value)} placeholder="e.g. Not enough calls coming in, leads going cold, site looks outdated..." 
                    />
                  </div>
                </>
              )}
              
              {step === 3 && (
                <>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Phone Number</label>
                    <input 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                      type="tel" value={formData.phone} onChange={e => update("phone", e.target.value)} placeholder="(661) 555-0100" 
                    />
                  </div>
                  <div style={{ background: "rgba(108,99,255,.06)", border: "1px solid rgba(108,99,255,.15)", borderRadius: 10, padding: "20px" }}>
                    <div style={{ fontSize: ".78rem", fontWeight: 700, color: "#c4b5fd", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px" }}>Your Diagnostic Includes:</div>
                    {["Prioritized fix roadmap", "Package fit recommendation", "No-obligation scope estimate"].map(i => (
                      <div key={i} style={{ fontSize: ".82rem", color: "var(--text-soft)", marginBottom: "6px", display: "flex", gap: "8px" }}>
                        <span style={{ color: "var(--accent-green)" }}>✓</span> {i}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                {step > 1 && <button className="btn-secondary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(s => s - 1)}>← Back</button>}
                {step < 3 && <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(s => s + 1)}>Continue →</button>}
                {step === 3 && <button className="btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => setSubmitted(true)}>Submit Diagnostic →</button>}
              </div>
            </div>
            
            <p style={{ textAlign: "center", fontSize: ".72rem", color: "var(--text-muted2)", marginTop: "24px" }}>
              No spam. No cold calls. Just a practical roadmap.<br/>
              Data routed to: chaoticallyorganizedai@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
