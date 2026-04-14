import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit/run-audit";
import { getMessagingProvider } from "@/lib/messaging/sms-service";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { createId } from "@/lib/utils/id";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { registerSchema } from "@/lib/validators/register";

function assertNoError(error: { message?: string } | null) {
  if (error) throw new Error(error.message || "Database operation failed.");
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip")) || "unknown";
    if (!(await takeRateLimitToken(`register:${ip}`, 8, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const body = await request.json();
    const parsed = registerSchema.parse(body);
    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }
    if (parsed.website) {
      return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
    }
    if (parsed.startedAt && Date.now() - parsed.startedAt < 1500) {
      return NextResponse.json({ error: "Submission too fast. Please retry." }, { status: 400 });
    }

    const id = createId("audit");
    const leadId = createId("lead");
    const audit = await runAudit(parsed.url);

    const supabase = getSupabaseAdmin();
    if (supabase) {
      const leadInsert = await supabase.from("leads").insert({
        id: leadId,
        name: parsed.businessName || null,
        email: parsed.email,
        phone: parsed.phone,
        company_name: parsed.companyName || null,
        url: parsed.url,
        source: "website",
        status: "new"
      });
      assertNoError(leadInsert.error);

      const auditInsert = await supabase.from("audits").insert({
        id,
        lead_id: leadId,
        url: parsed.url,
        performance_score: audit.performanceScore,
        schema_score: audit.schemaScore,
        issue_count: audit.issueCount,
        summary: audit.recommendations.join(" | ")
      });
      assertNoError(auditInsert.error);

      const resultInsert = await supabase.from("audit_results").insert({
        id: createId("result"),
        audit_id: id,
        raw_json: audit.raw,
        recommendations: audit.recommendations
      });
      assertNoError(resultInsert.error);
    }

    const provider = getMessagingProvider();
    const messageResult = await provider.sendSms({
      leadId,
      to: parsed.phone,
      body: `RedScreen ready for ${parsed.url}. ${audit.issueCount} code violations detected.`
    });
    if (supabase) {
      const messageInsert = await supabase.from("messages").insert({
        id: createId("msg"),
        lead_id: leadId,
        channel: "sms",
        provider: messageResult.provider,
        status: messageResult.status,
        payload: messageResult.payload
      });
      assertNoError(messageInsert.error);
    }

    return NextResponse.json({ id, ...audit });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Registration failed" },
      { status: 400 }
    );
  }
}
