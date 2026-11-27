import { NextResponse } from "next/server";
import { apiErrorResponse } from "@/lib/api-errors";
import { FORMSPREE_CONTACT } from "@/lib/forms";
import { deliverCapturedForm } from "@/lib/crm/notifications";
import { sanitizeAttribution } from "@/lib/crm/attribution";
import { captureCrmLead } from "@/lib/crm/capture";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { callbackSchema } from "@/lib/validators/callback";

/** Same guards as /api/contact: JSON only, same-site, rate limit, honeypots, CAPTCHA, store before deliver. */
export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }
    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`callback:${ip}`, 5, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = callbackSchema.parse(raw);
    if (process.env.COAI_IDEMPOTENT_DELIVERY_ENABLED === "true" && !parsed.submission_id) {
      return NextResponse.json({ error: "Refresh this page before submitting your request." }, { status: 400 });
    }
    if (parsed.company.trim() || parsed.contact_reference.trim()) {
      console.warn("[callback] Form rejected by spam check");
      return NextResponse.json({ error: "We couldn't submit this form. Refresh the page, enter your details manually, and try again." }, { status: 400 });
    }
    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    // Stored as a contact lead with no email; the placeholder business name marks it as a callback.
    const fields: Record<string, string> = {
      form_type: "callback",
      first_name: parsed.first_name,
      phone: parsed.phone,
      business_name: "Callback request",
      email: "",
      ...(parsed.submission_id ? { submission_id: parsed.submission_id } : {}),
      ...sanitizeAttribution(raw.attribution)
    };
    fields._subject = "COAI callback request";
    const submissionKey = await captureCrmLead("contact", fields);
    delete fields.submission_id;
    await deliverCapturedForm(FORMSPREE_CONTACT, fields, submissionKey);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiErrorResponse(error, { route: "callback", fallback: "We couldn't send your request right now. Please call us instead." });
  }
}
