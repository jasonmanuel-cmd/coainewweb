import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "@/components/revamp/Nav";
import { Footer } from "@/components/revamp/Footer";

export function PricingShell({ children }: { children: ReactNode }) {
  return (
    <div className="revamp-shell">
      <Nav />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className="breadcrumb-sep">/</span>
        <span>Pricing</span>
      </nav>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
