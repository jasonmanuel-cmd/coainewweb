import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Real content-change dates. Previously every URL claimed `new Date()` at build
 * time, so every page looked modified on every deploy — which devalues the
 * signal. Update the entry when the page's content actually changes.
 */
const LAST_MODIFIED: Record<string, string> = {
  "/": "2026-08-02",
  "/pricing": "2026-08-02",
  "/faq": "2026-08-02",
  "/services": "2026-08-02",
  "/contact": "2026-08-02",
  "/intake": "2026-08-02",
  "/sms-terms": "2026-08-02",
  "/ai-disclosure": "2026-08-02"
};

const DEFAULT_MODIFIED = "2026-07-14";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL;
  const tier1 = new Set([
    "/",
    "/services",
    "/website-design",
    "/website-design/kern-county",
    "/contact",
    "/intake"
  ]);

  return [
    "/",
    "/services",
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
