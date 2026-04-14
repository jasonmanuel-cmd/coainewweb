"use client";

import { useState } from "react";
import { TurnstileField } from "@/components/security/TurnstileField";

export function JaxWaitlistForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  async function joinWaitlist() {
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) {
      window.alert("Enter a valid email.");
      return;
    }
    if (siteKey && !turnstileToken) {
      setError("Complete the verification step.");
      return;
    }
    setError(null);
    setDisabled(true);
    try {
      const r = await fetch("/api/jax-waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: trimmed, turnstileToken })
      });
      if (!r.ok) {
        const j = (await r.json().catch(() => null)) as { error?: string } | null;
        setError(j?.error || "Could not join waitlist.");
        setDisabled(false);
        return;
      }
    } catch {
      setError("Network error. Try again.");
      setDisabled(false);
      return;
    }
    setDone(true);
    setEmail("");
    setTurnstileToken("");
  }

  return (
    <>
      <div className="m-jax-waitlist">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@business.com"
          aria-label="Email for JAX waitlist"
        />
        <button
          type="button"
          className="m-jax-waitlist-btn"
          onClick={joinWaitlist}
          disabled={disabled || (Boolean(siteKey) && !turnstileToken)}
        >
          Join Waitlist →
        </button>
      </div>
      <TurnstileField
        className="m-jax-waitlist-note"
        onToken={(t) => {
          setTurnstileToken(t);
          setError(null);
        }}
        onExpire={() => setTurnstileToken("")}
      />
      {error ? <p className="m-jax-waitlist-note" style={{ color: "var(--accent, #c45)" }}>{error}</p> : null}
      <p className="m-jax-waitlist-note">Early access · No spam · Launch notification only</p>
      {done ? (
        <div className="m-jax-success" role="status">
          ✓ REGISTERED — You&apos;re on the JAX early access list. We&apos;ll reach out before public launch.
        </div>
      ) : null}
    </>
  );
}
