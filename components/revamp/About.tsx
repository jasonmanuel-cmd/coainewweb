"use client";

import React from "react";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/lib/site";

const STORY = [
  {
    year: "The Contractor Years",
    title: "Licensed, Bonded, and in the Field",
    text: "Before building a single website, Manuel was a licensed building contractor in Florida running multi-trade residential projects. He coordinated plumbing, electrical, HVAC, and framing crews. He owned the P&L. He knew what it felt like when the phone didn't ring — and what it felt like when the phone rang and he couldn't answer because he was on a roof.",
  },
  {
    year: "The Problem I Kept Seeing",
    title: "Good Trades, Bad Digital",
    text: "After moving to Bakersfield, Manuel watched local contractors and service businesses getting crushed by the same problems he saw in construction: slow websites they didn't own, unanswered calls going straight to voicemail, Google Maps listings that might as well be invisible. The monthly Wix/GoDaddy tax was just the cherry on top.",
  },
  {
    year: "The Fix",
    title: "Own Your Infrastructure. Answer Every Call.",
    text: "Manuel started COAI to build one thing: a complete digital system for trades that costs less than a monthly truck payment, transfers full ownership at launch, and texts every missed caller back in under 30 seconds. No rented platforms. No locked-in SaaS. Just infrastructure that works because it has to.",
  },
];

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "100px 0 60px", background: "linear-gradient(180deg, rgba(3,3,6,0), rgba(232,160,32,0.05))" }}>
        <div className="container">
          <span className="section-eyebrow">The Operator Behind the System</span>
          <h1 className="section-title">Who built COAI? <span className="text-amber">A contractor who codes.</span></h1>
          <p className="section-sub">
            Jason Manuel is the founder of COAI Bakersfield. He spent 9 years as a licensed building contractor before writing his first line of code. He builds TradeCall Systems for local trades because he knows exactly what it&apos;s like to lose a job to an unanswered phone call.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: 100 }}>

        {/* Story + Photo side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px", alignItems: "start" }}>

          {/* Photo Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="pkg-card" style={{ padding: 0, overflow: "hidden", textAlign: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "340px", background: "linear-gradient(135deg, #0B1426, #0a0a0a)" }}>
                <Image
                  src="/jason.png"
                  alt="Jason Manuel — Founder of COAI, former licensed building contractor"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover", objectPosition: "center top", opacity: 0.95 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(0deg, #0a0a0a, transparent)" }} />
              </div>
              <div style={{ padding: "28px 32px 32px" }}>
                <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Jason Manuel</h2>
                <div style={{ fontSize: ".8rem", color: "var(--accent)", fontWeight: 700, marginBottom: "16px", fontFamily: "var(--font-mono)", letterSpacing: "1px" }}>
                  FOUNDER · FORMER LICENSED CONTRACTOR
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                  {[
                    ["Location", "Bakersfield, CA · 661"],
                    ["Background", "9 Yrs Licensed Contractor"],
                    ["Direct Line", CONTACT.phoneDisplay],
                    ["Email", "jasonm@coaibakersfield.com"],
                  ].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "var(--text-muted2)" }}>{l}</span>
                      <span style={{ color: "var(--text-soft)", fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href={`tel:${CONTACT.phoneE164}`} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    <Phone size={16} aria-hidden="true" /> Call Jason Directly
                  </a>
                  <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}>
                    Book Free Job Call Audit <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pkg-card" style={{ padding: "24px", borderColor: "rgba(232,160,32,0.2)", background: "rgba(232,160,32,0.04)" }}>
              <p style={{ fontSize: ".9rem", fontWeight: 700, color: "#fff", lineHeight: 1.5, marginBottom: "8px" }}>
                &ldquo;If I wouldn&apos;t buy it as a contractor, I won&apos;t sell it as a developer.&rdquo;
              </p>
              <p style={{ fontSize: ".8rem", color: "var(--text-muted)", fontStyle: "italic", margin: 0 }}>
                — Jason Manuel
              </p>
            </div>
          </div>

          {/* Story */}
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {STORY.map(s => (
              <div key={s.year}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent)", marginBottom: "8px", letterSpacing: "1px" }}>{s.year}</div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "12px" }}>{s.title}</h3>
                <p style={{ fontSize: ".95rem", color: "var(--text-soft)", lineHeight: 1.75 }}>{s.text}</p>
              </div>
            ))}

            <div className="pkg-card" style={{ padding: "28px", borderColor: "rgba(232,160,32,0.15)", background: "rgba(232,160,32,0.03)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--accent)", marginBottom: "10px", letterSpacing: "1px" }}>THE PRINCIPLE</div>
              <p style={{ fontSize: ".9rem", color: "var(--text-soft)", lineHeight: 1.75 }}>
                COAI refuses to build systems that trap clients on rented platforms. Every build transfers full ownership. No monthly Wix tax. No locked-in SaaS. You own the code, the domain, the content — everything. If you want to leave tomorrow, you can.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pkg-card" style={{ padding: "60px", textAlign: "center", borderColor: "rgba(232,160,32,0.2)", background: "rgba(232,160,32,0.03)", marginTop: "80px" }}>
          <span className="section-eyebrow" style={{ justifyContent: "center", display: "block" }}>Ready to Fix the Leaks?</span>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginBottom: "16px" }}>Let&apos;s find out what&apos;s<br /><span className="text-amber">costing you job calls.</span></h2>
          <p style={{ fontSize: ".95rem", color: "var(--text-soft)", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.7 }}>
            Free 20-minute Job Call Audit. We check your site, Google profile, schema, and missed-call flow — and hand you a written report. No pitch, no pressure, just the truth.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>Book My Free Audit <ArrowRight size={16} aria-hidden="true" /></a>
            <a href={`tel:${CONTACT.phoneE164}`} className="btn-secondary">{CONTACT.phoneDisplay}</a>
          </div>
        </div>

      </div>
    </div>
  );
}
