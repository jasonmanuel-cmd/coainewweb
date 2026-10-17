"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
export function PublicOnly({ children }: { children: ReactNode }) {
  const path = usePathname();
  return path === "/hq" || path.startsWith("/hq/") ? null : children;
}
