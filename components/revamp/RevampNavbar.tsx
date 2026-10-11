"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const MORE_LINKS = [
  ["Pricing", "/pricing", "One build. Clear ownership."],
  ["Portfolio", "/portfolio", "Revenue systems in the field."],
  ["About", "/about", "Built in Bakersfield."],
  ["FAQ", "/faq", "Straight answers."],
  ["JAX Preview", "/jax", "Pre-deployment brief."],
  ["AI Disclosure", "/ai-disclosure", "Controls and escalation."],
  ["Contact", "/contact", "Start a conversation."]
] as const;

const PRIMARY_LINKS = [
  ["Proof", "/#proof"],
  ["Systems", "/systems"],
  ["Services", "/services"]
] as const;

export function RevampNavbar() {
  const pathname = usePathname();
  const mobileId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const isActive = (href: string) => href !== "/" && pathname === href;

  return (
    <header className="revamp-header">
      <div className="revamp-header-scan" aria-hidden="true" />
      <nav className="revamp-nav" aria-label="Primary navigation">
        <Link className="revamp-logo" href="/" aria-label="Chaotically Organized AI — home">
          <Image className="revamp-logo-mark" src="/coai-mark.webp" alt="" width={46} height={46} priority />
          <span className="revamp-logo-copy">
            <strong>COAI</strong>
            <small>Revenue Infrastructure</small>
          </span>
        </Link>

        <button
          className={`revamp-menu-toggle${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-expanded={menuOpen}
          aria-controls={mobileId}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>

        <div className={`revamp-nav-links${menuOpen ? " is-open" : ""}`} id={mobileId}>
          {PRIMARY_LINKS.map(([label, href]) => (
            <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}

          <div className={`revamp-nav-more${moreOpen ? " is-open" : ""}`}>
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="revamp-more-menu"
              onClick={() => setMoreOpen((value) => !value)}
            >
              Explore <span aria-hidden="true">⌄</span>
            </button>
            <div className="revamp-nav-dropdown" id="revamp-more-menu">
              {MORE_LINKS.map(([label, href, detail]) => (
                <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined}>
                  <span>{label}</span>
                  <small>{detail}</small>
                </Link>
              ))}
            </div>
          </div>

          <Link className="revamp-nav-cta" href="/contact">
            <span>Book your build</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
