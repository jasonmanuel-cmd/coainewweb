import { NextResponse } from "next/server";
import { getMessagingProvider } from "@/lib/messaging/sms-service";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";

const MAX_BODY = 640;
const E164 = /^\+[1-9]\d{6,14}$/;

export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }
    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`messages:${ip}`, 20, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }
    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const payload = (await request.json()) as {
      to: string;
      body: string;
      leadId: string;
      turnstileToken?: string;
    };
    if (!payload?.to || !payload?.body || typeof payload.leadId !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (!(await verifyTurnstileToken(payload.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }
    if (!E164.test(payload.to.trim())) {
      return NextResponse.json({ error: "Invalid destination" }, { status: 400 });
    }
    if (payload.body.length > MAX_BODY || payload.leadId.length > 120) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const provider = getMessagingProvider();
    const result = await provider.sendSms({
      ...payload,
      to: payload.to.trim()
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Message dispatch failed" },
      { status: 500 }
    );
  }
}
