import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chaoticallyorganizedai.com";
  return [
    "/",
    "/pricing",
    "/intake",
    "/portfolio",
    "/dashboard",
    "/jax-coming-soon",
    "/website-design",
    "/services",
    "/case-studies",
    "/register",
    "/contact",
    "/faq",
    "/about",
    "/privacy",
    "/terms"
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.8
  }));
}
