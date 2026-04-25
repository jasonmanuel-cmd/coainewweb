"use client";

import React from "react";

const PKGS = [
  { tier: "Package 01", name: "Signal Foundation", tagline: "The core website operating layer. Turns silent traffic into clear local buying signals.", price: "$1,200", meta: "TIMELINE: 2–3 weeks · PAGES: Up to 6", bar: "bar-1",
    features: ["Conversion-first message hierarchy — copy structured to move visitors to action","Mobile speed & trust architecture — sub-3s load on 4G","GEO / SEO / AEO visibility framework — built for AI and search from day one","Lead capture & call-route hardening — forms, click-to-call, intake flows","Google Business Profile alignment — entity schema synced","Full code handoff — you own everything"]
  },
  { tier: "Package 02", name: "Commerce Engine", tagline: "Add transaction-grade backend logic so your site sells with less friction and cleaner operations.", price: "$1,600", meta: "TIMELINE: 3–4 weeks · INCLUDES: Everything in Package 01", bar: "bar-2",
    features: ["Everything in Signal Foundation","Store backend & catalog logic","Up to 50 products fully configured","Checkout, tax, and order-flow QA","Inventory & variant management","Payment gateway integration + testing"]
  },
  { tier: "Package 03", name: "Sentinel Automation", tagline: "Deploy conversational AI to intercept missed demand, qualify intent, and route bookings without manual chaos.", price: "$2,000", meta: "TIMELINE: 3–5 weeks · INCLUDES: Everything in Package 01", bar: "bar-3",
    features: ["Everything in Signal Foundation","Conversational lead qualification logic","Missed-call recovery plus callback routing","Workflow-tuned booking automation","CRM integration & lead tracking","Monthly performance review call"]
  }
];

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(108,99,255,0.05))" }}>
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Pricing</span>
          <h1 className="section-title">Fixed price. <span className="text-green">Full ownership.</span><br/>No surprises.</h1>
          <p className="section-sub">Every package is scoped before work starts. You know exactly what you&apos;re getting, what it costs, and what you own at the end. No retainers. No mystery.</p>
        </div>
      </section>
      
      <div className="container" style={{ paddingBottom: 100 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {PKGS.map(p => (
            <div key={p.tier} className="pkg-card" style={{ padding: "0", overflow: "hidden" }}>
              <div style={{ height: "4px", background: p.bar === 'bar-1' ? 'var(--accent-blue)' : p.bar === 'bar-2' ? 'var(--accent-purple)' : 'var(--accent-green)' }} />
              <div style={{ padding: "32px" }}>
                <div style={{ marginBottom: "24px" }}>
                  <div className="pkg-tier">{p.tier}</div>
                  <div className="pkg-name" style={{ fontSize: "1.6rem" }}>{p.name}</div>
                  <div className="pkg-desc">{p.tagline}</div>
                  <div className="pkg-price" style={{ margin: "20px 0 8px" }}>{p.price}<span> starting price</span></div>
                  <div style={{ fontSize: ".72rem", color: "var(--text-muted2)", fontWeight: 700, letterSpacing: "0.5px" }}>{p.meta}</div>
                </div>
                <ul className="pkg-features" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "24px" }}>
                  {p.features.map(f => (
                    <li key={f} style={{ fontSize: ".82rem" }}><span className="feat-arrow">→</span><span>{f}</span></li>
                  ))}
                </ul>
                <div style={{ marginTop: "32px" }}>
                  <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer", width: "100%", justifyContent: "center" }}>Get Started →</a>
                  <div style={{ textAlign: "center", fontSize: ".75rem", color: "var(--text-muted2)", marginTop: "12px" }}>No deposit until scope is agreed</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
