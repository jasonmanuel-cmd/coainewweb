import { NextResponse } from "next/server";
import { FORMSPREE_CONTACT } from "@/lib/forms";
import { getClientIp, hasJsonContentType, isSameSiteRequest } from "@/lib/security/request-guards";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { contactMarketingSchema } from "@/lib/validators/contact-marketing";

export async function POST(request: Request) {
  try {
    if (!hasJsonContentType(request)) {
      return NextResponse.json({ error: "Unsupported content type." }, { status: 415 });
    }

    if (!isSameSiteRequest(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const ip = getClientIp(request);
    if (!(await takeRateLimitToken(`contact:${ip}`, 10, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = contactMarketingSchema.parse(raw);
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

    const fr = await fetch(FORMSPREE_CONTACT, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" }
    });

    if (!fr.ok) {
      return NextResponse.json({ error: "Form delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Contact request failed" },
      { status: 400 }
    );
  }
}
