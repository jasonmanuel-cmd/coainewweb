import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/run-audit";

export async function POST(request: Request) {
  try {
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
