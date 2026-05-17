"use client";

import React, { useState } from "react";
import { ArrowRight, CalendarDays, Shield, Zap, Search } from "lucide-react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { GuaranteeBadge } from "./GuaranteeBadge";
import { Footer } from "./Footer";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { PricingPage } from "./Pricing";
import { IntakePage } from "./Intake";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { ServicesGrid } from "./ServicesGrid";
import { ServiceAreaMap } from "./ServiceAreaMap";
import { Splash } from "./Splash";

const products = [
  {
    icon: Shield,
    tag: "Get More Calls",
    name: "LeadShield",
    desc: "Stop losing jobs to voicemail. LeadShield instantly texts every missed caller back, scores them HOT/WARM/COLD, and re-engages cold leads automatically. One HVAC contractor recovered 12+ new jobs in the first week.",
    features: [
      "Auto-texts missed callers in seconds",
      "Lead scoring — call the hot leads first",
      "Automated follow-up sequences",
      "Works with your existing phone number",
    ],
    cta: "Recover Missed Calls",
  },
  {
    icon: Zap,
    tag: "Rank Higher, Get Found",
    name: "COAI",
    desc: "Generate consistent job leads with a custom website built for trades. We hand-code sovereign sites with geo-targeted schema and AI-optimized content that ranks on Google Maps and surfaces in AI search results. No Wix, no WordPress, no monthly tax.",
    features: [
      "Custom-coded website you fully own",
      "AI receptionist (Cipher) answers calls 24/7",
      "Local SEO that ranks on Google Maps",
      "Schema markup built for AI search visibility",
    ],
    cta: "Build My Lead System",
  },
  {
    icon: Search,
    tag: "Find Revenue Leaks",
    name: "SiteER",
    desc: "See exactly where you're losing calls and jobs online. Free 60-second scan grades your site A–F on performance, schema, and AI readiness — with a prioritized fix list showing what's leaking revenue from your business.",
    features: [
      "Full speed & schema audit in 60 seconds",
      "A–F grade with dollar revenue impact",
      "Prioritized fix list for your business",
      "Treatment plans starting at $500",
    ],
    cta: "See Your Grade",
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

const howSteps = [
  { step: "1", title: "We Audit", desc: "Free 20-minute screen-share. We check your site speed, Google profile, schema, and lead flow — then hand you a written report." },
  { step: "2", title: "We Build", desc: "No templates, no drag-and-drop. We hand-code a sovereign site you own completely, with pricing you approve before we start." },
  { step: "3", title: "You Win", desc: "More calls, more booked jobs, less stress. Your site works for you 24/7 — and you can call us anytime." },
];

const testimonials = [
  {
    text: "Jason is genuinely extremely impressive. He is an adept coder, he can design websites and AI systems in weeks. He has transformed our business, and he can make you almost anything! Go the chaotic way!",
    author: "Ryan & Ted",
    role: "Business Owners",
  },
  {
    text: "Jason did an amazing job building my website — from live results to sleek design he did it all. Also more affordable than 85% of the other companies out there.",
    author: "Edwin Ward",
    role: "Website Client",
  },
  {
    text: "Great professional work and talented. I started making money with the website he built me.",
    author: "Los boricuas",
    role: "Restaurant Owner, Bakersfield",
  },
];

export function LandingHomeRevamp() {
  const [page, setPage] = useState("home");

  const navigate = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
                <p className="section-sub">Whether you need a website, lead recovery, or a full tech overhaul — we&apos;ve got you covered under one roof.</p>
                <div className="services-grid">
                  {products.map((p, i) => (
                    <div key={p.name} className="service-card">
                      <div className="service-card-icon" aria-hidden="true">
                        <p.icon size={28} strokeWidth={2.2} />
                      </div>
                      <div className="service-card-tag">{p.tag}</div>
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <ul>
                        {p.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <span className="service-card-cta">{p.cta} <ArrowRight size={16} aria-hidden="true" /></span>
                      {i === 1 && (
                        <div className="service-testi-inline">
                          <span className="service-testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
                          <p>&ldquo;Jason helped me build a website for my business, increased my online presence.&rdquo; — <strong>Christopher Moore</strong></p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="guarantee-row">
                  <GuaranteeBadge type="audit" compact />
                  <GuaranteeBadge type="build" compact />
                  <GuaranteeBadge type="automation" compact />
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
                    <a className="bundle-cta" href={b.sq} target="_blank" rel="noopener noreferrer">
                      Buy Now — {b.price} <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "40px" }}>
                <GuaranteeBadge type="audit" />
                <GuaranteeBadge type="build" />
              </div>
            </section>

            {/* Comprehensive Services Grid */}
            <ServicesGrid />

            {/* Service Area Map */}
            <ServiceAreaMap />

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
                <div className="final-cta-social">
                  <div className="final-cta-testi">
                    <span className="testi-stars" aria-label="5 out of 5 stars">★★★★★</span>
                    <p>&ldquo;Jason just completed a website for our Record Label. He did professional, technical, amazing job on our website.&rdquo;</p>
                    <span className="testi-attribution">— Matthew Hoover, PWR Records</span>
                  </div>
                  <div className="final-cta-badges">
                    <span className="trust-badge">Local Bakersfield Owners</span>
                    <span className="trust-badge">Sovereign — You Own It</span>
                    <span className="trust-badge">No Contracts</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
                    <GuaranteeBadge type="audit" compact />
                  </div>
                </div>
                <a href="tel:6615694244" className="cta-phone">(661) 569-4244</a>
                <div className="final-cta-actions">
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>Get My Free Audit <ArrowRight size={16} aria-hidden="true" /></a>
                  <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer">
                    <CalendarDays size={18} aria-hidden="true" />
                    Book Free Audit
                  </a>
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
      <Splash />
      <Nav activePage={page} onNavigate={navigate} />
      <main>{renderContent()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}
