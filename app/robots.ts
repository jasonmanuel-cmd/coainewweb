import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/home", "/sentry-example-page", "/api/"];
  // Affirmatively allow the AI search/answer crawlers rather than relying on the wildcard.
  const aiAgents = [
    "GPTBot", "OAI-SearchBot", "ChatGPT-User",
    "ClaudeBot", "PerplexityBot", "Google-Extended"
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: "/", disallow }))
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
