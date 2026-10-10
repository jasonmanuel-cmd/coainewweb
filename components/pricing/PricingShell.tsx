import Link from "next/link";
import type { ReactNode } from "react";

export function PricingShell({ children }: { children: ReactNode }) {
  return (
    <main id="main-content" className="revamp-shell m-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span className="breadcrumb-sep">/</span><span>Pricing</span>
      </nav>
      {children}
    </main>
  );
}
