import { NextResponse } from "next/server";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
import { getMessagingProvider } from "@/lib/messaging/sms-service";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { intakeSubmissionSchema } from "@/lib/validators/intake";

function toSmsPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }

    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`intake:${ip}`, 10, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = intakeSubmissionSchema.parse(raw);

    if (parsed.company.trim()) {
      // Honeypot filled: silently accept to avoid teaching bots.
      return NextResponse.json({ ok: true });
    }

    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    const fd = new FormData();
    for (const [key, value] of Object.entries(parsed)) {
      if (key === "turnstileToken" || key === "company") continue;
      if (value !== undefined && value !== null && value !== "") {
        fd.set(key, String(value));
      }
    }

    const fr = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    });

    if (!fr.ok) {
      return NextResponse.json({ error: "Form delivery failed." }, { status: 502 });
    }

    const smsTo = toSmsPhone(parsed.phone);
    if (smsTo) {
      const provider = getMessagingProvider();
      const message = `Got it${parsed.first_name ? `, ${parsed.first_name}` : ""} — Jason from COAI will follow up within 2 hours. Questions? Reply here or call (661) 610-9198.`;
      void provider
        .sendSms({
          to: smsTo,
          leadId: parsed.intake_session_id || `intake-${Date.now()}`,
          body: message
        })
        .catch(() => {
          // Non-blocking by design: form submission should still succeed.
        });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Intake request failed" },
      { status: 400 }
    );
  }
}
