/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Phone, Shield, X } from "lucide-react";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { Portfolio } from "./Portfolio";
import { About } from "./About";
import { PricingPage } from "./Pricing";
import { Faq } from "./Faq";
import { Contact } from "./Contact";
import { Splash } from "./Splash";
import { Reveal } from "./Reveal";
import { CONTACT } from "@/lib/site";

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

const breadcrumbLabels: Record<string, string> = {
  home: "Home",
  pricing: "Pricing",
  portfolio: "Portfolio",
  about: "About",
  faq: "FAQ",
  contact: "Contact",
};

export function LandingHomeRevamp() {
  const [page, setPage] = useState("home");
  const [roiMissedCalls, setRoiMissedCalls] = useState(5);
  const [roiJobValue, setRoiJobValue] = useState(400);
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
    if (p === "intake") {
      window.location.href = "/intake";
      return;
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    switch (page) {
      case "home":
        return (
          <>
            <Hero onNavigate={navigate} />

            {/* BLOCK B — Problem */}
            <Reveal>
            <section className="outcomes-section">
              <div className="container">
                <span className="section-eyebrow">The Real Problem</span>
                <h2 className="section-title">You&apos;re already paying for leads. <span className="text-amber">You&apos;re just not catching them.</span></h2>
                <div className="outcomes-grid">
                  <div className="outcome-card">
                    <div className="outcome-before">
                      <span className="outcome-label" style={{ color: "#f87171" }}>Pain #1</span>
                      <p><strong>Missed calls while you&apos;re on a roof or in an attic.</strong> Your competitor answers first. That job is gone.</p>
                    </div>
                  </div>
                  <div className="outcome-card">
                    <div className="outcome-before">
                      <span className="outcome-label" style={{ color: "#f87171" }}>Pain #2</span>
                      <p><strong>Rented website (Wix / GoDaddy).</strong> Slow, doesn&apos;t rank on Google Maps, and you never own it. You&apos;re paying monthly for something that&apos;s costing you jobs.</p>
                    </div>
                  </div>
                  <div className="outcome-card">
                    <div className="outcome-before">
                      <span className="outcome-label" style={{ color: "#f87171" }}>Pain #3</span>
                      <p><strong>Google Maps ghost.</strong> Neighbors show up for every search in your area. You don&apos;t.</p>
                    </div>
                  </div>
                </div>
                <div style={{ maxWidth: 560, margin: "32px auto 0", padding: "20px 24px", background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.25)", borderRadius: "12px", textAlign: "center" }}>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--amber)", margin: 0 }}>
                    5 missed calls/week × $400 average job × 4 weeks = <span style={{ fontSize: "22px" }}>$8,000/month</span> left on the table.
                  </p>
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK C — What you get */}
            <Reveal>
            <section className="comparison-section">
              <div className="container">
                <span className="section-eyebrow">The TradeCall System™</span>
                <h2 className="section-title">Everything in <span className="text-amber">one flat-rate build.</span></h2>
                <p className="section-sub">Custom website + missed-call recovery, built for Kern County trades. You own everything the day it goes live.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", margin: "40px 0 32px" }}>
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
                    <div key={i} className="trust-item" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--navy-border)", borderRadius: "8px", padding: "14px 16px" }}>
                      <CheckCircle2 className="check" size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--amber)", marginBottom: "4px" }}>Starting at $1,997</div>
                  <div style={{ fontSize: "14px", color: "var(--cream-dim)", marginBottom: "8px" }}>2–3 weeks · No long-term contract · $997 to start, $1,000 at launch</div>
                  <div style={{ fontSize: "13px", color: "var(--cream-dim)", marginBottom: "24px" }}>Need Spanish for Kern County? +$400 bilingual build.</div>
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>
                    Book Free 20-Min Job Call Audit <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK D — Why Jason */}
            <Reveal>
            <section className="meet-jason-section">
              <div className="container meet-jason-inner">
                <div className="meet-jason-photo">
                  <Image
                    src="/jason.png"
                    alt="Jason Manuel — Founder of Chaotically Organized AI, former licensed building contractor"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    style={{ objectFit: "cover", objectPosition: "center 20%", borderRadius: "16px" }}
                  />
                </div>
                <div className="meet-jason-copy">
                  <span className="section-eyebrow">Not an Agency. Not a Template Mill.</span>
                  <h2 className="section-title" style={{ textAlign: "left" }}>A former contractor <span className="text-amber">who builds digital systems.</span></h2>
                  <p className="meet-jason-text">
                    I&apos;m Jason Manuel. I live in Bakersfield. Before I built websites and AI lead systems, I was a licensed building contractor in Florida — running multi-trade residential projects, coordinating plumbing, electrical, HVAC, and framing crews, and owning the P&L.
                  </p>
                  <p className="meet-jason-text">
                    I started COAI because I watched local trades get locked into monthly website rentals that don&apos;t rank and don&apos;t text missed callers back. I do it differently: you pay once, you own it, and you can call me directly when something breaks.
                  </p>
                  <p className="meet-jason-text">
                    I take a few clients at a time so each job gets full attention. If that sounds like how business should work, let&apos;s talk.
                  </p>
                  <div className="meet-jason-actions">
                    <a href={`tel:${CONTACT.phoneE164}`} className="btn-phone" style={{ display: "inline-flex" }}>
                      <Phone size={16} aria-hidden="true" /> {CONTACT.phoneDisplay}
                    </a>
                    <a className="btn-secondary" onClick={() => navigate("about")} style={{ cursor: "pointer" }}>
                      More About Jason
                    </a>
                  </div>
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK E — Proof / Testimonials */}
            <Reveal>
            <section className="testi-section">
              <div className="container">
                <span className="section-eyebrow">Real Results</span>
                <h2 className="section-title">What Bakersfield <span className="text-amber">business owners say.</span></h2>
                <p className="section-sub">No fake reviews. Real talk from local owners who needed help and actually got it.</p>
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
            </Reveal>

            {/* BLOCK F — Comparison table */}
            <Reveal>
            <section className="comparison-section" style={{ paddingTop: 0 }}>
              <div className="container">
                <span className="section-eyebrow">Why Sovereign</span>
                <h2 className="section-title">What you build with us vs <span className="text-amber">what you rent.</span></h2>
                <div className="comparison-table-wrap">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="col-coai">TradeCall System</th>
                        <th className="col-rented">Wix / GoDaddy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>You own the code</td><td className="yes">Yes — it&apos;s yours</td><td className="no">No — you rent it</td></tr>
                      <tr><td>Monthly platform fee</td><td className="yes">Hosting only (~$10/mo)</td><td className="no">$16–$50+/mo forever</td></tr>
                      <tr><td>Missed-call text-back</td><td className="yes">Included — under 30 seconds</td><td className="no">Not available</td></tr>
                      <tr><td>Local human support</td><td className="yes">Call Jason directly</td><td className="no">Chatbot or ticket queue</td></tr>
                      <tr><td>Clear upfront price</td><td className="yes">You approve before we start</td><td className="no">Tiered, upgrades hidden</td></tr>
                      <tr><td>Can take it anywhere</td><td className="yes">Export and go</td><td className="no">Locked in forever</td></tr>
                      <tr><td>Schema / AI-ready markup</td><td className="yes">Built in from day one</td><td className="no">Not available</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK G — How it works */}
            <Reveal>
            <section className="outcomes-section">
              <div className="container">
                <span className="section-eyebrow">The Process</span>
                <h2 className="section-title">Three steps. <span className="text-amber">No surprises.</span></h2>
                <div className="outcomes-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
                  {[
                    {
                      step: "1",
                      title: "Free Job Call Audit (20 min)",
                      desc: "We review your site, Google Business Profile, and missed-call leak. You get a written report — no pitch, no pressure.",
                    },
                    {
                      step: "2",
                      title: "Fixed scope & price",
                      desc: "Written proposal. You approve every line before work starts. $997 to begin, $1,000 at launch.",
                    },
                    {
                      step: "3",
                      title: "Build & launch (2–3 weeks)",
                      desc: "You own everything the day it goes live — code, domain, content. Export and leave anytime.",
                    },
                  ].map((s) => (
                    <div key={s.step} className="outcome-card" style={{ textAlign: "left" }}>
                      <div style={{ fontSize: "36px", fontWeight: 900, color: "var(--amber)", lineHeight: 1, marginBottom: "12px" }}>{s.step}</div>
                      <div className="outcome-after">
                        <span className="outcome-label">{s.title}</span>
                        <p>{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK — ROI Calculator (keep — it's good) */}
            <Reveal>
            <section className="roi-section">
              <div className="container">
                <span className="section-eyebrow">Do the Math</span>
                <h2 className="section-title">How much are <span className="text-amber">missed calls costing you?</span></h2>
                <p className="section-sub">Plug in your numbers. This isn&apos;t a sales pitch — it&apos;s just arithmetic.</p>
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
                  <p className="roi-note">That&apos;s what you leave on the table every month when missed calls go unanswered. The TradeCall System texts them back in seconds — most respond within minutes.</p>
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK H — FAQ */}
            <Reveal>
            <section className="outcomes-section">
              <div className="container">
                <span className="section-eyebrow">Common Questions</span>
                <h2 className="section-title">Straight answers <span className="text-amber">no agency-speak.</span></h2>
                <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[
                    { q: "How long does it take?", a: "2–3 weeks from signed proposal to launch. You get a real timeline in the proposal, not a vague \"4–6 weeks.\"" },
                    { q: "Do I own the website?", a: "Yes. The code is yours the day we go live. You can move it to any host, hand it to another developer, or export it entirely. No lock-in." },
                    { q: "What if I already have a Wix site?", a: "We can migrate your content and replace it with something you own. No Wix account required after launch." },
                    { q: "Do I need to be techy?", a: "No. You approve the design, supply your logo and photos, and we handle everything else. Most clients need zero technical knowledge." },
                    { q: "What's not included?", a: "Ad spend (Google/Meta), ongoing monthly content unless you add a retainer ($197/mo), and services outside web+lead — like PC repair. Call me for that separately." },
                    { q: "Can I pay half now, half at launch?", a: "Yes — $997 to start work, $1,000 when we go live. That's the standard split." },
                  ].map((faq, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--navy-border)", borderRadius: "10px", padding: "20px 24px" }}>
                      <div style={{ fontWeight: 700, fontSize: "16px", color: "var(--cream)", marginBottom: "8px" }}>{faq.q}</div>
                      <div style={{ fontSize: "14px", color: "var(--cream-dim)", lineHeight: 1.7 }}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            </Reveal>

            {/* BLOCK I — Final CTA */}
            <Reveal>
            <section className="final-cta">
              <div className="container">
                <span className="section-eyebrow" style={{ justifyContent: "center", display: "block", textAlign: "center" }}>Start Here — Free</span>
                <h2>Stop guessing. See what&apos;s<br /><span className="text-amber">costing you job calls.</span></h2>
                <p>Free 20-minute Job Call Audit. We check your site, Google profile, schema, and missed-call flow — and hand you a written report. No pitch, no pressure, just the truth.</p>
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
                </div>
                <a href={`tel:${CONTACT.phoneE164}`} className="cta-phone">{CONTACT.phoneDisplay}</a>
                <div className="final-cta-actions">
                  <a className="btn-primary" onClick={() => navigate("intake")} style={{ cursor: "pointer" }}>Book My Free Audit <ArrowRight size={16} aria-hidden="true" /></a>
                </div>
                <p className="final-cta-note" style={{ opacity: 0.7, fontSize: "13px" }}>I only take a few builds per month so quality stays high.</p>
              </div>
            </section>
            </Reveal>

            {/* Guarantee */}
            <Reveal>
            <section className="guarantee-banner-section">
              <div className="container">
                <div className="guarantee-banner">
                  <div className="guarantee-banner-icon">
                    <Shield size={32} strokeWidth={2} />
                  </div>
                  <div className="guarantee-banner-copy">
                    <h3>No Risk. You Own What We Build.</h3>
                    <p>If you&apos;re not happy before we launch, you don&apos;t pay. The website code is yours from the moment it goes live — no monthly platform tax, no lock-in. You can take it anywhere. That&apos;s not a marketing guarantee. That&apos;s just how I do business.</p>
                  </div>
                </div>
              </div>
            </section>
            </Reveal>
          </>
        );
      case "portfolio":
        return <Portfolio onNavigate={navigate} />;
      case "about":
        return <About onNavigate={navigate} />;
      case "pricing":
        return <PricingPage onNavigate={navigate} />;
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
          <a href={`tel:${CONTACT.phoneE164}`} className="sticky-mobile-phone">
            <Phone size={18} aria-hidden="true" />
            Call Jason
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
            <h3>Get Your Free Job Call Audit</h3>
            <p>Takes 20 minutes. I&apos;ll check your site, Google profile, schema, and missed-call flow — then send you a written report with the fixes that matter most. No pitch, no pressure.</p>
            <div className="scroll-modal-actions">
              <a className="btn-primary" onClick={() => { setShowScrollModal(false); navigate("intake"); }} style={{ cursor: "pointer" }}>
                Book My Free Audit <ArrowRight size={16} aria-hidden="true" />
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
