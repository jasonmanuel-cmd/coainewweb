import { isBuildInterest } from "@/lib/pricing";
import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-errors";
import { FORMSPREE_INTAKE } from "@/lib/forms";
import { deliverCapturedForm } from "@/lib/crm/notifications";
import { sanitizeAttribution } from "@/lib/crm/attribution";
import { captureCrmLead } from "@/lib/crm/capture";
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
    if (process.env.COAI_IDEMPOTENT_DELIVERY_ENABLED === "true" && !parsed.submission_id) {
      return NextResponse.json({ error: "Refresh this page before submitting your inquiry." }, { status: 400 });
    }

    if (parsed.company.trim() || parsed.contact_reference.trim()) {
      console.warn("[intake] Form rejected by spam check");
      return NextResponse.json({ error: "We couldn't submit this form. Refresh the page, enter your details manually, and try again." }, { status: 400 });
    }

    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    const fields: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (key === "turnstileToken" || key === "company" || key === "contact_reference") continue;
      if (value !== undefined && value !== null && value !== "") {
        fields[key] = String(value);
      }
    }

    fields._subject = `${isBuildInterest(parsed.package_interest) ? "COAI build inquiry" : "COAI leak-score request"}: ${parsed.business_name}`;
    Object.assign(fields, sanitizeAttribution(raw.attribution));
    const submissionKey = await captureCrmLead("intake", fields);
    delete fields.submission_id;
    await deliverCapturedForm(FORMSPREE_INTAKE, fields, submissionKey);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiErrorResponse(error, { route: "intake", fallback: "We couldn't submit your request right now. Please try again or call us." });
  }
}
