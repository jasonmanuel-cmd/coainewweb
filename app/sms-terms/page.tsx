import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { BUSINESS_HOURS_LABEL, CONTACT, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "SMS terms and consent",
  description:
    "How COAI uses text messaging: what you consent to, how to stop, message frequency, carrier rates, and how we handle your phone number.",
  path: "/sms-terms"
});

export default function SmsTermsPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "SMS terms", path: "/sms-terms" }
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SMS terms and consent",
    url: `${SITE_URL}/sms-terms`
  };

  return (
    <LegalShell>
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal document</div>
          <h1>SMS terms and consent</h1>
          <div className="m-legal-date">
            Last updated: August 2026 · {LEGAL_NAME} · {CONTACT.city}, {CONTACT.region}
          </div>
        </div>

        <div className="m-legal-section">
          <h2>1. What you are agreeing to</h2>
          <p>
            When you submit a form on this site with your phone number and tick the consent box, you agree to
            receive text messages from {LEGAL_NAME} at that number. Consent is not a condition of purchase —
            you can leave the box unticked and we will contact you by email or phone instead, and you can
            always reach us directly at{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>2. What we send</h2>
          <p>
            Messages relate to the request you submitted: confirmation that we received it, your scheduled
            appointment, your scorecard or audit, and follow-up about an active project. We do not send
            marketing broadcasts, and we do not sell, rent, or share your number with third parties for their
            own marketing.
          </p>
          <p>
            Message frequency varies by conversation and is typically a handful of messages around a booking
            or an active build.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>3. How to stop</h2>
          <p>
            Reply <strong>STOP</strong> to any message to opt out. You will get one confirmation message and
            then nothing further. Reply <strong>HELP</strong> for help, or contact us at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
          <p>
            Opting out of texts does not cancel a project, and it does not remove you from email or phone
            contact. To be removed entirely, email us and say so.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>4. Carrier charges</h2>
          <p>
            Message and data rates may apply. Charges come from your mobile carrier, not from us. Carriers are
            not liable for delayed or undelivered messages. Delivery is not guaranteed and depends on your
            carrier and device.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>5. Automated messages from systems we build</h2>
          <p>
            The missed-call text-back we install for clients sends an automated acknowledgement to a caller
            who could not be reached. That is an automated acknowledgement, not a human reply, and it is
            written to say so.
          </p>
          <p>
            Clients who deploy this system are responsible for their own messaging registration, consent
            language, opt-out handling, and applicable law in their jurisdiction. We configure the system and
            document the requirements; we are not your compliance counsel. Approved scripts, opt-out handling,
            and a named human escalation contact are agreed in writing before any client messaging goes live.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>6. Emergencies</h2>
          <p>
            Do not use text messaging to report an emergency. Automated and business-hours channels are not
            monitored continuously. Our published hours are {BUSINESS_HOURS_LABEL.toLowerCase()}. For an
            emergency, call 911.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>7. Your number and your data</h2>
          <p>
            How we store, retain, and delete the information you give us — including your phone number — is
            covered in the <Link href="/privacy">privacy policy</Link>. How our AI call agent handles calls,
            recording, and escalation is covered in the{" "}
            <Link href="/ai-disclosure">AI disclosure</Link>.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>8. Contact</h2>
          <p>
            {LEGAL_NAME}
            <br />
            {CONTACT.city}, {CONTACT.region} (remote — no walk-in office)
            <br />
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
      </div>
    </LegalShell>
  );
}
