"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

type RevampPageNavProps = {
  activeHref?: string;
};

export function RevampPageNav({ activeHref }: RevampPageNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="topbar-tagline">
          <span className="topbar-dot" />
          <span>Based in Bakersfield · Serving businesses nationwide</span>
        </div>
        <div className="topbar-phone">
          <a href="tel:6616591376">(661) 659-1376</a>
        </div>
      </div>

      <nav className="nav">
        <Link href="/" className="nav-logo">
          <Image src="/newlogo.png" alt="COAI" width={120} height={30} style={{ objectFit: 'contain', width: 'auto', height: '30px' }} />
          <span className="nav-logo-text">COAI<span>.</span></span>
        </Link>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={activeHref === l.href ? "active" : ""}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", background: "var(--teal)", color: "#fff", borderRadius: "8px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
          <CalendarDays size={16} aria-hidden="true" />
          Book Audit
        </a>
        <a className="nav-cta" href="tel:6616591376" style={{ marginLeft: "8px" }}>Call (661) 659-1376</a>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-drawer">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a className="nav-cta" href="tel:6616591376" onClick={() => setMenuOpen(false)} style={{ textAlign: "center" }}>
            Call (661) 659-1376
          </a>
          <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{ textAlign: "center", justifyContent: "center", display: "flex", alignItems: "center", gap: "6px", background: "var(--teal)", color: "#fff", borderRadius: "8px", fontWeight: 600, textDecoration: "none", padding: "10px 22px" }}>
            <CalendarDays size={16} aria-hidden="true" />
            Book Free Audit
          </a>
        </div>
      )}
    </>
  );
}
