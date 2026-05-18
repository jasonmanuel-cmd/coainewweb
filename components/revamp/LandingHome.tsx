"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Shield, Zap, Search, Phone, X } from "lucide-react";
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
    desc: "LeadShield captures every missed call for trades businesses. It auto-texts each missed caller back within seconds, scores leads HOT/WARM/COLD by response, and runs automated follow-up sequences until the lead converts or opts out. One HVAC contractor recovered 12+ new jobs in the first week — paid for itself 3x over in month one.",
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
    desc: "COAI websites generate consistent job leads for trades businesses. We hand-code each site with geo-targeted schema and AEO-optimized content that ranks on Google Maps and surfaces inside ChatGPT, Claude, and Perplexity AI answers. HubSpot reports 58% of Google searches now result in zero clicks — COAI websites capture that AI search traffic. No Wix, no WordPress, no monthly tax.",
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
    desc: "SiteER audits any website for revenue leaks. The free 60-second scan checks performance, schema coverage, mobile speed, and AI readiness — then assigns an A–F grade with a dollar-figure revenue impact. According to Google, a 1-second mobile delay drops conversions by 20%. SiteER shows exactly what's costing you money.",
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
  { step: "1", title: "We Audit", desc: "Free 20-minute screen-share. We check your site speed, Google profile, schema, and lead flow — then hand you a written report with prioritized fixes and dollar-figure revenue impact." },
  { step: "2", title: "We Build", desc: "No templates, no drag-and-drop. We hand-code a sovereign site you own completely, with clear pricing you approve before we start. Machine-readable schema embedded from day one — AI engines can extract your business facts immediately." },
  { step: "3", title: "You Win", desc: "More calls, more booked jobs, less stress. Your site works for you 24/7 — capturing leads from Google search, AI chat answers, and missed-call recovery in one unified system." },
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

const outcomes = [
  {
    before: "No website. Customers found him through word-of-mouth only.",
    after: "Live sovereign site with Google schema. First client call within the first week of going live.",
    author: "— Edwin Ward, Website Client",
  },
  {
    before: "Wix site that loaded slow, didn't rank, and cost $23/month with no lead tracking.",
    after: "Custom-coded site that's fast, ranks on Google Maps, and captures every lead with AI follow-up.",
    author: "— Christopher Moore, Trades Business",
  },
  {
    before: "Restaurant had no online presence. Relying entirely on foot traffic.",
    after: "Built a website that brought in online orders and new customers who found them through search.",
    author: "— Los boricuas, Restaurant Owner, Bakersfield",
  },
  {
    before: "Record label had an outdated site that didn't reflect their brand.",
    after: "Professional, sleek website that matches their brand identity and drives engagement.",
    author: "— Matthew Hoover, PWR Records",
  },
];

const breadcrumbLabels: Record<string, string> = {
  home: "Home",
  pricing: "Pricing",
  portfolio: "Portfolio",
  about: "About",
  faq: "FAQ",
  contact: "Contact",
  intake: "Free Diagnostic",
};

