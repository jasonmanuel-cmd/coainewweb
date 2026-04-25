"use client";

import React, { useState } from "react";
import Image from "next/image";

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
    { href: "jax", label: "JAX" },
  ];

  const handleNav = (href: string) => {
    onNavigate(href);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track">
          <span>JAX SENTINEL TECHNICAL BRIEF NOW AVAILABLE</span>
          <span>NODE: STABLE · BAKERSFIELD 661 · SOVEREIGN STACK v1.0</span>
          <span>WHERE CHAOS MEETS CLARITY · RUN YOUR FREE DIAGNOSTIC TODAY</span>
          <span>JAX SENTINEL TECHNICAL BRIEF NOW AVAILABLE</span>
          <span>NODE: STABLE · BAKERSFIELD 661 · SOVEREIGN STACK v1.0</span>
          <span>WHERE CHAOS MEETS CLARITY · RUN YOUR FREE DIAGNOSTIC TODAY</span>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => handleNav("home")} style={{ cursor: "pointer" }}>
          <Image src="/logo.png" alt="COAI" width={120} height={30} style={{ objectFit: 'contain', width: 'auto', height: '30px' }} />
          <span className="nav-logo-text">CHAOTICALLY ORGANIZED AI</span>
        </div>
        <div className="nav-status">
          <span className="status-dot"></span>
          NODE: STABLE
        </div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a
                className={activePage === l.href ? "active" : ""}
                onClick={() => handleNav(l.href)}
                style={{ cursor: "pointer" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="nav-cta" onClick={() => handleNav("intake")}>
          Run Diagnostic
        </a>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          {links.map((l) => (
            <a key={l.href} onClick={() => handleNav(l.href)} style={{ cursor: "pointer" }}>
              {l.label}
            </a>
          ))}
          <a href="tel:+16616109198">(661) 610-9198</a>
          <a className="nav-cta" onClick={() => handleNav("intake")} style={{ textAlign: "center" }}>
            Run Diagnostic
          </a>
        </div>
      )}
    </>
  );
}
