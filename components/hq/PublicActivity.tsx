"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ACTIVITY_PAGES } from "@/lib/crm/activity";
import { inquiryAttribution } from "@/lib/crm/attribution";
export function PublicActivity() {
  const path = usePathname();
  useEffect(() => {
    inquiryAttribution();
    if (!ACTIVITY_PAGES.includes(path as typeof ACTIVITY_PAGES[number]) || navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return;
    void fetch("/api/activity", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page: path }), credentials: "omit", referrerPolicy: "no-referrer", keepalive: true }).catch(() => {});
  }, [path]);
  return null;
}
