"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CONTACT } from "@/lib/site";

const MORE_LINKS = [
  ["About", "/about", "Meet the founder."],
  ["FAQ", "/faq", "Straight answers."],
  ["Customer work", "/case-studies", "Documented projects."],
  ["Industries", "/industries", "Service businesses."],
  ["Contact", "/contact", "Start a conversation."]
] as const;

const PRIMARY_LINKS = [
  ["Diagnostic", "/diagnostic"],
  ["Revenue Engine", "/revenue-engine"],
  ["Infrastructure", "/infrastructure"]
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
        <Link className="revamp-logo" href="/" aria-label="COAI — home">
          <Image className="revamp-logo-mark" src="/coai-mark.webp" alt="" width={46} height={46} priority />
          <span className="revamp-logo-copy">
            <strong>COAI</strong>
            <small>Intelligent Business Infrastructure</small>
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
              <button
                type="button"
                onClick={() => {
                  (window as unknown as { openCipherChat?: () => void }).openCipherChat?.();
                  setMenuOpen(false);
                  setMoreOpen(false);
                }}
              >
                <span>Chat with Cipher</span>
                <small>Ask the AI assistant.</small>
              </button>
            </div>
          </div>

          <a className="revamp-nav-call" href={`tel:${CONTACT.phoneE164}`} aria-label={`Call ${CONTACT.phoneDisplay}`}>
            <Phone aria-hidden="true" />
            <span>Call<span className="revamp-nav-call-number"> {CONTACT.phoneDisplay}</span></span>
          </a>

          <Link className="revamp-nav-cta" href="/start?intent=diagnostic">
            <span>Start Your Diagnostic</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
