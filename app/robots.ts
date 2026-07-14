import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/home", "/sentry-example-page", "/api/"];
  // Affirmatively allow the AI search/answer crawlers rather than relying on the wildcard.
  const aiAgents = [
    "Amazonbot", "Applebot-Extended", "Bingbot", "Bytespider",
    "CCBot", "ClaudeBot", "FacebookExternalHit", "Google-Extended",
    "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot"
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...aiAgents.map((userAgent) => ({ userAgent, allow: "/", disallow }))
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
