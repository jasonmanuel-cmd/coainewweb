import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
 return ["/","/intake","/about","/privacy","/terms","/cookies","/sms-terms","/ai-disclosure"].map(path => ({url: SITE_URL+path, changeFrequency: "monthly" as const, priority: path==="/"?1:0.7}));
}
