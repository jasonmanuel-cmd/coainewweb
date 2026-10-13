import { buildPsiQuery } from "@/lib/pagespeed-insights";
import { normalizeWebsiteUrl } from "@/lib/utils/normalize-website-url";
import { assertUrlSafeForServerFetch, fetchWithSafeRedirects } from "@/lib/utils/safe-fetch-url";

export type AuditResult = {
  performanceScore: number;
  schemaScore: number;
  issueCount: number;
  recommendations: string[];
  raw: Record<string, unknown>;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

type PageSpeedInsightsResponse = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } };
  };
};

export async function runAudit(url: string): Promise<AuditResult> {
  let targetUrl: string;
  try {
    targetUrl = normalizeWebsiteUrl(url);
  } catch {
    targetUrl = "";
  }
  if (!targetUrl) {
    return {
      performanceScore: 0,
      schemaScore: 0,
      issueCount: 1,
      recommendations: ["Invalid website URL."],
      raw: { auditError: "Invalid URL" }
    };
  }
  // Reject private/loopback targets before doing any work, so the caller gets a clear 400
  // instead of an audit that quietly reports the site as having no schema.
  assertUrlSafeForServerFetch(targetUrl);
  const psiBase = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const key = process.env.PAGESPEED_API_KEY;
  const query = buildPsiQuery({ url: targetUrl, strategy: "mobile", apiKey: key });
  let data: PageSpeedInsightsResponse = {};
  let perf = 0;
  let auditError: string | null = null;

  try {
    const response = await fetch(`${psiBase}?${query.toString()}`, { cache: "no-store" });
    if (!response.ok) {
      // Google's error body can name the project and quota; it stays in server logs only.
      console.error("[audit] PageSpeed request failed", response.status, (await response.text()).slice(0, 180));
      auditError = `PageSpeed data was unavailable (HTTP ${response.status}).`;
    } else {
      data = (await response.json()) as PageSpeedInsightsResponse;
      perf = Number(data?.lighthouseResult?.categories?.performance?.score ?? 0) * 100;
    }
  } catch (error) {
    console.error("[audit] PageSpeed request error", error instanceof Error ? error.message : "unknown");
    auditError = "PageSpeed data was unavailable.";
  }

  let html = "";
  try {
    const htmlRes = await fetchWithSafeRedirects(targetUrl, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    if (htmlRes.ok) html = await htmlRes.text();
  } catch {
    html = "";
  }

  const hasJsonLd = /application\/ld\+json/i.test(html);
  const hasCanonical = /rel=["']canonical["']/i.test(html);
  const hasMetaDescription = /name=["']description["']/i.test(html);
  const hasServiceSchema = /ProfessionalService|LocalBusiness|Organization/.test(html);

  const schemaSignals = [hasJsonLd, hasCanonical, hasMetaDescription, hasServiceSchema];
  const schemaScore = (schemaSignals.filter(Boolean).length / schemaSignals.length) * 100;
  const issues = [
    auditError && `Performance API issue: ${auditError}`,
    !hasJsonLd && "Missing JSON-LD schema layer.",
    !hasServiceSchema && "No ProfessionalService/LocalBusiness entity found.",
    !hasCanonical && "Missing canonical tag.",
    !hasMetaDescription && "Missing meta description.",
    perf < 90 && "Performance below 90."
  ].filter(Boolean) as string[];

  return {
    performanceScore: clampScore(perf),
    schemaScore: clampScore(schemaScore),
    issueCount: issues.length,
    recommendations: issues.length ? issues : ["No critical violations detected."],
    raw: { ...data, targetUrl, auditError }
  };
}
