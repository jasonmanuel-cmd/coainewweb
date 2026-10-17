"use client";

import { useEffect, useState } from "react";
import { SmsConsentField } from "@/components/forms/SmsConsentField";
import { TurnstileField } from "@/components/security/TurnstileField";
import { CONTACT } from "@/lib/site";

export type ContactMarketingFormProps = {
  /** `1` | `2` | `3` — preselects package interest from pricing or deep links */
  initialPackage?: string;
  /** e.g. `diagnostic`, `pricing` */
  inboundSource?: string;
  /** e.g. `packages`, `jason` */
  contactIntent?: string;
};

const PKG_VALUES: Record<string, string> = {
  "1": "pkg1",
  "2": "pkg2",
  "3": "pkg3"
};

export function ContactMarketingForm({
  initialPackage,
  inboundSource,
  contactIntent
}: ContactMarketingFormProps) {
  const [done, setDone] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [verificationAttempt, setVerificationAttempt] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [pkgHidden, setPkgHidden] = useState("");
  useEffect(() => {
    const v = initialPackage && PKG_VALUES[initialPackage] ? PKG_VALUES[initialPackage] : "";
    setPkgHidden(v);
  }, [initialPackage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setFormError(null);
    const form = e.currentTarget;
    if (siteKey && !turnstileToken) {
      setFormError("Complete the verification step.");
      return;
    }

    const subjectBits = ["COAI website contact"];
    if (inboundSource) subjectBits.push(`from:${inboundSource}`);
    if (contactIntent) subjectBits.push(`intent:${contactIntent}`);

    const fd = new FormData(form);
    const entries = Object.fromEntries(fd.entries()) as Record<string, string>;
    setSubmitting(true);
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...entries,
          turnstileToken,
          _subject: subjectBits.join(" · ")
        }),
        signal: AbortSignal.timeout(25_000)
      });
      if (r.ok) {
        setDone(true);
        form.reset();
        setTurnstileToken("");
        return;
      }
      const errJson = (await r.json().catch(() => null)) as { error?: string } | null;
      setFormError(errJson?.error || "Something went wrong. Try again or call us.");
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
    } catch {
      setFormError("Network error. Try again or call us.");
      setTurnstileToken("");
      setVerificationAttempt((attempt) => attempt + 1);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="m-contact-success">
        <p role="status">✓ MESSAGE RECEIVED — Jason reviews inquiries during published business hours.</p>
      </div>
    );
  }

  const subjectBits = ["COAI website contact"];
  if (inboundSource) subjectBits.push(`from:${inboundSource}`);
  if (contactIntent) subjectBits.push(`intent:${contactIntent}`);

  return (
    <div className="m-contact-form-wrap" id="contact-form">
      <h2 className="m-contact-form-title">Send a Message</h2>
      <p className="m-contact-form-sub">
        Submissions go to <strong>{CONTACT.email}</strong> via our form handler. Jason reviews inquiries during published business hours. If
        it&apos;s urgent, call directly — {CONTACT.phoneDisplay}.
      </p>
      <form id="contact-form-fields" onSubmit={handleSubmit}>
        <input type="hidden" name="form_type" value="contact" />
        <input type="hidden" name="inbound_source" value={inboundSource ?? ""} />
        <input type="hidden" name="contact_intent" value={contactIntent ?? ""} />
        <input type="hidden" name="package_interest" value={pkgHidden} />
        <input type="hidden" name="_subject" value={subjectBits.join(" · ")} />
        <div
          aria-hidden="true"
          className="m-sr-only-field"
        >
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-first-name">Name</label>
          <input
            id="cf-first-name"
            name="first_name"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-business-name">Business Name</label>
          <input id="cf-business-name" name="business_name" placeholder="Your business name" required />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" placeholder="(661) 000-0000" required autoComplete="tel" />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" placeholder="you@yourbiz.com" required autoComplete="email" />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-web">Business Website</label>
          <input
            id="cf-web"
            name="business_website"
            type="text"
            inputMode="url"
            placeholder="https://yourbusiness.com"
            required
            autoComplete="url"
          />
          <p className="m-form-note m-form-note--spaced">
            No site yet? Enter <strong>none</strong> (lowercase).
          </p>
        </div>
        <SmsConsentField idPrefix="cf" />
        <TurnstileField
          key={verificationAttempt}
          className="m-form-group"
          onToken={(t) => {
            setTurnstileToken(t);
            setFormError(null);
          }}
          onExpire={() => setTurnstileToken("")}
        />
        {formError ? <p role="alert" className="m-form-note m-form-error">{formError} <a href={`tel:${CONTACT.phoneE164}`}>Call {CONTACT.phoneDisplay}</a> or <a href={`mailto:${CONTACT.email}`}>email Jason</a>.</p> : null}
        <button type="submit" className="m-submit-btn" disabled={submitting || (Boolean(siteKey) && !turnstileToken)}>
          {submitting ? "Sending..." : "Send Message →"}
        </button>
        <p className="m-form-note">Or skip the form and call {CONTACT.phoneDisplay} during published business hours.</p>
      </form>
    </div>
  );
}
