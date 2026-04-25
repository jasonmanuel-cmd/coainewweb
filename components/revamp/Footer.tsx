"use client";

import React from "react";
import Image from "next/image";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const cols = [
    { title: "Services", links: [["home","Website Systems"],["pricing","Packages"],["home","Web Design"],["intake","Consultation"]] },
    { title: "Company", links: [["portfolio","Portfolio"],["about","About"],["faq","FAQ"],["jax","JAX"]] },
    { title: "Start", links: [["intake","Run Diagnostic"],["pricing","Pricing"],["contact","Contact"]] }
  ];

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <div className="footer-logo-row">
            <Image src="/logo.png" alt="COAI" width={100} height={28} style={{ objectFit: 'contain', width: 'auto', height: '28px' }} />
            <span className="footer-wordmark">CHAOTICALLY ORGANIZED AI</span>
          </div>
          <p className="footer-tagline">Website growth systems for Bakersfield businesses. Where Chaos Meets Clarity.</p>
          <address className="footer-address">
            1712 19th St #216<br />
            Bakersfield, CA 93301<br />
            <a href="tel:+16616109198">(661) 610-9198</a><br />
            <a href="mailto:jason@coaibakersfield.com">jason@coaibakersfield.com</a>
          </address>
        </div>
        {cols.map((col) => (
          <div key={col.title} className="footer-col">
            <h4 className="footer-col-title">{col.title}</h4>
            <ul>
              {col.links.map(([href, label]) => (
                <li key={label}>
                  <a onClick={() => onNavigate(href)} style={{ cursor: "pointer" }}>
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
          © 2026 Chaotically Organized AI, LLC · <a>Privacy</a> · <a>Terms</a> · Last updated April 2026
        </p>
        <div className="footer-status">
          <span className="status-dot"></span>
          NODE: STABLE
        </div>
      </div>
    </footer>
  );
}
