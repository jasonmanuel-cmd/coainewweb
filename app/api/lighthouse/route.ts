import { NextRequest, NextResponse } from "next/server";
import { normalizeWebsiteUrl } from "@/lib/utils/normalize-website-url";

type PsiJson = {
  lighthouseResult?: {
    categories?: {
      performance?: { score?: number };
      seo?: { score?: number };
      accessibility?: { score?: number };
      "best-practices"?: { score?: number };
    };
  };
  error?: { message?: string; status?: string };
};

function psiErrorMessage(data: PsiJson, fallback: string) {
  const msg = data.error?.message;
  return typeof msg === "string" && msg.length ? msg : fallback;
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

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
  const params = new URLSearchParams({ url: targetUrl, strategy: "mobile" });
  if (apiKey) params.set("key", apiKey);

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

    const cats = data.lighthouseResult.categories;
    return NextResponse.json({
      performance: Math.round((cats?.performance?.score ?? 0) * 100),
      seo: Math.round((cats?.seo?.score ?? 0) * 100),
      accessibility: Math.round((cats?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((cats?.["best-practices"]?.score ?? 0) * 100)
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lighthouse request failed" },
      { status: 500 }
    );
  }
}
