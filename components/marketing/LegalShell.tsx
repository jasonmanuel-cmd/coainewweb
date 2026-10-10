import type { ReactNode } from "react";

export function LegalShell({ children }: { children: ReactNode }) {
  return <main id="main-content" className="m-page m-legal-doc">{children}</main>;
}
