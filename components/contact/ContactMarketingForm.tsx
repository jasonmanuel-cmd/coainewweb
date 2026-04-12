"use client";

import { useEffect, useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/forms";
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
  const [serviceInterest, setServiceInterest] = useState("");

  useEffect(() => {
    const v = initialPackage && PKG_VALUES[initialPackage] ? PKG_VALUES[initialPackage] : "";
    setServiceInterest(v);
  }, [initialPackage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    try {
      const r = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (r.ok) {
        setDone(true);
        form.reset();
        return;
      }
    } catch {
      /* fall through */
    }
    form.submit();
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
        <input type="hidden" name="_subject" value={subjectBits.join(" · ")} />
        <div className="m-form-row">
          <div className="m-form-group">
            <label htmlFor="cf-first">First Name</label>
            <input id="cf-first" name="first_name" placeholder="First name" required autoComplete="given-name" />
          </div>
          <div className="m-form-group">
            <label htmlFor="cf-last">Last Name</label>
            <input id="cf-last" name="last_name" placeholder="Last name" required autoComplete="family-name" />
          </div>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-biz">Business Name</label>
          <input id="cf-biz" name="business_name" placeholder="Your business name" />
        </div>
        <div className="m-form-row">
          <div className="m-form-group">
            <label htmlFor="cf-phone">Phone</label>
            <input id="cf-phone" name="phone" type="tel" placeholder="(661) 000-0000" autoComplete="tel" />
          </div>
          <div className="m-form-group">
            <label htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" placeholder="you@yourbiz.com" required autoComplete="email" />
          </div>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-svc">What Do You Need?</label>
          <select
            id="cf-svc"
            name="service_interest"
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
          >
            <option value="">Select a service</option>
            <option value="pkg1">Signal Foundation Build ($1,200)</option>
            <option value="pkg2">Commerce Engine Build ($1,600)</option>
            <option value="pkg3">Sentinel Automation Layer ($2,000)</option>
            <option value="audit350">Standalone Structural Audit ($350)</option>
            <option value="cipher">AI Receptionist / Cipher Deployment</option>
            <option value="diagnostic">Not Sure — Run the Diagnostic</option>
            <option value="other">Something Else</option>
          </select>
        </div>
        <div className="m-form-group">
          <label htmlFor="cf-msg">Tell Us About Your Business</label>
          <textarea
            id="cf-msg"
            name="message"
            placeholder="What do you do, who are your customers, what's the main problem you need solved..."
          />
        </div>
        <button type="submit" className="m-submit-btn">
          Send Message →
        </button>
        <p className="m-form-note">Or skip the form — call {CONTACT.phoneDisplay} directly. Jason picks up.</p>
      </form>
    </div>
  );
}
