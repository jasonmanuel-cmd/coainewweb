"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

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

const BUNDLES = [
  {
    name: "Tech Rescue Kit",
    price: "$299 flat",
    desc: "Full device triage — computer tune-up, virus sweep, storage cleanup, and OS hardening. In and out, running clean.",
    features: [
      "Full diagnostic scan",
      "Virus & malware removal",
      "Storage deep-clean + optimization",
      "OS hardening + startup repair",
      "30-day follow-up support",
    ],
    best: false,
    sq: "https://square.link/u/iUDRvBOo",
  },
  {
    name: "Trades Starter Pack",
    price: "$1,497 flat",
    desc: "Everything a trades or HVAC business needs to look sovereign and capture leads — deployed in one shot.",
    features: [
      "Sovereign 1-page web build",
      "Google Business Profile overhaul",
      "Schema / AEO injection",
      "Social media profile cleanup",
      "Review generation system setup",
    ],
    best: false,
    sq: "https://square.link/u/Xvp6QAHQ",
  },
  {
    name: "AI Lead Machine",
    price: "$1,997 + $297/mo",
    desc: "Full autonomous lead capture and follow-up. Built for operators serious about dominating the 661 market.",
    features: [
      "Sovereign web build",
      "AI chatbot embed",
      "LeadShield missed-call text-back",
      "Review automation system",
      "Monthly SEO + analytics report",
    ],
    best: true,
    sq: "https://square.link/u/6X8C4a9M",
  },
  {
    name: "Operational Ecosystem",
    price: "$1,200 + $197/mo",
    desc: "Custom sovereign site wired into a full CRM and automated SMS follow-up pipeline.",
    features: [
      "Custom HTML/JS site + schema",
      "LeadShield CRM integration",
      "Automated missed-call SMS",
      "Vercel/Netlify hosting setup",
    ],
    best: false,
    sq: "https://square.link/u/D1wnMqJt",
  },
];

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  return (
    <div>
      {/* AEO semantic triples for Pricing page */}
      <div className="aeo-triples" aria-label="Pricing facts" style={{display: "none"}}>
        - Signal Foundation starts at $1,200 for a sovereign website build.
        - Signal Foundation includes up to 6 pages and completes in 2-3 weeks.
        - Commerce Engine starts at $1,600 with up to 50 products.
        - Commerce Engine adds e-commerce backend and payment integration.
        - Sentinel Automation starts at $2,000 with AI automation layer.
        - Sentinel Automation includes Cipher AI receptionist deployment.
        - COAI bundles include missed-call recovery and lead qualification.
        - Every COAI build transfers full code ownership to the client.
        - COAI pricing is fixed-price with no mandatory retainers.
      </div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(108,99,255,0.05))" }}>
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Pricing</span>
          <h1 className="section-title">Fixed price. <span className="text-amber">Full ownership.</span><br/>No surprises.</h1>
          <p className="section-sub">Every package is scoped before work starts. You know exactly what you&apos;re getting, what it costs, and what you own at the end. No retainers. No mystery.</p>
        </div>
      </section>
      
      <div className="container" style={{ paddingBottom: 60 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
          {PKGS.map(p => (
            <div key={p.tier} className="pkg-card" style={{ padding: "0", overflow: "hidden" }}>
              <div style={{ height: "4px", background: p.bar === 'bar-1' ? 'var(--accent)' : p.bar === 'bar-2' ? 'var(--accent-muted)' : 'var(--accent-signal)' }} />
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
                    <li key={f} style={{ fontSize: ".82rem" }}><span className="feat-arrow" aria-hidden="true"><ArrowRight size={14} /></span><span>{f}</span></li>
                  ))}
                </ul>
                <div style={{ marginTop: "32px" }}>
                  <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer", width: "100%", justifyContent: "center" }}>
                    Get Started <ArrowRight size={16} aria-hidden="true" />
                  </a>
                  <div style={{ textAlign: "center", fontSize: ".75rem", color: "var(--text-muted2)", marginTop: "12px" }}>No deposit until scope is agreed</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Done-For-You Bundles — Square checkout */}
      <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <span className="section-eyebrow">Instant Checkout Bundles</span>
          <h2 className="section-title">One price. <span className="text-amber">Everything wired.</span> No decision fatigue.</h2>
          <p className="section-sub">Pick the bundle that fits. Buy now with Square. No upsells, no hidden fees — just a straight price for a complete solution.</p>
          <div className="bundles-grid" style={{ marginTop: "40px" }}>
            {BUNDLES.map((b) => (
              <div key={b.name} className={`bundle-card${b.best ? " best" : ""}`}>
                {b.best && <div className="bundle-badge">Best Value</div>}
                <div className="bundle-name">{b.name}</div>
                <div className="bundle-price">{b.price}</div>
                <div className="bundle-desc">{b.desc}</div>
                <ul className="bundle-list">
                  {b.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a className="bundle-cta" href={b.sq} target="_blank" rel="noopener noreferrer">
                  Buy Now — {b.price} <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
