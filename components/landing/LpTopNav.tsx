"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/lib/site";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/website-design", label: "Web Design" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Case Studies" },
  { href: "/faq", label: "FAQ" }
];

export function LpTopNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="lp-nav" aria-label="Primary">
        <Link href="/" className="lp-nav-logo" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={28} height={28} />
          <span className="lp-nav-logo-text">CHAOTICALLY ORGANIZED AI</span>
        </Link>
        <div className="lp-nav-status" aria-hidden="true">
          <span className="lp-status-dot" />
          NODE: STABLE
        </div>
        <ul className="lp-nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <a href={`tel:${CONTACT.phoneE164}`} className="lp-nav-phone">
          {CONTACT.phoneDisplay}
        </a>
        <Link className="lp-nav-cta" href="/intake">
          Run Diagnostic
        </Link>
        <button
          type="button"
          className="lp-hamburger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`lp-mobile-drawer ${open ? "open" : ""}`} id="lp-mobile-nav">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
        <Link href="/intake" className="lp-nav-cta" style={{ textAlign: "center" }} onClick={() => setOpen(false)}>
          Run Diagnostic
        </Link>
      </div>
    </>
  );
}
