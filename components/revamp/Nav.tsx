"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Nav({ activePage, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: "home", label: "Services" },
    { href: "pricing", label: "Pricing" },
    { href: "portfolio", label: "Portfolio" },
    { href: "about", label: "About" },
    { href: "faq", label: "FAQ" },
    { href: "contact", label: "Contact" },
  ];

  const handleNav = (href: string) => {
    onNavigate(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top bar — hidden on mobile for max hero visibility */}
      <div className="topbar">
        <div className="topbar-tagline">
          <span className="topbar-dot" />
          <span>Based in Bakersfield · Serving businesses nationwide</span>
        </div>
        <div className="topbar-phone">
          <a href="tel:6616591376">(661) 659-1376</a>
        </div>
      </div>

      {/* Nav bar — SIMPLIFIED for conversion focus */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => handleNav("home")}>
          <Image src="/logo.png" alt="COAI" width={120} height={30} style={{ objectFit: 'contain', width: 'auto', height: '30px' }} />
          <span className="nav-logo-text">COAI<span>.</span></span>
        </div>
        {/* Hidden navigation links — remove decision paralysis */}
        <ul className="nav-links" style={{ display: "none" }}>
          {links.map((l) => (
            <li key={l.href}>
              {l.href === "pricing" ? (
                <Link href="/pricing" className={activePage === l.href ? "active" : ""}>
                  {l.label}
                </Link>
              ) : (
                <a
                  className={activePage === l.href ? "active" : ""}
                  onClick={() => handleNav(l.href)}
                >
                  {l.label}
                </a>
              )}
            </li>
          ))}
          <li><a href="https://leadshield.live" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>LeadShield</a></li>
          <li><a href="https://coaibuilds.com" target="_blank" rel="noopener noreferrer">COAIBuilds</a></li>
          <li><a href="https://siteer.dev" target="_blank" rel="noopener noreferrer" style={{ color: "var(--danger)" }}>SiteER</a></li>
        </ul>
        
        {/* Minimalist right section — only phone number */}
        <a className="nav-phone-link" href="tel:6616591376" style={{ marginLeft: "auto", fontSize: "14px", fontWeight: 600, color: "var(--amber)", textDecoration: "none" }}>
          (661) 659-1376
        </a>
        
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile drawer — simplified for warm traffic */}
      {menuOpen && (
        <div className="mobile-drawer">
          <a onClick={() => { handleNav("intake"); setMenuOpen(false); }} style={{ fontSize: "16px", fontWeight: 600, padding: "16px", textAlign: "center", borderBottom: "1px solid var(--navy-border)" }}>
            Get Free Audit
          </a>
          <a href="tel:6616591376" style={{ fontSize: "16px", fontWeight: 600, padding: "16px", textAlign: "center", color: "var(--amber)" }}>
            Call (661) 659-1376
          </a>
        </div>
      )}
    </>
  );
}
