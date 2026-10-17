import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Real content-change dates. Previously every URL claimed `new Date()` at build
 * time, so every page looked modified on every deploy — which devalues the
 * signal. Update the entry when the page's content actually changes.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-10-17",
  "/demo": "2026-10-17",
  "/pricing": "2026-10-17",
  "/faq": "2026-10-10",
  "/services": "2026-10-10",
  "/systems": "2026-10-10",
  "/portfolio": "2026-10-10",
  "/about": "2026-10-10",
  "/contact": "2026-10-10",
  "/intake": "2026-10-17",
  "/privacy": "2026-10-10",
  "/cookies": "2026-10-10",
  "/sms-terms": "2026-10-10",
  "/ai-disclosure": "2026-10-10"
};

const DEFAULT_MODIFIED = "2026-10-10";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const tier1 = new Set([
    "/",
    "/services",
    "/systems",
    "/website-design",
    "/website-design/kern-county",
    "/contact",
    "/intake"
  ]);

  return [
    "/",
    "/demo",
    "/services",
    "/systems",
    "/website-design",
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
