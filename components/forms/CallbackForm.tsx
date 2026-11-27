"use client";

import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { TurnstileField } from "@/components/security/TurnstileField";
import { trackEvent } from "@/lib/analytics/client";
import { inquiryAttribution } from "@/lib/crm/attribution";
import { finishSubmission, submissionIdentity } from "@/lib/forms/submission-identity";
import { BUSINESS_HOURS_LABEL, CONTACT } from "@/lib/site";
import "./callback-form.css";

/** Two-field "call me back" request: the shortest path from a visitor to Jason's phone. */
export function CallbackForm({ headingId = "callback-title" }: { headingId?: string }) {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError(null);
    if (siteKey && !turnstileToken) {
      setError("Complete the verification step.");
      return;
    }
    const form = event.currentTarget;
    const entries = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setSubmitting(true);
    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...entries, submission_id: submissionIdentity("callback"), attribution: inquiryAttribution(), turnstileToken }),
        signal: AbortSignal.timeout(25_000)
      });
      if (response.ok) {
        finishSubmission("callback");
        trackEvent("callback_submit", {});
        setDone(true);
        form.reset();
        setTurnstileToken("");
        return;
      }
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      trackEvent("callback_error", { status: response.status });
      setError(body?.error || `Something went wrong. Please call ${CONTACT.phoneDisplay} instead.`);
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
    } catch {
      trackEvent("callback_error", { status: 0 });
      setError(`Network error. Please call ${CONTACT.phoneDisplay} instead.`);
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="cb-wrap">
        <p role="status" className="cb-success">
          ✓ Request received. Jason returns calls during published business hours ({BUSINESS_HOURS_LABEL}).
        </p>
      </div>
    );
  }

  return (
    <div className="cb-wrap">
      <form className="cb-form" onSubmit={onSubmit} aria-labelledby={headingId} data-clarity-mask="True">
        <div className="cb-trap" aria-hidden="true">
          <label htmlFor="cb-reference">Leave this field blank</label>
          <input id="cb-reference" name="contact_reference" type="text" tabIndex={-1} autoComplete="off" data-lpignore="true" data-1p-ignore="true" />
        </div>
        <div className="cb-row">
          <div className="cb-field">
            <label htmlFor="cb-name">Name</label>
            <input id="cb-name" name="first_name" placeholder="Your name" required autoComplete="given-name" />
          </div>
          <div className="cb-field">
            <label htmlFor="cb-phone">Phone</label>
            <input id="cb-phone" name="phone" type="tel" placeholder="(661) 000-0000" required autoComplete="tel" />
          </div>
          <button type="submit" className="cb-submit" disabled={submitting}>
            <Phone aria-hidden="true" /> {submitting ? "Sending…" : "Call me back"}
          </button>
        </div>
        <TurnstileField key={verificationAttempt} className="cb-verify" onToken={setTurnstileToken} onExpire={() => setTurnstileToken("")} />
        {error ? <p ref={errorRef} tabIndex={-1} role="alert" className="cb-error">{error}</p> : null}
        <p className="cb-note">We use your number only to return this call. No sales list, no texts.</p>
      </form>
    </div>
  );
}
