"use client";

import React, { useState } from "react";

const CASES = [
  {
    id: "phils", category: "food", industry: "Food & Beverage",
    client: "Phil's Cheesesteaks & More",
    location: "1112 19th St · Bakersfield, CA · Est. 1978",
    desc: "Owner Felipe brought his North Philly roots and Boricua flavor to downtown Bakersfield — real Cheez Whiz, thinly sliced ribeye, smash burgers, and crinkle-cut fries. COAI built a conversion-first restaurant site with online ordering integration, DoorDash linkage, Google Business alignment, and a menu system designed to drive pickup revenue and repeat visits.",
    built: ["Menu System","Online Order Flow","DoorDash Integration","GBP Schema","Mobile-First","Review Aggregation"],
    url: "https://phils-cheesesteaks-and-more.com",
    accent: "#f97316"
  },
  {
    id: "lastnight", category: "events", industry: "Party & Event Services",
    client: "Last Night 2",
    location: "Event Production · Bakersfield, CA",
    desc: "Last Night 2 provides high-energy event production, party rentals, and professional DJ services. COAI built a high-visibility landing page designed to showcase the vibe and capture booking leads in a single session.",
    built: ["High-Vibe Layout","Booking Funnel","Social Integration","Fast Load Speed","Mobile Optimized"],
    url: "https://lastnight2.vercel.app/",
    accent: "#ff00ff"
  },
  {
    id: "williamdean", category: "photo", industry: "Photography",
    client: "William Dean Photography",
    location: "Bakersfield, CA · Professional Studio",
    desc: "Professional photography studio specializing in portraits, events, and commercial work. COAI built a portfolio-first experience that prioritizes image quality and client booking simplicity.",
    built: ["Image Optimization","Client Booking","Portfolio Grid","Gallery Schema","Contact Funnel"],
    url: "https://www.williamdeanrealphotography.com",
    accent: "#ffffff"
  },
  {
    id: "homegrowmoney", category: "apparel", industry: "Apparel & Lifestyle",
    client: "Home Grow Money",
    location: "E-commerce · Lifestyle Brand",
    desc: "A lifestyle and apparel brand focused on community and growth. COAI built a sovereign storefront designed for high-impact brand storytelling and frictionless product discovery.",
    built: ["Storefront Design","Product Display","Brand Storytelling","Secure Checkout","Mobile Commerce"],
    url: "https://homegrowmoney.com",
    accent: "#10d98a"
  },
  {
    id: "tandmbak", category: "logistics", industry: "Hauling & Trash Removal",
    client: "T&M Bak",
    location: "Bakersfield, CA · Local Logistics",
    desc: "T&M Bak provides reliable hauling, junk removal, and site cleanup services. COAI built a utility-focused lead engine that lets clients request quotes and schedule pickups with zero friction.",
    built: ["Quote Engine","Service Breakdown","Local SEO","Mobile Capture","Fast Response Path"],
    url: "https://www.tandmbak.com",
    accent: "#fbbf24"
  },
  {
    id: "dffb", category: "care", industry: "Senior Living Placement",
    client: "DFFB Senior Living",
    location: "Placement Services · Bakersfield, CA",
    desc: "DFFB helps families navigate the complexities of senior living placement with compassion and expertise. COAI built a trust-focused informational hub designed to facilitate delicate conversations and capture qualified leads.",
    built: ["Trust-Forward UI","Resource Center","Qualified Intake","Privacy Schema","Expert Positioning"],
    url: "https://dffbseniorliving.com",
    accent: "#60a5fa"
  },
  {
    id: "poisonwell", category: "music", industry: "Record Label",
    client: "Poison Well Records",
    location: "Bakersfield, CA · Independent Music",
    desc: "An independent record label focused on raw talent and authentic sound. COAI built a dark-mode artist showcase and label hub designed for music discovery and brand authority.",
    built: ["Dark Mode Aesthetic","Artist Portfolios","Audio Integration","Release Pipeline","Label Branding"],
    url: "https://poisonwellrecords.com",
    accent: "#f87171"
  },
  {
    id: "edwin", category: "finance", industry: "Credit Restoration",
    client: "Edwin Ward Consulting",
    location: "Credit Restoration Services · USA",
    desc: "Edwin Ward helps individuals repair, rebuild, and take ownership of their credit profile — one of the most high-trust, high-stakes service categories in financial consulting. COAI built a credibility-forward site with a clear service breakdown, transparent process flow, and a lead intake funnel designed to convert skeptical clients.",
    built: ["Trust-First Layout","Lead Intake Form","Service Breakdown","Process Timeline","Schema Markup","Mobile Optimized"],
    url: "https://edwinwardconsulting.com",
    accent: "#6c63ff"
  },
  {
    id: "sig954", category: "contracting", industry: "General Contracting",
    client: "Signature 954",
    location: "Miami, FL · Area Code 954",
    desc: "Signature 954 is a Miami-area contracting company delivering premium construction and renovation work across South Florida's competitive trades market. COAI built a high-impact project showcase site with a portfolio-forward layout, service category pages, and a quote request funnel engineered for high-ticket residential and commercial contracts.",
    built: ["Project Showcase","Quote Request Funnel","Service Pages","Local SEO","Vercel Deploy","Fast Load Architecture"],
    url: "https://signature954.vercel.app",
    accent: "#10d98a"
  }
];

