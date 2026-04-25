"use client";

import React from "react";
import Image from "next/image";

const VALUES = [
  {
    code: "01 · Integrity",
    title: "No Bullshit Architecture",
    text: "Every recommendation is made because it serves the client's business, not because it generates a higher invoice. If it passes Team Good, it ships."
  },
  {
    code: "02 · Ownership",
    title: "Sovereign By Default",
    text: "Every build transfers full ownership to the client. The code, the hosting, the data — all of it belongs to you. No rented funnels. No locked-in SaaS."
  },
  {
    code: "03 · Precision",
    title: "72-Hour Ship Rule",
    text: "If an idea can't be reduced to a shippable, testable version within 72 hours, it's too complex. Scope discipline over beautiful half-finished things."
  },
  {
    code: "04 · Revenue",
    title: "Revenue-or-Kill Test",
    text: "Every active project is evaluated monthly: is it generating revenue, or on a credible 30-day path to it? If no to both, it gets cut. No zombie projects."
  }
];

const STORY = [
  {
    year: "The Foundation",
    title: "15+ Years in Real Operations",
    text: "Before building websites, Jason spent over 15 years in event production, construction, retail, and logistics. Systems that failed cost real money — so they had to work."
  },
  {
    year: "The Problem",
    title: "Bakersfield Was Bleeding Revenue",
    text: "The average local service business in the 661 is 5–10 years behind on digital infrastructure. Slow sites. Unanswered calls. No schema. No after-hours capture. Jason saw it everywhere and built the fix."
  },
  {
    year: "The Thesis",
    title: "Everything is Real Estate",
    text: "Every digital asset — a website, a GBP, a schema block, a CRM entry — is treated as property with equity and maintenance costs. You don't invest in décor on a leaky foundation."
  },
  {
    year: "The Company",
    title: "Chaotically Organized AI, LLC",
    text: "COAI is the first legitimate AI-powered infrastructure builder with deep local roots in Kern County. Not a marketing agency. An infrastructure operation. Built to capture the 661 market and scale outward."
  }
];

const STACK = [
  { label: "Web Framework", value: "Next.js 15 · Sovereign HTML" },
  { label: "AI Stack", value: "GPT-4o · Claude · Gemini · Llama 3.2" },
  { label: "Automation", value: "Make.com · Vapi · Twilio A2P" },
  { label: "Database", value: "Supabase · Airtable" },
  { label: "Deployment", value: "Vercel · Railway · Netlify" },
  { label: "Local AI", value: "Ollama + CrewAI on Resistance Core" }
];

