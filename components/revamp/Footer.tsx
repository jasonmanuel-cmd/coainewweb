"use client";

import React from "react";
import Image from "next/image";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const cols = [
    { title: "Services", links: [["home", "Websites & AI"], ["pricing", "Packages"], ["home", "LeadShield"], ["home", "SiteER"]] },
    { title: "Company", links: [["portfolio", "Portfolio"], ["about", "About"], ["faq", "FAQ"], ["contact", "Contact"]] },
    { title: "Get Started", links: [["intake", "Free Audit"], ["pricing", "Pricing"], ["contact", "Contact"]] }
  ];

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <Image src="/logo.png" alt="COAI" width={100} height={28} style={{ objectFit: 'contain', width: 'auto', height: '28px' }} />
            <span className="footer-wordmark">COAI<span>.</span></span>
          </div>
          <p className="footer-tagline">Sovereign websites, AI automation, and honest tech support for Bakersfield tradesmen and small businesses.</p>
          <address className="footer-address">
            1712 19th St #216<br />
            Bakersfield, CA 93301<br />
            <a href="tel:6615694244">(661) 569-4244</a><br />
            <a href="mailto:jason@coaibakersfield.com">jason@coaibakersfield.com</a>
          </address>
          <div style={{ marginTop: "12px" }}>
            <a href="https://leadshield.live" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream-dim)", fontSize: "13px", marginRight: "16px" }}>LeadShield</a>
            <a href="https://siteer.dev" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cream-dim)", fontSize: "13px" }}>SiteER</a>
          </div>
        </div>
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h4 className="footer-col-title">{col.title}</h4>
            <ul>
              {col.links.map(([href, label]) => (
                <li key={label}>
                  <a onClick={() => onNavigate(href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom container">
        <p>
          &copy; 2026 Chaotically Organized AI, LLC &middot; Bakersfield, CA
        </p>
        <p>
          Websites, AI, and tech support for the Kern County trades community.
        </p>
      </div>
    </footer>
  );
}
