"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CONTACT } from "@/lib/site";
import "./chrome.css";

/** Real routes. No client-side page swapping — every link is crawlable. */
export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
] as const;

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="site-nav">
        <Link className="site-nav__brand" href="/">
          <Image
            src="/newlogo.png"
            alt="COAI"
            width={120}
            height={30}
            priority
            style={{ objectFit: "contain", width: "auto", height: "30px" }}
          />
          <span className="site-nav__wordmark">Chaotically Organized AI</span>
        </Link>

        <ul className="site-nav__links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <a className="site-nav__phone" href={`tel:${CONTACT.phoneE164}`}>
          {CONTACT.phoneDisplay}
        </a>

        <button
          className="site-nav__toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <div className={menuOpen ? "site-nav__drawer site-nav__drawer--open" : "site-nav__drawer"}>
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/intake" onClick={() => setMenuOpen(false)}>
          Get my leak score
        </Link>
        <a href={`tel:${CONTACT.phoneE164}`}>Call {CONTACT.phoneDisplay}</a>
      </div>
    </>
  );
}
