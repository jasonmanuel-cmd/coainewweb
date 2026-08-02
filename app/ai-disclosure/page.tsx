import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { BUSINESS_HOURS_LABEL, CONTACT, FOUNDER, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI disclosure",
  description:
    "How COAI's AI call agent works: that you are talking to software, recording and consent, what it cannot do, emergency exclusions, and the named human it escalates to.",
  path: "/ai-disclosure"
});

export default function AiDisclosurePage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "AI disclosure", path: "/ai-disclosure" }
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI disclosure",
    url: `${SITE_URL}/ai-disclosure`
  };

  return (
    <LegalShell>
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal document</div>
          <h1>AI disclosure</h1>
          <div className="m-legal-date">
            Last updated: August 2026 · {LEGAL_NAME} · {CONTACT.city}, {CONTACT.region}
          </div>
        </div>

        <div className="m-legal-section">
          <h2>1. When you are talking to software</h2>
          <p>
            COAI builds and operates an AI call agent, Cipher, which can answer calls, ask qualifying
            questions, and route bookings. Where it is deployed, callers are told at the start of the call
            that they are speaking with an automated agent. We do not present it as a person, we do not give
            it a fake job title, and we do not describe our team as larger than it is by counting software as
            staff.
          </p>
          <p>
            The chat widget on this website is also automated. Anything it tells you about scope, price, or
            timeline is informational — the written proposal is what binds us.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>2. Recording and consent</h2>
          <p>
            California is an all-party consent state for recorded conversations. Where a call is recorded or
            transcribed, the disclosure is made at the start of the call and you may decline. If you decline,
            you can continue with a human instead — call{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a> and ask for a person.
          </p>
          <p>
            Recordings and transcripts are used for quality review and to improve call handling. Retention and
            deletion are covered in the <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>3. What it does not do</h2>
          <p>
            The agent does not give legal, medical, or financial advice. It does not take payment card
            details. It does not agree pricing, scope, or contract terms on our behalf. It does not dispatch
            emergency services.
          </p>
          <p>
            It can be wrong. If an answer it gives conflicts with this website, the written proposal, or our{" "}
            <Link href="/terms">terms</Link>, those documents govern.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>4. Emergency exclusion</h2>
          <p>
            Do not use an automated line to report an emergency. If there is a fire, gas leak, flood, medical
            emergency, or any immediate risk to life or property, hang up and call 911. Automated call
            handling is not a monitored emergency service and must not be relied on as one.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>5. Human escalation</h2>
          <p>
            Every automated path has a named person behind it. At COAI that person is {FOUNDER.name},{" "}
            {FOUNDER.role.toLowerCase()} — reachable at{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a> or{" "}
            <a href={`mailto:${FOUNDER.email}`}>{FOUNDER.email}</a> during{" "}
            {BUSINESS_HOURS_LABEL.toLowerCase()}.
          </p>
          <p>
            You can ask for a human at any point in an automated call or chat and the request will be
            honoured. An automation without a human path behind it is not a feature; it is a new way to fail.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>6. Outbound calling</h2>
          <p>
            We do not use AI voice agents for cold outbound prospecting. Automated voice contact happens only
            with people who have asked us to contact them, or with our clients&apos; own inbound callers under
            terms agreed with that client.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>7. Systems we build for clients</h2>
          <p>
            When we deploy call automation for a client, the same standards are conditions of launch: an
            approved script, disclosure that the agent is automated, recording consent where applicable, an
            emergency exclusion, a named human escalation contact, agreed data access and retention terms, and
            a periodic review of a sample of calls. Nothing goes live without the client signing off on those
            items.
          </p>
          <p>
            The client remains responsible for compliance in their own jurisdiction and industry. We configure
            the controls and document them; we do not act as counsel.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>8. Demo lines</h2>
          <p>
            Numbers that appear in our material for the purpose of demonstrating a product are labelled as
            demo or test lines. Our only company phone number is{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>9. Contact</h2>
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
