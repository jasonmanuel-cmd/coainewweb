"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { Nav } from "@/components/revamp/Nav";
import { Footer } from "@/components/revamp/Footer";

export function PricingShell({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    if (page === "pricing") return;
    if (page === "home" || page === "services") {
      router.push("/");
    } else if (["portfolio", "about", "faq", "contact", "intake"].includes(page)) {
      router.push(`/${page}`);
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="revamp-shell">
        <Nav activePage="pricing" onNavigate={handleNavigate} />
        <nav className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span>Pricing</span>
        </nav>
        <main>{children}</main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </>
  );
}
