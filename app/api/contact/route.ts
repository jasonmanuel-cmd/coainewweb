import { NextResponse } from "next/server";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { contactMarketingSchema } from "@/lib/validators/contact-marketing";

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim();
  return real || "unknown";
}

function isSameSiteRequest(request: Request): boolean {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!site) return true;
  let expected: string;
  try {
    expected = new URL(site).origin;
  } catch {
    return true;
  }
  const origin = request.headers.get("origin");
  if (origin) return origin === expected;
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).origin === expected;
    } catch {
      return false;
    }
  }
  return process.env.NODE_ENV !== "production";
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
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

    const fr = await fetch(FORMSPREE_ENDPOINT, {
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
