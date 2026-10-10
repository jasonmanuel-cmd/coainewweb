import type { ReactNode } from "react";
import { RevampFooter } from "@/components/revamp/RevampFooter";
import { RevampNavbar } from "@/components/revamp/RevampNavbar";

/** Root-level shared chrome: exactly one navigation and footer on every public route. */
export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <RevampNavbar />
      {children}
      <RevampFooter />
    </>
  );
}
