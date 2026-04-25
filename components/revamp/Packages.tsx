"use client";

import React from "react";

const PACKAGES = [
  {
    tier: "Package 01",
    name: "Signal Foundation",
    desc: "Install the core website operating layer that turns silent traffic into clear local buying signals.",
    price: "$1,200",
    features: [
      "Conversion-first message hierarchy",
      "Mobile speed & trust architecture",
      "GEO / SEO / AEO visibility framework",
      "Lead capture & call-route hardening",
      "Google Business Profile alignment",
      "Full code handoff — you own everything"
    ],
    featured: false
  },
  {
    tier: "Package 02",
    name: "Commerce Engine",
    desc: "Add transaction-grade backend logic so your site sells with less friction and cleaner operations.",
    price: "$1,600",
    features: [
      "Everything in Signal Foundation",
      "Store backend & catalog logic",
      "Up to 50 products fully configured",
      "Checkout, tax, and order-flow QA",
      "Inventory & variant management",
      "Payment gateway integration"
    ],
    featured: true
  },
  {
    tier: "Package 03",
    name: "Sentinel Automation",
    desc: "Deploy conversational AI to intercept missed demand, qualify intent, and route bookings without manual chaos.",
    price: "$2,000",
    features: [
      "Everything in Signal Foundation",
      "Conversational lead qualification",
      "Missed-call recovery + callback routing",
      "Workflow-tuned booking automation",
      "CRM integration & lead tracking",
      "Monthly optimization review"
    ],
    featured: false
  }
];

interface PackagesProps {
  onNavigate: (page: string) => void;
}

export function Packages({ onNavigate }: PackagesProps) {
  return (
    <section className="packages-section">
      <div className="container">
        <div className="section-eyebrow">Offer Ladder</div>
        <h2 className="section-title">
          Website-first. <span className="text-green">AI-layered.</span> Always sovereign.
        </h2>
        <p className="section-sub">
          The website is the core system. AI is applied as a strategic growth layer once your foundation is conversion-ready.
        </p>
        <div className="packages-grid">
          {PACKAGES.map((pkg) => (
            <div key={pkg.tier} className={`pkg-card${pkg.featured ? " pkg-featured" : ""}`}>
              {pkg.featured && <div className="pkg-badge">Most Popular</div>}
              <div className="pkg-tier">{pkg.tier}</div>
              <div className="pkg-name">{pkg.name}</div>
              <div className="pkg-desc">{pkg.desc}</div>
              <div className="pkg-price">
                {pkg.price}<span> starting</span>
              </div>
              <ul className="pkg-features">
                {pkg.features.map((f) => (
                  <li key={f}>
                    <span className="feat-arrow">→</span> {f}
                  </li>
                ))}
              </ul>
              <a
                className="pkg-cta"
                onClick={() => onNavigate("pricing")}
                style={{ cursor: "pointer" }}
              >
                Inspect Architecture →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
