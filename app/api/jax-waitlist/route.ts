import { NextResponse } from "next/server";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { jaxWaitlistSchema } from "@/lib/validators/contact-marketing";

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip")) || "unknown";
    if (!(await takeRateLimitToken(`jax:${ip}`, 10, 60_000))) {
      return NextResponse.json({ error: "Too many requests. Try again soon." }, { status: 429 });
    }

    const raw = await request.json();
    const parsed = jaxWaitlistSchema.parse(raw);
    if (!(await verifyTurnstileToken(parsed.turnstileToken, ip))) {
      return NextResponse.json({ error: "Human verification failed." }, { status: 400 });
    }

    const fr = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: parsed.email, form_type: "jax_waitlist" })
    });

    if (!fr.ok) {
      return NextResponse.json({ error: "Waitlist signup failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Waitlist request failed" },
      { status: 400 }
    );
  }
}
