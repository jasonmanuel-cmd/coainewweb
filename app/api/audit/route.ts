import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/run-audit";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip")) || "unknown";
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
