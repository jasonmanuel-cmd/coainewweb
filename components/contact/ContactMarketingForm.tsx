"use client";

import { useEffect, useState } from "react";
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
  const [formError, setFormError] = useState<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [pkgHidden, setPkgHidden] = useState("");
  useEffect(() => {
    const v = initialPackage && PKG_VALUES[initialPackage] ? PKG_VALUES[initialPackage] : "";
    setPkgHidden(v);
  }, [initialPackage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...entries,
          turnstileToken,
          _subject: subjectBits.join(" · ")
        })
      });
      if (r.ok) {
        setDone(true);
        form.reset();
        setTurnstileToken("");
        return;
      }
      const errJson = (await r.json().catch(() => null)) as { error?: string } | null;
      setFormError(errJson?.error || "Something went wrong. Try again or call us.");
    } catch {
      setFormError("Network error. Try again or call us.");
    }
  }

  if (done) {
    return (
      <div className="m-contact-success">
        <p>✓ MESSAGE RECEIVED — Jason will respond same business day.</p>
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
        Submissions go to <strong>{CONTACT.email}</strong> via our form handler. Jason responds same business day. If
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
          style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
        >
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-first-name">First Name</label>
          <input
            id="cf-first-name"
            name="first_name"
            placeholder="First name"
            required
            autoComplete="given-name"
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
          <p className="m-form-note" style={{ marginTop: "0.35rem" }}>
            No site yet? Enter <strong>none</strong> (lowercase).
          </p>
        </div>
        <TurnstileField
          className="m-form-group"
          onToken={(t) => {
            setTurnstileToken(t);
            setFormError(null);
          }}
          onExpire={() => setTurnstileToken("")}
        />
        {formError ? <p className="m-form-note" style={{ color: "var(--accent, #c45)" }}>{formError}</p> : null}
        <button type="submit" className="m-submit-btn">
          Send Message →
        </button>
        <p className="m-form-note">Or skip the form — call {CONTACT.phoneDisplay} directly. Jason picks up.</p>
      </form>
    </div>
  );
}
