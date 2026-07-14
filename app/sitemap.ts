import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const BUILD_DATE = new Date().toISOString().split("T")[0];

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
    "/terms"
  ].map((path) => {
    const priority = tier1.has(path) ? 1 : 0.8;
    return {
      url: `${base}${path}`,
      lastModified: BUILD_DATE,
      changeFrequency: "weekly" as const,
      priority
    };
  });
}
