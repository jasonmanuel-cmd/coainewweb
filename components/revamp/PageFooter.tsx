"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <Image src="/newlogo.png" alt="COAI" width={100} height={28} style={{ objectFit: 'contain', width: 'auto', height: '28px' }} />
            <span className="footer-wordmark">COAI<span>.</span></span>
          </div>
          <p className="footer-tagline">Sovereign websites, AI automation, and honest tech support for Bakersfield tradesmen and small businesses.</p>
          <address className="footer-address">
            1712 19th St #216<br />
            Bakersfield, CA 93301<br />
            <a href="tel:6616591376">(661) 659-1376</a><br />
            <a href="mailto:jasonm@coaibakersfield.com">jasonm@coaibakersfield.com</a>
          </address>
          <div style={{ marginTop: "12px" }}>
            <a href="https://leadshield.live" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream-dim)", fontSize: "13px", marginRight: "16px" }}>LeadShield</a>
            <a href="https://siteer.dev" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream-dim)", fontSize: "13px" }}>SiteER</a>
          </div>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Services</h4>
          <ul>
            <li><Link href="/website-design">Websites & AI</Link></li>
            <li><Link href="/pricing">Packages</Link></li>
            <li><a href="https://leadshield.live" target="_blank" rel="noopener noreferrer">LeadShield</a></li>
            <li><a href="https://siteer.dev" target="_blank" rel="noopener noreferrer">SiteER</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Company</h4>
          <ul>
            <li><Link href="/portfolio">Portfolio</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-col-title">Get Started</h4>
          <ul>
            <li><Link href="/intake">Free Audit</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "16px 0", borderTop: "1px solid var(--navy-border)" }}>
        <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer">
          <CalendarDays size={18} aria-hidden="true" />
          Book Your Free Audit - 20 Minutes, No Pressure
        </a>
      </div>
      <div className="footer-trust-row container">
        <span className="trust-badge" style={{ color: "var(--cream-dim)" }}>Local Bakersfield Business</span>
        <span className="trust-badge" style={{ color: "var(--cream-dim)" }}>Sovereign Infrastructure</span>
        <span className="trust-badge" style={{ color: "var(--cream-dim)" }}>No Platform Lock-In</span>
        <span className="trust-badge" style={{ color: "var(--cream-dim)" }}>You Own the Code</span>
      </div>
      <div className="footer-bottom container">
        <p>&copy; 2026 Chaotically Organized AI, LLC &middot; Bakersfield, CA</p>
        <p>Websites, AI, and tech support for the Kern County trades community.</p>
        <div className="footer-legal-links" style={{ marginTop: "12px", display: "flex", gap: "16px", justifyContent: "center", fontSize: "13px" }}>
          <Link href="/privacy" style={{ color: "var(--cream-dim)", textDecoration: "underline" }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: "var(--cream-dim)", textDecoration: "underline" }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
