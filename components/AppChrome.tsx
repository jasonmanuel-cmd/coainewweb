"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { NavRail } from "@/components/NavRail";
import { CONTACT, GOOGLE_BUSINESS_PROFILE_URL, LEGAL_NAME } from "@/lib/site";

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div className="app-frame">
      <aside className="left-rail panel">
        <div className="left-rail-top">
          <Logo />
          <div className="left-divider" />
          <NavRail />
          <div className="left-rail-utility">
            <p className="mono">DIRECT LINE</p>
            <p className="muted">{CONTACT.phoneDisplay}</p>
            <p className="muted">{CONTACT.email}</p>
            <Link className="btn btn-primary" href="/intake">
              Run Diagnostic
            </Link>
          </div>
        </div>
      </aside>
      <div className="shell">
        {children}
        <footer className="panel footer-rail">
          <div className="footer-brand">
            <p>
              <strong>{LEGAL_NAME}</strong>
            </p>
            <p className="muted">
              {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
            </p>
            <p className="muted">
              {CONTACT.phoneDisplay} · {CONTACT.email}
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Case studies</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/intake">Diagnostic</Link>
            <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              Google Business
            </a>
          </nav>
          <p className="muted footer-meta">
            Last updated April 2026 · {LEGAL_NAME.split(",")[0]} | Bakersfield, CA · Where Chaos Meets Clarity
          </p>
        </footer>
      </div>
    </div>
  );
}
