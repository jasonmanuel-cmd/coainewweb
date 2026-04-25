"use client";

import React, { useState } from "react";

export function Contact() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ first_name: "", business_name: "", phone: "", email: "", website: "", message: "" });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(16,217,138,0.05))" }}>
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Contact</span>
          <h1 className="section-title">Let&apos;s talk.<br /><span className="text-green">No pressure.</span></h1>
          <p className="section-sub">Jason responds same business day. If it&apos;s urgent, call directly — (661) 610-9198. He picks up.</p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px" }}>
          {/* Info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--text-muted2)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Direct Line</div>
              <a href="tel:+16616109198" style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--accent-green)" }}>(661) 610-9198</a>
              <div style={{ fontSize: ".8rem", color: "var(--text-muted)", marginTop: "4px" }}>Jason picks up. No receptionist gatekeeping.</div>
            </div>
            <div>
              <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--text-muted2)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Email</div>
              <a href="mailto:jason@coaibakersfield.com" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>jason@coaibakersfield.com</a>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["No high-pressure sales", "Clear scope before any contract", "Free diagnostic, always"].map(t => (
                <div key={t} style={{ fontSize: ".85rem", color: "var(--text-soft)", display: "flex", gap: "8px" }}>
                  <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="pkg-card" style={{ padding: "40px" }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: "64px", height: "64px", background: "rgba(16,217,138,0.1)", border: "1px solid rgba(16,217,138,0.25)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "var(--accent-green)", margin: "0 auto 20px" }}>✓</div>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>Message Received</h2>
                <p style={{ fontSize: ".9rem", color: "var(--text-soft)", lineHeight: 1.6, marginBottom: "24px" }}>Jason will respond same business day. If it&apos;s urgent, call (661) 610-9198.</p>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", background: "rgba(16,217,138,0.1)", border: "1px solid rgba(16,217,138,0.22)", color: "#10d98a", padding: "4px 12px", borderRadius: 4, letterSpacing: 1, fontWeight: 700 }}>QUEUED</span>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>Send a Message</h2>
                <p style={{ fontSize: ".85rem", color: "var(--text-muted)", marginBottom: "32px" }}>Submissions go to jason@coaibakersfield.com. Jason responds same business day.</p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="field-group">
                      <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>First Name</label>
                      <input 
                        style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                        value={form.first_name} onChange={e => update("first_name", e.target.value)} placeholder="First name" required 
                      />
                    </div>
                    <div className="field-group">
                      <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Business Name</label>
                      <input 
                        style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                        value={form.business_name} onChange={e => update("business_name", e.target.value)} placeholder="Business name" required 
                      />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="field-group">
                      <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Phone</label>
                      <input 
                        style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                        type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(661) 000-0000" required 
                      />
                    </div>
                    <div className="field-group">
                      <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Email</label>
                      <input 
                        style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none" }}
                        type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@yourbiz.com" required 
                      />
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="section-eyebrow" style={{ fontSize: ".65rem", marginBottom: "8px" }}>Message</label>
                    <textarea 
                      style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff", outline: "none", resize: "none" }}
                      rows={5} value={form.message} onChange={e => update("message", e.target.value)} placeholder="What&apos;s your biggest digital challenge right now?" required 
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Send Message →</button>
                  <p style={{ textAlign: "center", fontSize: ".72rem", color: "var(--text-muted2)", marginTop: "12px" }}>
                    Or skip the form — call (661) 610-9198 directly.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
