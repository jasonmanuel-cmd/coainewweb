"use client";

import React from "react";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-mesh" />
      <div className="container hero-inner">
        <div className="hero-left">
          <div className="hero-pill">
            Bakersfield, CA · Since 2024
          </div>
          <h1 className="hero-h1">
            Websites, AI automation &amp; tech support for <span className="highlight">Bakersfield tradesmen.</span>
          </h1>
          <p className="hero-sub">
            <strong>Chaotically Organized AI</strong> builds sovereign websites you own, sets up AI that answers your missed calls, and fixes computers — all without the jargon or the runaround. Local, honest, and priced straight.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
              Get Your Free Digital Audit →
            </a>
            <a className="btn-phone" href="tel:6615694244">
              (661) 569-4244
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="check">✓</span> You own the website — no monthly rental</div>
            <div className="trust-item"><span className="check">✓</span> Clear pricing, no hidden fees</div>
            <div className="trust-item"><span className="check">✓</span> Built for Bakersfield businesses</div>
            <div className="trust-item"><span className="check">✓</span> Phone support — talk to a human</div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-card-icon">🔧</div>
            <h3>What we do, plain and simple:</h3>
            <ul className="hero-card-list">
              <li>Websites you actually own (not rented from Wix)</li>
              <li>AI that texts your missed callers back instantly</li>
              <li>Computer repair &amp; tech support — no BS</li>
              <li>Google setup so customers can find you</li>
              <li>Free 20-minute audit to show you what&apos;s broken</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="stat-banner">
        {[
          { num: "50+", label: "Services Offered" },
          { num: "$50", label: "PC Repair Starting Price" },
          { num: "661", label: "Bakersfield Local" },
          { num: "100%", label: "You Own What We Build" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
