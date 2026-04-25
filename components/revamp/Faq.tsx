"use client";

import React, { useState } from "react";

const FAQ_SECTIONS = [
  {
    id: "pricing", title: "Pricing",
    items: [
      { q: "What does it cost to work with COAI?", a: "Website builds start at $1,200 for the Signal Foundation package and go up to $2,000+ for the Sentinel Automation layer. Exact pricing is scoped per project — we don't charge extra for complexity you don't need, and we don't pad quotes to hit a number.\n\nThe diagnostic call is free. The proposal is free. You only pay when a clear scope is agreed on and work begins." },
      { q: "Are there monthly fees or retainers?", a: "No mandatory retainers. Every build is a one-time fixed-price engagement. You own the result. There's no ongoing fee to keep your site running. Optional ongoing support is available for clients who want COAI managing updates, monitoring, or expanding the system — but it's never a requirement." }
    ]
  },
  {
    id: "process", title: "Process",
    items: [
      { q: "How long does a build take?", a: "Standard website builds complete in 2 to 4 weeks from signed scope to live deployment. Simpler builds (Signal Foundation) can be faster. More complex e-commerce or automation stacks take the full 4 weeks. Every milestone has a staging link so you can see it taking shape in real time." }
    ]
  },
  {
    id: "ownership", title: "Ownership",
    items: [
      { q: "Who owns the website after it's built?", a: "You own everything. The code, the domain, the hosting account, the customer data — all of it transfers to you at handoff. COAI retains no ongoing control or access unless you explicitly grant it for support purposes. This is what \"sovereign infrastructure\" means. We build houses, not rental agreements." }
    ]
  }
];

export function Faq() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (k: string) => setOpenKey(o => o === k ? null : k);

  return (
    <div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(108,99,255,0.05))" }}>
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">FAQ</span>
          <h1 className="section-title">Every question<br /><span className="text-green">answered straight.</span></h1>
          <p className="section-sub">No corporate hedging. If you have a question that isn&apos;t here, call Jason directly at (661) 610-9198.</p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "60px", alignItems: "start" }}>
          {/* Side nav */}
          <nav style={{ position: "sticky", top: "100px" }}>
            <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--text-muted2)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Jump To</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQ_SECTIONS.map(s => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ fontSize: ".9rem", color: "var(--text-muted)", transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>{s.title}</a>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ fontSize: ".72rem", color: "var(--text-muted2)", marginBottom: "12px", textTransform: "uppercase", fontWeight: 700 }}>Still have questions?</div>
              <a href="tel:+16616109198" className="btn-green btn-sm" style={{ width: "100%", justifyContent: "center" }}>Call Jason</a>
            </div>
          </nav>

          {/* Accordion */}
          <div>
            {FAQ_SECTIONS.map(section => (
              <section key={section.id} id={section.id} style={{ marginBottom: "60px" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>{section.title}</h2>
                {section.items.map((item, idx) => {
                  const key = `${section.id}-${idx}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <button 
                        style={{ width: "100%", background: "none", border: "none", color: isOpen ? "var(--accent-green)" : "#fff", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left", fontSize: "1rem", fontWeight: 600 }}
                        onClick={() => toggle(key)}
                      >
                        <span>{item.q}</span>
                        <span style={{ fontSize: "1.2rem", color: "var(--accent-blue)" }}>{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div style={{ paddingBottom: "24px" }}>
                          {item.a.split("\n\n").map((p, i) => (
                            <p key={i} style={{ fontSize: ".9rem", color: "var(--text-soft)", lineHeight: 1.7, marginBottom: "12px" }}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
