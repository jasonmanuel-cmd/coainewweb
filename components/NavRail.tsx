"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/website-design", label: "Website Design" },
  { href: "/pricing", label: "Pricing" },
  { href: "/intake", label: "Run My Growth Diagnostic" },
  { href: "/portfolio", label: "Case Studies" },
  { href: "/faq", label: "FAQ" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jax-coming-soon", label: "JAX Brief" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export function NavRail() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button className="nav-toggle btn btn-ghost" type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        Menu
      </button>
      <div className={`nav-drawer-backdrop ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <nav className={`nav-drawer ${open ? "open" : ""}`} aria-label="Mobile primary">
        {LINKS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <nav className="nav-rail" aria-label="Primary">
        {LINKS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
              {item.label}
            </Link>
          );
        })}
        <span className="nav-state mono">NODE: STABLE</span>
      </nav>
    </>
  );
}

