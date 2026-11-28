import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Real content-change dates. Previously every URL claimed `new Date()` at build
 * time, so every page looked modified on every deploy — which devalues the
 * signal. Update the entry when the page's content actually changes.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-11-27",
  "/diagnostic": "2026-11-27",
  "/revenue-engine": "2026-11-27",
  "/infrastructure": "2026-11-27",
  "/industries": "2026-11-27",
  "/case-studies": "2026-11-27",
  "/start": "2026-11-27",
  "/demo": "2026-10-28",
  "/pricing": "2026-11-27",
  "/faq": "2026-11-27",
  "/services": "2026-11-27",
  "/website-design/bakersfield": "2026-11-27",
  "/website-design/delano": "2026-11-27",
  "/website-design/shafter": "2026-11-27",
  "/portfolio": "2026-10-21",
  "/about": "2026-10-17",
  "/contact": "2026-11-12",
  "/intake": "2026-11-12",
  "/privacy": "2026-10-17",
  "/cookies": "2026-10-10",
  "/sms-terms": "2026-10-10",
  "/ai-disclosure": "2026-10-10"
};

const DEFAULT_MODIFIED = "2026-10-10";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const tier1 = new Set([
    "/",
    "/diagnostic",
    "/revenue-engine",
    "/infrastructure",
    "/industries",
    "/case-studies",
    "/start",
    "/services",
    "/website-design/kern-county",
    "/contact",
    "/intake"
  ]);

  return [
    "/",
    "/diagnostic",
    "/revenue-engine",
    "/infrastructure",
    "/industries",
    "/case-studies",
    "/start",
    "/demo",
    "/services",
    "/website-design/kern-county",
    "/website-design/bakersfield",
    "/website-design/delano",
    "/website-design/shafter",
    "/pricing",
    "/portfolio",
    "/faq",
    "/about",
    "/contact",
    "/intake",
    "/privacy",
    "/cookies",
    "/terms",
    "/sms-terms",
    "/ai-disclosure"
  ].map((path) => {
    const priority = tier1.has(path) ? 1 : 0.8;
    return {
      url: `${base}${path}`,
      lastModified: LAST_MODIFIED[path] ?? DEFAULT_MODIFIED,
      changeFrequency: "weekly" as const,
      priority
    };
  });
}
