"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/client";

export function PortfolioEventBeacon() {
  useEffect(() => {
    trackEvent("case_studies_view", { page: "portfolio" });
  }, []);

  return null;
}

