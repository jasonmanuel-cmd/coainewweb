import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

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
  const tier3 = new Set(["/privacy", "/terms", "/intake/confirmation"]);

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
    "/intake/confirmation",
    "/jax",
    "/privacy",
    "/terms"
  ].map((path) => {
    const priority = tier1.has(path) ? 1 : tier3.has(path) ? 0.5 : 0.8;
    const changeFrequency = tier3.has(path) ? "monthly" : "weekly";
    return {
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority
    };
  });
}
