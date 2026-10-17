import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-errors";
import { FORMSPREE_INTAKE } from "@/lib/forms";
import { deliverForm } from "@/lib/form-delivery";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { intakeSubmissionSchema } from "@/lib/validators/intake";

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

    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (key === "turnstileToken" || key === "company") continue;
      if (value !== undefined && value !== null && value !== "") {
        fields[key] = String(value);
      }
    }

    fields._subject = `${parsed.package_interest === "2" ? "COAI build inquiry" : "COAI leak-score request"}: ${parsed.business_name}`;
    await deliverForm(FORMSPREE_INTAKE, fields);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiErrorResponse(error, { route: "intake", fallback: "We couldn't submit your request right now. Please try again or call us." });
  }
}
