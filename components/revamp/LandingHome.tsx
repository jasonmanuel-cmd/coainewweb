"use client";

import React, { useState } from "react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { PricingPage } from "./Pricing";
import { IntakePage } from "./Intake";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { ServicesGrid } from "./ServicesGrid";

const products = [
  {
    icon: "🛡️",
    tag: "Missed Call Recovery",
    name: "LeadShield",
    desc: "Never lose a lead to a missed call again. LeadShield instantly texts every missed caller back, scores them HOT/WARM/COLD, and re-engages cold leads automatically.",
    features: [
      "Auto-texts missed callers in seconds",
      "Lead scoring — know who to call first",
      "Automated follow-up sequences",
      "No setup fees, works with your existing number",
    ],
    cta: "Learn More",
  },
  {
    icon: "⚡",
    tag: "Full Service Agency",
    name: "COAI",
    desc: "Sovereign websites, AI automation, and digital strategy. We build everything you own outright — no platform lock-in, no monthly builder tax, no nonsense.",
    features: [
      "Custom-coded websites you fully own",
      "AI receptionist (Cipher) answers calls 24/7",
      "SEO, AEO & GEO — show up everywhere",
      "Google Business Profile optimization",
    ],
    cta: "Explore Services",
  },
  {
    icon: "🔍",
    tag: "Website Diagnostics",
    name: "SiteER",
    desc: "60-second website audit that grades your site A–F, tells you exactly how much revenue you're leaking, and gives you a treatment plan to fix it.",
    features: [
      "Full performance & schema audit",
      "A–F grading with revenue impact",
      "Prioritized fix list for your developer",
      "Treatment plans from $500",
    ],
    cta: "Run a Scan",
  },
];

const bundles = [
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
  },
];

const howSteps = [
  { step: "1", title: "We Audit", desc: "Free 20-minute screen-share. We check your site speed, Google profile, schema, and lead flow — then hand you a written report." },
  { step: "2", title: "We Build", desc: "No templates, no drag-and-drop. We hand-code a sovereign site you own completely, with pricing you approve before we start." },
  { step: "3", title: "You Win", desc: "More calls, more booked jobs, less stress. Your site works for you 24/7 — and you can call us anytime." },
];

const testimonials = [
  {
    text: "Jason built our plumbing company website from scratch. For the first time, I actually understand what I'm paying for. No more $200/mo for a site I don't own.",
    author: "Mike R.",
    role: "Plumber, Bakersfield",
  },
  {
    text: "The missed-call text-back alone paid for itself in the first week. I was losing jobs to voicemail and didn't even know it.",
    author: "David T.",
    role: "HVAC Contractor, Kern County",
  },
  {
    text: "My old site was on Wix and nobody could find me. COAI rebuilt it, fixed my Google profile, and I'm actually getting calls now.",
    author: "Tony M.",
    role: "Electrician, Bakersfield",
  },
];

export function LandingHomeRevamp() {
  const [page, setPage] = useState("home");

  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBundleCTA = (name: string) => {
    navigate("pricing");
  };

  const renderContent = () => {
    switch (page) {
      case "home":
        return (
          <>
            <Hero onNavigate={navigate} />

            {/* Services Overview — LeadShield, COAI, SiteER merged in */}
            <section className="services-overview">
              <div className="container">
                <span className="section-eyebrow">What We Do</span>
                <h2 className="section-title">Three ways we help you <span className="text-amber">win more jobs.</span></h2>
                <p className="section-sub">Whether you need a website, lead recovery, or a full tech overhaul — we've got you covered under one roof.</p>
                <div className="services-grid">
                  {products.map((p) => (
                    <div key={p.name} className="service-card">
                      <div className="service-card-icon">{p.icon}</div>
                      <div className="service-card-tag">{p.tag}</div>
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <ul>
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <span className="service-card-cta">{p.cta} →</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="how-section">
              <div className="container">
                <span className="section-eyebrow">How It Works</span>
                <h2 className="section-title">Three steps to <span className="text-amber">getting it done.</span></h2>
                <p className="section-sub">No contracts, no mystery pricing, no hand-holding through a sales process. Just straight talk and good work.</p>
                <div className="how-grid">
                  {howSteps.map((s) => (
                    <div key={s.step} className="how-step">
                      <div className="how-num">{s.step}</div>
                      <h3>{s.title}</h3>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Flagship Bundles */}
            <section className="bundles-section">
              <div className="container">
                <span className="section-eyebrow">Done-For-You Packages</span>
                <h2 className="section-title">One price. <span className="text-amber">Everything wired.</span> No decision fatigue.</h2>
                <p className="section-sub">Pick the bundle that fits. No upsells, no hidden fees — just a straight price for a complete solution.</p>
              </div>
              <div className="bundles-grid">
                {bundles.map((b) => (
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
                    <a className="bundle-cta" onClick={() => handleBundleCTA(b.name)} style={{ cursor: "pointer" }}>
                      Get This Package →
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Comprehensive Services Grid */}
            <ServicesGrid onNavigate={navigate} />

            {/* Testimonials */}
            <section className="testi-section">
              <div className="container">
                <span className="section-eyebrow">Real Results</span>
                <h2 className="section-title">What Bakersfield <span className="text-amber">business owners say.</span></h2>
                <p className="section-sub">No fake reviews. Just real talk from local tradesmen who needed help and actually got it.</p>
                <div className="testi-grid">
                  {testimonials.map((t) => (
                    <div key={t.author} className="testi-card">
                      <div className="testi-text">{t.text}</div>
                      <div className="testi-author">{t.author}</div>
                      <div className="testi-role">{t.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
              <div className="container">
                <span className="section-eyebrow" style={{ justifyContent: "center", display: "block", textAlign: "center" }}>Start Here — Free</span>
                <h2>Ready to stop guessing<br />and <span className="text-amber">start getting calls?</span></h2>
                <p>Free 20-minute digital audit. We check your site speed, Google profile, schema, and lead flow — and hand you a written report. No pitch, no pressure, just the truth.</p>
                <a href="tel:6615694244" className="cta-phone">(661) 569-4244</a>
                <div className="final-cta-actions">
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>Get My Free Audit →</a>
                  <a className="btn-secondary" onClick={() => navigate("pricing")} style={{ cursor: "pointer" }}>See Full Pricing</a>
                </div>
                <p className="final-cta-note">Accepting limited new clients this month</p>
              </div>
            </section>
          </>
        );
      case "portfolio":
        return <Portfolio onNavigate={navigate} />;
      case "about":
        return <About onNavigate={navigate} />;
      case "pricing":
        return <PricingPage onNavigate={navigate} />;
      case "intake":
        return <IntakePage />;
      case "faq":
        return <Faq />;
      case "contact":
        return <Contact />;
      default:
        return (
          <div style={{ padding: "100px 0", textAlign: "center", minHeight: "60vh" }}>
            <h2 className="section-title">Coming Soon</h2>
            <p className="section-sub" style={{ margin: "0 auto" }}>The {page} page is being migrated.</p>
            <a className="btn-primary" onClick={() => navigate("home")} style={{ cursor: "pointer", marginTop: "24px" }}>Back to Home</a>
          </div>
        );
    }
  };

  return (
    <div className="revamp-shell">
      <Nav activePage={page} onNavigate={navigate} />
      <main>{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
