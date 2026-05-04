import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/run-audit";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";

export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }
    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`audit:${ip}`, 12, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const { url } = (await request.json()) as { url: string };
    if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });
    const result = await runAudit(url);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Audit failed" },
      { status: 500 }
    );
  }
}