export function LandingHomeRevamp() {
  const [page, setPage] = useState("home");
  const [roiMissedCalls, setRoiMissedCalls] = useState(5);
  const [roiJobValue, setRoiJobValue] = useState(300);
  const [showScrollModal, setShowScrollModal] = useState(false);
  const scrollModalShown = useRef(false);
  const roiMonthlyLoss = roiMissedCalls * roiJobValue * 4;
  const roiYearlyLoss = roiMissedCalls * roiJobValue * 52;

  useEffect(() => {
    if (page !== "home" || scrollModalShown.current) return;
    let triggered = false;
    const handler = () => {
      if (triggered) return;
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct > 0.6) {
        triggered = true;
        scrollModalShown.current = true;
        setShowScrollModal(true);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [page]);

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

            {/* Comparison: COAI vs Rented Platforms */}
            <section className="comparison-section">
              <div className="container">
                <span className="section-eyebrow">Why Sovereign</span>
                <h2 className="section-title">What you build with us vs <span className="text-amber">what you rent.</span></h2>
                <p className="section-sub">No spin. Just the honest difference between owning your digital infrastructure and paying a platform forever.</p>
                <div className="comparison-table-wrap">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="col-coai">COAI Build</th>
                        <th className="col-rented">Wix / GoDaddy / Squarespace</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>You own the code</td><td className="yes">Yes — it's yours</td><td className="no">No — you rent it</td></tr>
                      <tr><td>Monthly platform fee</td><td className="yes">Hosting only (~$10/mo)</td><td className="no">$16–$50+/mo forever</td></tr>
                      <tr><td>Custom-coded HTML/JS</td><td className="yes">Hand-built, fast</td><td className="no">Drag-and-drop bloat</td></tr>
                      <tr><td>Can take it anywhere</td><td className="yes">Export and go</td><td className="no">Locked into their platform</td></tr>
                      <tr><td>Schema / AI-ready markup</td><td className="yes">Built in from day one</td><td className="no">Not available</td></tr>
                      <tr><td>Missed call text-back</td><td className="yes">Included in bundles</td><td className="no">Not available</td></tr>
                      <tr><td>AI receptionist (24/7)</td><td className="yes">Cipher chat embed</td><td className="no">Not available</td></tr>
                      <tr><td>Phone support</td><td className="yes">Talk to a human</td><td className="no">Chatbot or ticket queue</td></tr>
                      <tr><td>Clear upfront pricing</td><td className="yes">You approve before we start</td><td className="no">Tiered, upgrades hidden</td></tr>
                    </tbody>
                  </table>
                </div>
                <div style={{ textAlign: "center", marginTop: "24px" }}>
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>
                    See Pricing Before You Commit <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            {/* ROI Calculator */}
            <section className="roi-section">
              <div className="container">
                <span className="section-eyebrow">Do the Math</span>
                <h2 className="section-title">How much are <span className="text-amber">missed calls costing you?</span></h2>
                <p className="section-sub">Plug in your numbers. This isn't a sales pitch — it's just arithmetic.</p>
                <div className="roi-calculator">
                  <div className="roi-inputs">
                    <div className="roi-input-group">
                      <label htmlFor="roi-calls">Missed calls per week</label>
                      <input id="roi-calls" type="number" value={roiMissedCalls} onChange={e => setRoiMissedCalls(Math.max(0, parseInt(e.target.value) || 0))} min="0" />
                    </div>
                    <div className="roi-input-group">
                      <label htmlFor="roi-job">Average job value ($)</label>
                      <input id="roi-job" type="number" value={roiJobValue} onChange={e => setRoiJobValue(Math.max(0, parseInt(e.target.value) || 0))} min="0" step="50" />
                    </div>
                  </div>
                  <div className="roi-result">
                    <div className="roi-result-item">
                      <span className="roi-result-label">Missed revenue per month</span>
                      <span className="roi-result-value">${roiMonthlyLoss.toLocaleString()}</span>
                    </div>
                    <div className="roi-result-item">
                      <span className="roi-result-label">Missed revenue per year</span>
                      <span className="roi-result-value">${roiYearlyLoss.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="roi-note">That's what you leave on the table every month when missed calls go unanswered. LeadShield texts them back in seconds — most respond within minutes.</p>
                </div>
              </div>
            </section>

            {/* Meet Jason — Personal Trust */}
            <section className="meet-jason-section">
              <div className="container meet-jason-inner">
                <div className="meet-jason-photo">
                  <div className="meet-jason-placeholder">
                    <span>JM</span>
                  </div>
                </div>
                <div className="meet-jason-copy">
                  <span className="section-eyebrow">Who You're Working With</span>
                  <h2 className="section-title" style={{ textAlign: "left" }}>Just me. <span className="text-amber">No agency. No middleman.</span></h2>
                  <p className="meet-jason-text">
                    I'm Jason Robert Manuel. I live in Bakersfield, I run this business by myself, and I'm good at what I do. I build websites that work — hand-coded, fast, and designed to bring in actual job calls, not just look pretty.
                  </p>
                  <p className="meet-jason-text">
                    I started this because I saw local businesses getting ripped off by template builders who charge monthly for something they should've just given you outright. I do it differently: you pay once, you own it forever, and you can call me directly if something breaks.
                  </p>
                  <p className="meet-jason-text">
                    I'm not a big agency. I'm not trying to scale to 100 clients. I take on a few at a time so each one gets my full attention. If that sounds like how business should work, let's talk.
                  </p>
                  <div className="meet-jason-actions">
                    <a href="tel:6615694244" className="btn-phone" style={{ display: "inline-flex" }}>
                      <Phone size={16} aria-hidden="true" /> (661) 569-4244
                    </a>
                    <a className="btn-secondary" onClick={() => navigate("about")} style={{ cursor: "pointer" }}>
                      Read More About Me
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Honest Guarantee Banner */}
            <section className="guarantee-banner-section">
              <div className="container">
                <div className="guarantee-banner">
                  <div className="guarantee-banner-icon">
                    <Shield size={32} strokeWidth={2} />
                  </div>
                  <div className="guarantee-banner-copy">
                    <h3>No Risk. You Own What We Build.</h3>
                    <p>If you're not happy before we launch, you don't pay. The website code is yours from the moment it goes live — no monthly platform tax, no lock-in, no &ldquo;we own your site until you renew.&rdquo; You can take it anywhere. That's not a marketing guarantee. That's just how I do business.</p>
                  </div>
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer", flexShrink: 0 }}>
                    Start Risk-Free <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>

            {/* Before/After Outcomes */}
            <section className="outcomes-section">
              <div className="container">
                <span className="section-eyebrow">Real Outcomes</span>
                <h2 className="section-title">Before and after <span className="text-amber">working with COAI.</span></h2>
                <p className="section-sub">Real stories from real clients. No inflated numbers, no fake before-and-afters.</p>
                <div className="outcomes-grid">
                  {outcomes.map((o, i) => (
                    <div key={i} className="outcome-card">
                      <div className="outcome-before">
                        <span className="outcome-label">Before</span>
                        <p>{o.before}</p>
                      </div>
                      <div className="outcome-arrow">→</div>
                      <div className="outcome-after">
                        <span className="outcome-label">After</span>
                        <p>{o.after}</p>
                      </div>
                      <div className="outcome-author">{o.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

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
      {page !== "home" && (
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a onClick={() => navigate("home")}>Home</a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{breadcrumbLabels[page] || page}</span>
        </nav>
      )}
      <main>{renderContent()}</main>
      <Footer onNavigate={navigate} />

      {/* Sticky Mobile CTA */}
      {page === "home" && (
        <div className="sticky-mobile-cta">
          <a href="tel:6615694244" className="sticky-mobile-phone">
            <Phone size={18} aria-hidden="true" />
            Call Now
          </a>
          <a className="sticky-mobile-audit" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>
            Free Audit
          </a>
        </div>
      )}

      {/* Scroll-Depth Capture Modal */}
      {showScrollModal && (
        <div className="scroll-modal-overlay" onClick={() => setShowScrollModal(false)}>
          <div className="scroll-modal" onClick={e => e.stopPropagation()}>
            <button className="scroll-modal-close" onClick={() => setShowScrollModal(false)} aria-label="Close">
              <X size={20} />
            </button>
            <span className="scroll-modal-eyebrow">Before You Go</span>
            <h3>Want a free website audit?</h3>
            <p>Takes 30 seconds. I'll check your site speed, SEO coverage, and AI readiness — then send you a written report with the fixes that matter most. No pitch, no pressure.</p>
            <div className="scroll-modal-actions">
              <a className="btn-primary" onClick={() => { setShowScrollModal(false); navigate("intake"); }} style={{ cursor: "pointer" }}>
                Run My Free Audit <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="btn-secondary" onClick={() => setShowScrollModal(false)} style={{ cursor: "pointer" }}>
                Maybe Later
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
