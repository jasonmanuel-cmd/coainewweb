import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_NAME } from "@/lib/site";

type LegalShellProps = {
  children: ReactNode;
};

export function LegalShell({ children }: LegalShellProps) {
  return (
    <div className="m-page m-legal-doc">
      <nav className="m-legal-topnav" aria-label="Legal document">
        <Link href="/" className="m-legal-logo">
          CHAOTICALLY ORGANIZED AI
        </Link>
        <Link href="/" className="m-legal-back">
          ← Return to Site
        </Link>
      </nav>
      {children}
      <footer className="m-legal-foot">
        <p>
          <Link href="/">Home</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/sms-terms">SMS terms</Link>
          <Link href="/ai-disclosure">AI disclosure</Link>
          <Link href="/contact">Contact</Link>
          <span className="m-legal-copy"> · © {new Date().getFullYear()} {LEGAL_NAME}</span>
        </p>
      </footer>
    </div>
  );
}
