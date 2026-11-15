import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-errors";
import { FORMSPREE_CONTACT } from "@/lib/forms";
import { captureCrmLead } from "@/lib/crm/capture";
import { deliverCapturedForm } from "@/lib/crm/notifications";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { jaxWaitlistSchema } from "@/lib/validators/contact-marketing";

export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }
    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`jax:${ip}`, 10, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = jaxWaitlistSchema.parse(raw);
    if (process.env.COAI_IDEMPOTENT_DELIVERY_ENABLED === "true" && !parsed.submission_id) {
      return NextResponse.json({ error: "Please refresh the page before submitting your inquiry." }, { status: 400 });
    }
    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    const submissionKey = await captureCrmLead("waitlist", { email: parsed.email, sms_consent: "no", submission_id: parsed.submission_id ?? "" });
    await deliverCapturedForm(FORMSPREE_CONTACT, { email: parsed.email, form_type: "jax_waitlist" }, submissionKey);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiErrorResponse(error, { route: "jax-waitlist", fallback: "We couldn't add you to the waitlist right now. Please try again." });
  }
}
