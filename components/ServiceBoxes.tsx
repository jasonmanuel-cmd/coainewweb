"use client";

import React from "react";
import Link from "next/link";

export function ServiceBoxes() {
  return (
    <section className="service-boxes">
      <article id="service-coai" className="service-card card-coai">
        <h3>Chaotically Organized AI Bakersfield</h3>
        <p className="muted">Ground-up custom builds, websites, and AI marketing.</p>
        <ul>
          <li>Custom landing pages, SEO, content, and automation</li>
          <li>Local-first builds tailored to Kern County</li>
          <li className="price">Starting at <strong>$500</strong> for landing pages</li>
        </ul>
        <div className="card-actions">
          <a href="https://coaibakersfield.com/home" target="_blank" rel="noopener noreferrer" className="btn">Visit Bakersfield</a>
          <Link href="/website-design" className="btn btn-ghost">Learn More</Link>
        </div>
        <p className="hustle">Up-and-coming — we hustle to win your business.</p>
      </article>

      <article id="service-siteer" className="service-card card-siteer">
        <h3>siteER</h3>
        <p className="muted">Website diagnostics, scans, and prioritized fixes.</p>
        <ul>
          <li>60s site audit &amp; grade</li>
          <li>Monthly loss estimates and actionable treatment plan</li>
          <li>Pricing: Basic Audit $49, Pro Audit $199, Treatment plans from $500</li>
        </ul>
        <div className="card-actions">
          <a href="https://www.siteer.dev" target="_blank" rel="noopener noreferrer" className="btn">Run a Scan</a>
          <Link href="/pricing" className="btn btn-ghost">See Pricing</Link>
        </div>
        <p className="hustle">Fast turnaround — we&apos;ll fight to get your site healthy.</p>
      </article>

      <article id="service-leadshield" className="service-card card-leadshield">
        <h3>LeadShield</h3>
        <p className="muted">Missed-call recovery, automated texts, and lead scoring.</p>
        <ul>
          <li>Auto-text missed callers in seconds</li>
          <li>Tiers: Basic $29/mo, Pro $99/mo, Enterprise — contact us</li>
          <li>Integrations: phone, CRM, Zapier</li>
        </ul>
        <div className="card-actions">
          <a href="https://leadshield.live" target="_blank" rel="noopener noreferrer" className="btn">Open LeadShield</a>
          <a href="https://leadshield.live/app" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">App Store</a>
        </div>
        <p className="hustle">We fight for your leads — quick, measurable wins.</p>
      </article>

      <style>{`
        .service-boxes { display: flex; gap: 18px; margin: 28px auto; max-width: 1100px; padding: 0 20px; }
        .service-card { flex: 1; background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.04); padding: 18px; border-radius: 8px; color: #fff; }
        .service-card h3 { margin: 0 0 6px; font-size: 1.05rem; }
        .service-card .muted { margin: 0 0 10px; color: rgba(255,255,255,0.7); font-size: 0.9rem; }
        .service-card ul { margin: 8px 0 12px; padding-left: 1rem; color: rgba(255,255,255,0.85); }
        .service-card .price { margin-top: 8px; font-weight: 700; }
        .card-actions { display:flex; gap:10px; margin-top: 8px; }
        .btn { background: #00ff7a; color: #000; padding: 8px 12px; border-radius: 6px; text-decoration: none; font-weight:700; }
        .btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.06); color: #fff; padding: 8px 12px; border-radius: 6px; text-decoration: none; }
        .hustle { margin-top: 10px; color: rgba(255,255,255,0.65); font-size: 0.85rem; }

        @media (max-width: 880px) { .service-boxes { flex-direction: column; } }
      `}</style>
    </section>
  );
}
