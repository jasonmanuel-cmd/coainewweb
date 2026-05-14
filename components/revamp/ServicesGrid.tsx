"use client";

import React, { useState } from "react";

const SVC = [
  { name: "Sovereign Web Build", cat: "Build", price: "$1,200 – $1,500", freq: "One-time", pri: "High", isnew: 0, desc: "Custom HTML/JS site, schema-embedded for GEO/AEO. Hosted on Vercel/Netlify. You own the asset — no platform lock-in, no monthly Wix tax." },
  { name: "Landing Page Optima", cat: "Build", price: "$600 – $800", freq: "One-time", pri: "High", isnew: 0, desc: "High-conversion single-page campaign site. Schema-marked, GEO-optimized. Built for one job — getting the call." },
  { name: "Google Ads Landing Page", cat: "Build", price: "$800 – $1,000", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Dedicated PPC landing page with conversion tracking, call tracking number, and heat-map-ready structure. Sovereign build — no builder tax." },
  { name: "AI-Powered FAQ Page", cat: "Build", price: "$400", freq: "One-time", pri: "High", isnew: 1, desc: "20–30 question FAQ page targeting exact AI assistant query phrasing for local trades. Builds citation authority and AEO dominance." },
  { name: "LeadShield Setup", cat: "Build", price: "$497", freq: "One-time", pri: "High", isnew: 0, desc: "Missed-call text-back Android app, deployed and configured. Automated SMS follow-up so no lead goes dark — ever." },
  { name: "Appointment Booking Automation", cat: "Build", price: "$600 + $97/mo", freq: "Setup+MRR", pri: "High", isnew: 1, desc: "Online booking widget + automated SMS confirmation + 24hr reminder. Integrated with Google Calendar. Eliminates phone tag for service scheduling." },
  { name: "Automated Estimate Follow-Up", cat: "Build", price: "$500 + $97/mo", freq: "Setup+MRR", pri: "High", isnew: 1, desc: "After sending a quote, system auto-sends timed SMS/email sequences until the client responds. Built on Make.com + Supabase. Pure revenue recovery." },
  { name: "AI Receptionist (Cipher)", cat: "Build", price: "$997 + $197/mo", freq: "Setup+MRR", pri: "High", isnew: 0, desc: "AI voice receptionist with custom knowledge base. Answers calls, qualifies leads, and books appointments — 24/7." },
  { name: "AI Chatbot Embed", cat: "Build", price: "$600 + $97/mo", freq: "Setup+MRR", pri: "Immediate", isnew: 1, desc: "Trained chatbot embedded on your site. Answers FAQs, collects lead info, routes to SMS or email. Entry-level AI automation." },
  { name: "WhatsApp / SMS Business Inbox", cat: "Build", price: "$250 + $75/mo", freq: "Setup+MRR", pri: "High", isnew: 1, desc: "Unified business messaging inbox — texts and WhatsApp routed to one dashboard. Automated greeting + after-hours responder." },
  { name: "Supabase Database Build", cat: "Build", price: "$750 – $1,200", freq: "One-time", pri: "High", isnew: 0, desc: "Full relational database architecture, schema design, and deployment. Migrate from fragmented spreadsheets to a centralized backend." },
  { name: "CipherScan Audit", cat: "Repair", price: "$300", freq: "One-time", pri: "Immediate", isnew: 0, desc: "Deep-dive analysis of existing code, SEO bottlenecks, and AI visibility gaps. Full written report of what's broken and what it's costing you." },
  { name: "Schema / AEO Injection", cat: "Repair", price: "$500/site", freq: "One-time", pri: "High", isnew: 0, desc: "Retrofit an existing site with JSON-LD structured data. AI agents, Google, and voice search can actually read and cite your business." },
  { name: "GEO / AEO Optimization", cat: "Repair", price: "$400 – $600", freq: "One-time", pri: "High", isnew: 0, desc: "Generative Engine Optimization + Answer Engine Optimization — making your site the source AI models pull from on local queries." },
  { name: "Google Business Profile Overhaul", cat: "Repair", price: "$250", freq: "One-time", pri: "Immediate", isnew: 0, desc: "Full GBP audit and rebuild: categories, services, attributes, Q&A seeding, photo strategy, and NAP consistency sweep across all citations." },
  { name: "Website Speed & Core Web Vitals Fix", cat: "Repair", price: "$350", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Audit and repair of LCP, CLS, INP scores. Image compression, lazy loading, cache headers, CDN config. Before/after performance report included." },
  { name: "Citation / NAP Audit & Repair", cat: "Repair", price: "$400", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Sweep of 29+ directories — Yelp, BBB, Angi, HomeAdvisor, YP — for inconsistent name, address, phone. Fix what's tanking your local SEO." },
  { name: "Social Media Profile Optimization", cat: "Repair", price: "$200", freq: "One-time", pri: "Immediate", isnew: 1, desc: "One-time cleanup of Facebook, Instagram, and LinkedIn business profiles. Consistent branding, updated bios, correct contact info, CTA links aligned." },
  { name: "Lead Source Tracking Setup", cat: "Repair", price: "$300", freq: "One-time", pri: "High", isnew: 1, desc: "UTM architecture, call tracking per channel, and a dashboard showing which ads and pages generate actual calls." },
  { name: "Broken Form / Contact Flow Fix", cat: "Repair", price: "$150 – $300", freq: "One-time", pri: "High", isnew: 1, desc: "Diagnose and repair broken contact forms, dead email routing, missing confirmation messages, or spam-filtered submissions." },
  { name: "Website Migration", cat: "Repair", price: "$500 – $1,200", freq: "One-time", pri: "High", isnew: 1, desc: "Full migration off Wix, Squarespace, or GoDaddy onto sovereign infrastructure. Content transfer, redirect mapping, DNS cutover, zero downtime." },
  { name: "PC Diagnostic & Tune-Up", cat: "TechRepair", price: "$75 – $100", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Full system scan — CPU/RAM/storage health check, startup bottleneck analysis, driver updates, and a written diagnostic report." },
  { name: "Virus & Malware Removal", cat: "TechRepair", price: "$100 – $150", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Deep scan and removal of viruses, ransomware, adware, spyware, and browser hijackers. Full clean + post-removal hardening." },
  { name: "Windows OS Reinstall / Repair", cat: "TechRepair", price: "$100 – $175", freq: "One-time", pri: "High", isnew: 1, desc: "Clean Windows reinstall, repair of corrupted system files, or boot loop recovery. Data preserved where possible." },
  { name: "Slow Computer Overhaul", cat: "TechRepair", price: "$125", freq: "One-time", pri: "Immediate", isnew: 1, desc: "Bloatware removal, startup program audit, disk defrag/SSD optimization, RAM management tuning. Like new again." },
  { name: "RAM / SSD / HDD Upgrade", cat: "TechRepair", price: "$50 labor + parts", freq: "One-time", pri: "High", isnew: 1, desc: "Hardware upgrade installation — RAM expansion, SSD swap, or secondary drive add. Data migration from old drive included." },
  { name: "Data Recovery", cat: "TechRepair", price: "$100 – $300", freq: "One-time", pri: "High", isnew: 1, desc: "Recovery of deleted files, photos, documents from failed, formatted, or corrupted drives." },
  { name: "Data Backup System Setup", cat: "TechRepair", price: "$75 – $150", freq: "One-time", pri: "High", isnew: 1, desc: "Configure automated local + cloud backup so you never lose data again. One-time configuration, runs forever." },
  { name: "Password & Account Recovery", cat: "TechRepair", price: "$50 – $100", freq: "One-time", pri: "High", isnew: 1, desc: "Locked out of Windows, email, or social accounts? Recovery via official reset flows and account escalation." },
  { name: "Printer & Peripheral Setup", cat: "TechRepair", price: "$50 – $75", freq: "One-time", pri: "Medium", isnew: 1, desc: "Printer driver install, network printer configuration, scanner setup, or multi-device sync." },
  { name: "Software Install & Configuration", cat: "TechRepair", price: "$50 – $100", freq: "One-time", pri: "Medium", isnew: 1, desc: "Install and configure software — QuickBooks, Adobe Suite, Office, antivirus, or any business application." },
  { name: "Computer Setup (New or Used)", cat: "TechRepair", price: "$75 – $125", freq: "One-time", pri: "Medium", isnew: 1, desc: "Full setup of a new or refurbished machine — Windows activation, driver install, software configuration, email setup, and user training." },
  { name: "Remote Support Session", cat: "TechRepair", price: "$50/hr", freq: "Hourly", pri: "Immediate", isnew: 1, desc: "Screen-share remote help for computer issues, software problems, or tech confusion. No drive required." },
  { name: "The Ghost Protocol", cat: "Device", price: "$150/device", freq: "Per device", pri: "High", isnew: 0, desc: "Remote computer optimization: bloatware removal, ADB/Fastboot cleanup, OS hardening. Your machine running clean." },
  { name: "Mobile Unlock / Carrier Unlock", cat: "Device", price: "$75 – $125", freq: "Per device", pri: "High", isnew: 0, desc: "Carrier unlocking, firmware flashing, or secondary market prep. Android priority — Samsung ecosystem expertise." },
  { name: "FRP / Google Account Bypass", cat: "Device", price: "$75 – $100", freq: "Per device", pri: "High", isnew: 1, desc: "Factory Reset Protection bypass on Android devices. Legal use cases only." },
  { name: "Android Firmware Flash", cat: "Device", price: "$100 – $150", freq: "Per device", pri: "High", isnew: 1, desc: "Flash stock or custom firmware via ADB/Fastboot or Odin. Fix boot loops, recover bricked devices." },
  { name: "Phone / Tablet Setup & Transfer", cat: "Device", price: "$50 – $75", freq: "Per device", pri: "Medium", isnew: 1, desc: "New device setup with full data transfer from old phone — contacts, photos, apps, messages." },
  { name: "Device Trade-In Prep", cat: "Device", price: "$50", freq: "Per device", pri: "Medium", isnew: 1, desc: "Full wipe, factory reset, account removal, and secondary market value assessment." },
  { name: "Home / Office Network Setup", cat: "Network", price: "$100 – $200", freq: "One-time", pri: "High", isnew: 1, desc: "Router config, WiFi optimization, device connection, guest network setup, and dead-zone troubleshooting." },
  { name: "VPN Setup & Configuration", cat: "Network", price: "$75 – $125", freq: "One-time", pri: "High", isnew: 1, desc: "Install and configure a VPN on your router, PC, or mobile devices. Privacy-first configuration." },
  { name: "Network Security Audit", cat: "Network", price: "$200", freq: "One-time", pri: "High", isnew: 1, desc: "Scan your local network for exposed devices, weak passwords, open ports, and firmware vulnerabilities." },
  { name: "Security Hardening", cat: "Network", price: "$250", freq: "One-time", pri: "High", isnew: 0, desc: "2FA implementation across all accounts, credential audits, API key rotation, and encryption setup." },
  { name: "Smart Device / IoT Integration", cat: "Network", price: "$75 – $150", freq: "One-time", pri: "Medium", isnew: 1, desc: "Connect smart TVs, Ring cameras, Nest thermostats, or other IoT devices to your network — properly and securely." },
  { name: "Infrastructure Retainer", cat: "Recurring", price: "$197 – $500/mo", freq: "Monthly", pri: "High", isnew: 0, desc: "Ongoing hosting management, minor code tweaks, uptime monitoring, quarterly schema updates." },
  { name: "Managed Tech Support", cat: "Recurring", price: "$99 – $199/mo", freq: "Monthly", pri: "Immediate", isnew: 1, desc: "Monthly tech support plan for small businesses. Covers computer issues, device problems, and remote support — flat rate, no surprises." },
  { name: "AI Content Engine", cat: "Recurring", price: "$400/mo", freq: "Monthly", pri: "High", isnew: 0, desc: "Monthly optimized content: blog posts, GBP updates, FAQ schema, AEO content targeting local Kern County queries." },
  { name: "LeadShield Management", cat: "Recurring", price: "$150/mo", freq: "Monthly", pri: "High", isnew: 0, desc: "Monitoring automated SMS replies, CRM lead flow efficiency, and response rate reporting." },
  { name: "Full-Service Agency Retainer", cat: "Recurring", price: "$497 – $997/mo", freq: "Monthly", pri: "High", isnew: 0, desc: "Content + schema + GBP + code maintenance + lead system monitoring + monthly strategy call." },
  { name: "Review Generation System", cat: "Recurring", price: "$300 + $100/mo", freq: "Setup+MRR", pri: "Immediate", isnew: 1, desc: "Automated post-job SMS sends customers a Google review link triggered by job completion." },
  { name: "Reputation Monitoring", cat: "Recurring", price: "$150/mo", freq: "Monthly", pri: "Immediate", isnew: 1, desc: "Monthly monitoring of Google, Yelp, BBB, and Facebook reviews. Alert on new negatives + templated response drafts." },
  { name: "Monthly SEO Report", cat: "Recurring", price: "$150/mo", freq: "Monthly", pri: "High", isnew: 1, desc: "Branded monthly report: keyword rankings, GBP impressions, site traffic, lead source breakdown." },
  { name: "Digital Presence Audit", cat: "Strategy", price: "Free", freq: "Lead-gen", pri: "Immediate", isnew: 1, desc: "Free 20-minute screen-share. We pull site speed, schema, GBP score, NAP consistency, and AI visibility — written report delivered. No pitch." },
  { name: "Strategy Session (1-hr)", cat: "Strategy", price: "$200/hr", freq: "Hourly", pri: "High", isnew: 1, desc: "One focused hour: diagnose lead flow, ad waste, tech debt, or AI readiness. Walk away with a clear action plan." },
  { name: "AI Readiness Assessment", cat: "Strategy", price: "$350", freq: "One-time", pri: "High", isnew: 1, desc: "Structured evaluation of your operations vs. AI automation opportunity. Written report with 3 prioritized recommendations and ROI estimates." },
];

const CATS = [
  { key: "all", label: "All" },
  { key: "Build", label: "Web Builds" },
  { key: "Repair", label: "Digital Repair" },
  { key: "TechRepair", label: "Tech & PC Repair" },
  { key: "Device", label: "Device Services" },
  { key: "Network", label: "Network & Security" },
  { key: "Recurring", label: "Recurring" },
  { key: "Strategy", label: "Strategy" },
];

export function ServicesGrid() {
  const [activeCat, setActiveCat] = useState("all");

  const filtered = activeCat === "all"
    ? SVC
    : SVC.filter((s) => s.cat === activeCat);

  return (
    <div id="services">
      <div className="svc-header">
        <div className="container">
          <span className="section-eyebrow">Complete Menu</span>
          <h2 className="section-title">Every service <span className="text-amber">we offer.</span></h2>
          <p className="section-sub" style={{ margin: "0 auto 30px" }}>
            Filter by category. Prices listed are starting points — complex jobs quoted on scope.
          </p>
        </div>
      </div>

      <div className="legend">
        <div className="li"><span className="priority-dot pd-Immediate"></span>Immediate add</div>
        <div className="li"><span className="priority-dot pd-High"></span>Popular</div>
        <div className="li"><span className="priority-dot pd-Medium"></span>Standard</div>
      </div>

      <div className="filter-bar">
        <div className="filters">
          {CATS.map((c) => (
            <button
              key={c.key}
              className={`fb${activeCat === c.key ? " on" : ""}`}
              onClick={() => setActiveCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="svc-grid">
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 0", color: "var(--cream-dim)" }}>
            No services match this category.
          </div>
        ) : (
          filtered.map((s) => (
            <div key={s.name} className="svc-card">
              <div className="svc-card-top">
                <span className={`svc-cat svc-cat-${s.cat}`}>
                  {s.cat === "TechRepair" ? "Tech Repair" : s.cat === "Network" ? "Network & Security" : s.cat}
                </span>
                <span className={`priority-dot pd-${s.pri}`} title={`${s.pri} priority`} />
              </div>
              <div className="svc-name">{s.name}</div>
              <div className="svc-desc">{s.desc}</div>
              <div className="svc-bottom">
                <span className="svc-price">{s.price}</span>
                <span className="svc-freq">{s.freq}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA at bottom of grid */}
      <div className="container" style={{ textAlign: "center", paddingBottom: "80px" }}>
        <p style={{ color: "var(--cream-dim)", marginBottom: "20px", fontSize: "15px" }}>
          Don&apos;t see what you need? Call us — we probably do it.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a className="btn-primary" href="tel:6615694244" style={{ cursor: "pointer" }}>
            (661) 569-4244
          </a>
          <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer">
            📅 Book Free Audit
          </a>
        </div>
      </div>
    </div>
  );
}
