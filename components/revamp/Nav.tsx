"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Menu, X } from "lucide-react";

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
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-tagline">
          <span className="topbar-dot" />
          <span>Based in Bakersfield · Serving businesses nationwide</span>
        </div>
        <div className="topbar-phone">
          <a href="tel:6616591376">(661) 659-1376</a>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => handleNav("home")}>
          <Image src="/logo.png" alt="COAI" width={120} height={30} style={{ objectFit: 'contain', width: 'auto', height: '30px' }} />
          <span className="nav-logo-text">COAI<span>.</span></span>
        </div>
        <ul className="nav-links">
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
        <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", fontSize: "13px" }}>
          <CalendarDays size={16} aria-hidden="true" />
          Book Audit
        </a>
        <a className="nav-cta" href="tel:6616591376">Call (661) 659-1376</a>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {links.map((l) => (
            l.href === "pricing" ? (
              <Link key={l.href} href="/pricing" onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} onClick={() => handleNav(l.href)}>
                {l.label}
              </a>
            )
          ))}
          <a className="nav-cta" onClick={() => handleNav("intake")} style={{ textAlign: "center" }}>
            Get a Free Digital Audit
          </a>
          <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer" style={{ textAlign: "center", justifyContent: "center", display: "flex" }}>
            <CalendarDays size={16} aria-hidden="true" />
            Book Free Audit
          </a>
        </div>
      )}
    </>
  );
}
