"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const BUNDLES = [
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
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(232,160,32,0.05))" }}>
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Pricing</span>
          <h1 className="section-title">One price. <span className="text-amber">Full ownership.</span><br/>No surprises.</h1>
          <p className="section-sub">Fixed scope, fixed price. You approve the proposal before a line of code is written. You own everything the day it goes live.</p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 60 }}>
        {/* Single Primary Offer — TradeCall System */}
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <div className="pkg-card" style={{ padding: "0", overflow: "hidden", borderColor: "rgba(232,160,32,0.3)" }}>
            <div style={{ height: "4px", background: "var(--accent)" }} />
            <div style={{ padding: "36px" }}>
              <div style={{ marginBottom: "24px" }}>
                <div className="pkg-tier" style={{ color: "var(--accent)" }}>THE PRIMARY OFFER</div>
                <div className="pkg-name" style={{ fontSize: "1.8rem" }}>TradeCall System&trade;</div>
                <div className="pkg-desc">Custom website + missed-call recovery for Bakersfield trades. You own it. No monthly platform tax.</div>
                <div className="pkg-price" style={{ margin: "20px 0 4px" }}>$1,997<span style={{ fontSize: "14px", fontWeight: 400, color: "var(--cream-dim)" }}> flat</span></div>
                <div style={{ fontSize: ".8rem", color: "var(--cream-dim)", fontWeight: 600 }}>$997 to start · $1,000 at launch · 2–3 weeks</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  "Custom-coded website — you own 100% of the code",
                  "Mobile-fast, conversion layout built for \"call now\"",
                  "Local SEO + schema so Google Maps and AI search can find you",
                  "Google Business Profile alignment",
                  "Missed-call auto text-back in under 30 seconds",
                  "Lead capture forms + click-to-call hardened",
                  "Full handoff — export and leave anytime",
                  "Phone support from a human in Bakersfield",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: ".88rem", color: "var(--cream-dim)" }}>
                    <CheckCircle2 size={16} className="check" style={{ flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer", width: "100%", justifyContent: "center" }}>
                  Book Free Job Call Audit <ArrowRight size={16} aria-hidden="true" />
                </a>
                <div style={{ textAlign: "center", fontSize: ".75rem", color: "var(--cream-dim)" }}>No deposit until scope is agreed</div>
              </div>

              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(232,160,32,0.06)", borderRadius: "8px", border: "1px solid rgba(232,160,32,0.15)", fontSize: ".82rem", color: "var(--cream-dim)", textAlign: "center" }}>
                Need Spanish for Kern County? <strong style={{ color: "var(--amber)" }}>+$400 bilingual build.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Offers — Show after primary is sold */}
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <p style={{ fontSize: ".85rem", color: "var(--cream-dim)", fontStyle: "italic", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
            Already have a site? These add-ons layer on top of an existing build.<br/>Call Jason to discuss what fits your setup.
          </p>
        </div>
      </div>

      {/* Done-For-You Bundles — Square checkout */}
      <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="container">
          <span className="section-eyebrow">Already Have a Site?</span>
          <h2 className="section-title">Add-on bundles. <span className="text-amber">Buy what you need.</span></h2>
          <p className="section-sub">These are standalone upgrades for businesses that already have web presence but need specific gaps filled. Buy now with Square.</p>
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
