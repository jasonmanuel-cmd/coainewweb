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

function normalizeUrl(input: string): string {
  try {
    return new URL(input).toString();
  } catch {
    return new URL(`https://${input}`).toString();
  }
}

type PageSpeedInsightsResponse = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number } };
  };
};

export async function runAudit(url: string): Promise<AuditResult> {
  const targetUrl = normalizeUrl(url);
  const psiBase = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
  const key = process.env.PAGESPEED_API_KEY;
  const query = new URLSearchParams({ url: targetUrl, strategy: "mobile" });
  if (key) query.set("key", key);
  let data: PageSpeedInsightsResponse = {};
  let perf = 0;
  let auditError: string | null = null;

  try {
    const response = await fetch(`${psiBase}?${query.toString()}`, { cache: "no-store" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`PageSpeed request failed (${response.status}): ${text.slice(0, 180)}`);
    }
    data = (await response.json()) as PageSpeedInsightsResponse;
    perf = Number(data?.lighthouseResult?.categories?.performance?.score ?? 0) * 100;
  } catch (error) {
    auditError = error instanceof Error ? error.message : "Unknown PageSpeed error";
  }

  let html = "";
  try {
    const htmlRes = await fetch(targetUrl, { cache: "no-store" });
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
