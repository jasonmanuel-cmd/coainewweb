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
          <span>Bakersfield, CA · Serving local trades &amp; small businesses</span>
        </div>
        <div className="topbar-phone">
          <a href="tel:6615694244">(661) 569-4244</a>
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
              <a
                className={activePage === l.href ? "active" : ""}
                onClick={() => handleNav(l.href)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="nav-cta" href="tel:6615694244">Call (661) 569-4244</a>
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
            <a key={l.href} onClick={() => handleNav(l.href)}>
              {l.label}
            </a>
          ))}
          <a className="nav-cta" onClick={() => handleNav("intake")} style={{ textAlign: "center" }}>
            Get a Free Digital Audit
          </a>
        </div>
      )}
    </>
  );
}
