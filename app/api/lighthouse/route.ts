import { NextRequest, NextResponse } from "next/server";

/** PageSpeed runs can exceed default serverless limits — allow up to 60s on supported Vercel plans. */
export const maxDuration = 60;
import { normalizeWebsiteUrl } from "@/lib/utils/normalize-website-url";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import {
  buildPsiQuery,
  categoryScoreToPercent,
  normalizePsiStrategy,
  type PsiStrategy
} from "@/lib/pagespeed-insights";

type PsiJson = {
  loadingExperience?: { overall_category?: string };
  lighthouseResult?: {
    lighthouseVersion?: string;
    fetchTime?: string;
    finalUrl?: string;
    categories?: {
      performance?: { score?: number | null };
      seo?: { score?: number | null };
      accessibility?: { score?: number | null };
      "best-practices"?: { score?: number | null };
    };
  };
  error?: { message?: string; status?: string };
};

function psiErrorMessage(data: PsiJson, fallback: string) {
  const msg = data.error?.message;
  return typeof msg === "string" && msg.length ? msg : fallback;
}

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = (forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip")) || "unknown";
  if (!(await takeRateLimitToken(`lighthouse:${ip}`, 30, 60_000))) {
    return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
  }

  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  const strategy: PsiStrategy = normalizePsiStrategy(req.nextUrl.searchParams.get("strategy"));

  let targetUrl: string;
  try {
    targetUrl = normalizeWebsiteUrl(raw);
  } catch {
    return NextResponse.json(
      { error: "That doesn't look like a valid website address. Try example.com or www.example.com." },
      { status: 400 }
    );
  }

  const apiKey = process.env.PAGESPEED_API_KEY;
  const params = buildPsiQuery({ url: targetUrl, strategy, apiKey });
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;

  try {
    const response = await fetch(apiUrl, { cache: "no-store" });
    const data = (await response.json()) as PsiJson;

    if (!response.ok) {
      const detail = psiErrorMessage(data, `PageSpeed returned ${response.status}`);
      return NextResponse.json({ error: detail }, { status: response.status >= 400 && response.status < 600 ? response.status : 502 });
    }

    if (!data.lighthouseResult) {
      const detail = psiErrorMessage(data, "Google could not run Lighthouse for that URL.");
      return NextResponse.json({ error: detail }, { status: 422 });
    }

    const lr = data.lighthouseResult;
    const cats = lr.categories;
    const crux = data.loadingExperience?.overall_category ?? null;

    return NextResponse.json({
      performance: categoryScoreToPercent(cats?.performance?.score),
      seo: categoryScoreToPercent(cats?.seo?.score),
      accessibility: categoryScoreToPercent(cats?.accessibility?.score),
      bestPractices: categoryScoreToPercent(cats?.["best-practices"]?.score),
      strategy,
      lighthouseVersion: lr.lighthouseVersion ?? null,
      fetchTime: lr.fetchTime ?? null,
      finalUrl: lr.finalUrl ?? null,
      /** Chrome UX Report bucket for this URL when Google has field data (FAST | AVERAGE | SLOW | NONE). */
      cruxOverall: crux
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lighthouse request failed" },
      { status: 500 }
    );
  }
}