const METRICS = [
  { value: "7+", label: "Sovereign Builds Live" },
  { value: "65+", label: "Bakersfield Prospects Audited" },
  { value: "$5K", label: "Largest Single Engagement" },
  { value: "100", label: "Lighthouse Score Baseline" }
];

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(16,217,138,0.05))" }}>
        <div className="container">
          <span className="section-eyebrow">The Operator Behind the System</span>
          <h1 className="section-title">Built by someone who&apos;s<br /><span className="text-green">actually been in the field.</span></h1>
          <p className="section-sub">
            Not a developer who discovered marketing. Not a marketer who learned to code. An operations veteran who built systems because he had to — and got tired of watching Bakersfield businesses bleed revenue from broken digital infrastructure.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>

        {/* Founder Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "start" }}>

          {/* Photo + Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="pkg-card" style={{ padding: 0, overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "340px", background: "linear-gradient(135deg, #0d1f17, #0a0a0a)" }}>
                <Image
                  src="/jason.png"
                  alt="Jason Manuel — Founder of Chaotically Organized AI"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.95 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(0deg, #0a0a0a, transparent)" }} />
              </div>
              <div style={{ padding: "28px 32px 32px" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Jason Manuel</h2>
                <div style={{ fontSize: ".8rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "20px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
                  FOUNDER & CEO · CHAOTICALLY ORGANIZED AI
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                  {[
                    ["Location", "Bakersfield, CA · 661"],
                    ["Experience", "15+ Years in Operations"],
                    ["Email", "jason@coaibakersfield.com"],
                    ["Direct Line", "(661) 610-9198"],
                    ["Focus", "661 Market & Beyond"],
                    ["Philosophy", "Everything is Real Estate"]
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "var(--text-muted2)" }}>{l}</span>
                      <span style={{ color: "var(--text-soft)", fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href="tel:+16616109198" className="btn-green" style={{ width: "100%", justifyContent: "center" }}>
                    Call Jason Directly
                  </a>
                  <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}>
                    Run My Diagnostic →
                  </a>
                </div>
              </div>
            </div>

            {/* Tagline card */}
            <div className="pkg-card" style={{ padding: "24px", borderColor: "rgba(16,217,138,0.2)", background: "rgba(16,217,138,0.04)" }}>
              <div style={{ fontSize: ".7rem", fontFamily: "var(--font-mono)", color: "var(--accent-green)", marginBottom: "10px", letterSpacing: "1px" }}>PRIMARY TAGLINE</div>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", lineHeight: 1.5, marginBottom: "12px" }}>
                &ldquo;We build digital infrastructure for local businesses. Not marketing. Infrastructure.&rdquo;
              </p>
              <p style={{ fontSize: ".8rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                &ldquo;Organized Chaos. Automated Revenue.&rdquo;
              </p>
            </div>
          </div>

          {/* Story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {STORY.map(s => (
              <div key={s.year}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent-green)", marginBottom: "8px", letterSpacing: "1px" }}>{s.year}</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: ".95rem", color: "var(--text-soft)", lineHeight: 1.75 }}>{s.text}</p>
              </div>
            ))}

            {/* Anti-Dependency */}
            <div className="pkg-card" style={{ padding: "28px", borderColor: "rgba(16,217,138,0.15)", background: "rgba(16,217,138,0.03)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent-green)", marginBottom: "10px", letterSpacing: "1px" }}>THE ANTI-DEPENDENCY THESIS</div>
              <p style={{ fontSize: ".9rem", color: "var(--text-soft)", lineHeight: 1.75 }}>
                COAI refuses to build systems that trap clients on platforms COAI controls. The goal is client-owned infrastructure. No rented funnels, no locked-in SaaS subscriptions as a single point of failure. Everything is built so the client could hand the keys to someone else tomorrow.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px", margin: "80px 0" }}>
          {METRICS.map(m => (
            <div key={m.label} className="pkg-card" style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "var(--accent-green)", marginBottom: "8px" }}>{m.value}</div>
              <div style={{ fontSize: ".75rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* The Tripod System */}
        <div style={{ marginBottom: "80px" }}>
          <span className="section-eyebrow">Operating Model</span>
          <h2 className="section-title">The <span className="text-green">Tripod System.</span></h2>
          <p className="section-sub">Three roles. All active. No burnout from trying to be everything at once.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginTop: "40px" }}>
            {[
              { role: "The Dreamer", name: "Jason Manuel", icon: "◈", desc: "Vision, brand direction, client relationships, market strategy, and final creative decisions. The human at the center." },
              { role: "The Oracle", name: "Aion / Gemini", icon: "◉", desc: "Pattern recognition, research synthesis, strategic analysis, scenario modeling, and long-horizon thinking." },
              { role: "The Engineer", name: "Claude", icon: "⬡", desc: "Execution, code writing, system architecture, dev handoff, documentation, and build specs. Never asked to dream." }
            ].map(t => (
              <div key={t.role} className="pkg-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: "2rem", color: "var(--accent-green)", marginBottom: "12px" }}>{t.icon}</div>
                <div style={{ fontSize: ".7rem", fontFamily: "var(--font-mono)", color: "var(--text-muted2)", marginBottom: "4px" }}>{t.role}</div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{t.name}</h3>
                <p style={{ fontSize: ".83rem", color: "var(--text-soft)", lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: "80px" }}>
          <span className="section-eyebrow">Infrastructure Stack</span>
          <h2 className="section-title">What we build <span className="text-green">with.</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginTop: "40px" }}>
            {STACK.map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
                <span style={{ fontSize: ".8rem", color: "var(--text-muted2)", fontFamily: "var(--font-mono)" }}>{s.label}</span>
                <span style={{ fontSize: ".8rem", color: "var(--text-soft)", fontWeight: 600, textAlign: "right" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: "80px" }}>
          <span className="section-eyebrow">Operating Values</span>
          <h2 className="section-title">The <span className="text-green">Team Good Protocol.</span></h2>
          <p className="section-sub">Before shipping anything — a message, a product, a piece of code — run it through Team Good: Is this good for the client? The business? The brand? All three must pass.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginTop: "40px" }}>
            {VALUES.map(v => (
              <div key={v.code} className="pkg-card" style={{ padding: "28px" }}>
                <div style={{ fontSize: ".7rem", fontWeight: 800, color: "var(--accent-green)", marginBottom: "10px", fontFamily: "var(--font-mono)" }}>{v.code}</div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{v.title}</h3>
                <p style={{ fontSize: ".85rem", color: "var(--text-soft)", lineHeight: 1.65 }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pkg-card" style={{ padding: "60px", textAlign: "center", borderColor: "rgba(16,217,138,0.2)", background: "rgba(16,217,138,0.03)" }}>
          <span className="section-eyebrow" style={{ justifyContent: "center", display: "block" }}>Ready to Fix the Leaks?</span>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>Your infrastructure is your<br /><span className="text-green">most valuable asset.</span></h2>
          <p style={{ fontSize: ".95rem", color: "var(--text-soft)", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            Jason runs a free diagnostic on your current digital stack and tells you exactly what&apos;s costing you leads. No pitch deck. Just data. — Jason Manuel | Chaotically Organized AI | 661
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>Run My Free Diagnostic →</a>
            <a href="tel:+16616109198" className="btn-secondary">Call (661) 610-9198</a>
          </div>
        </div>

      </div>
    </div>
  );
}