const FILTERS = [
  { id: "all", label: "All Work" },
  { id: "food", label: "Food & Beverage" },
  { id: "logistics", label: "Logistics" },
  { id: "events", label: "Events" },
  { id: "care", label: "Senior Living" },
  { id: "apparel", label: "Apparel" },
  { id: "photo", label: "Photography" },
  { id: "music", label: "Music" },
  { id: "finance", label: "Finance" },
  { id: "contracting", label: "Contracting" }
];

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  const [cat, setCat] = useState("all");
  const visible = cat === "all" ? CASES : CASES.filter(c => c.category === cat);

  return (
    <div>
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(108,99,255,0.05))" }}>
        <div className="container">
          <span className="section-eyebrow">Our Work</span>
          <h1 className="section-title">Sovereign builds.<br /><span className="text-green">Measurable outcomes.</span></h1>
          <p className="section-sub">
            Every project listed here is live, owned by the client, and built without rented-platform dependency.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "40px" }}>
          {FILTERS.map(f => (
            <button 
              key={f.id} 
              className={`btn-secondary btn-sm ${cat === f.id ? "active" : ""}`} 
              onClick={() => setCat(f.id)}
              style={cat === f.id ? { background: "var(--accent-blue)", color: "#fff", borderColor: "var(--accent-blue)" } : {}}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "32px" }}>
          {visible.map(c => (
            <article key={c.id} className="pkg-card" style={{ padding: "28px" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: c.accent }} />
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: ".7rem", color: c.accent, fontWeight: 700, marginBottom: "4px" }}>
                  <span style={{ fontSize: ".5rem" }}>●</span> LIVE
                </div>
                <div style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{c.industry}</div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: "4px 0" }}>{c.client}</h3>
                <div style={{ fontSize: ".8rem", color: "var(--text-muted2)" }}>{c.location}</div>
              </div>
              <p style={{ fontSize: ".88rem", color: "var(--text-soft)", lineHeight: 1.6, marginBottom: "20px", flex: 1 }}>{c.desc}</p>
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "10px" }}>What COAI Built</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {c.built.map(t => (
                    <span key={t} style={{ fontSize: ".7rem", padding: "4px 10px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", color: "var(--text-soft)" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                  View Live Site ↗
                </a>
                <a className="btn-secondary btn-sm" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
                  Get This Build
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "100px", textAlign: "center", padding: "60px 40px", background: "rgba(108,99,255,0.05)", borderRadius: "24px", border: "1px solid rgba(108,99,255,0.1)" }}>
          <h2 className="section-title">Your business could be next.</h2>
          <p className="section-sub" style={{ margin: "0 auto 24px" }}>Every build starts with a free diagnostic. No pressure, no pitch — just data.</p>
          <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>Run My Free Diagnostic →</a>
        </div>
      </div>
    </div>
  );
}
