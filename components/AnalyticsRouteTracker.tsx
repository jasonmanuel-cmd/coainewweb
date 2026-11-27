"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GOOGLE_TAG_ID } from "@/lib/site";

export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const measurementId = GOOGLE_TAG_ID;
    if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") return;
    const query = search?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag("config", measurementId, { page_path: pagePath });
  }, [pathname, search]);

  return null;
}

