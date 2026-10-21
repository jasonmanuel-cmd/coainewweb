"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { RevampFooter } from "@/components/revamp/RevampFooter";
import { RevampNavbar } from "@/components/revamp/RevampNavbar";

/** Root-level shared chrome: exactly one navigation and footer on every public route. */
export function AppChrome({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path === "/hq" || path.startsWith("/hq/")) return <>{children}</>;
  return (
    <>
      <RevampNavbar />
      {children}
      <RevampFooter />
    </>
  );
}
