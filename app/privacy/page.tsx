import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Chaotically Organized AI collects, uses, protects, and shares website and inquiry data.",
  path: "/privacy"
});

export default function PrivacyPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy policy", path: "/privacy" }
  ]);

  return (
    <LegalShell>
      <JsonLd data={crumbs} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "Privacy Policy", url: `${SITE_URL}/privacy` }} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal Document</div>
          <h1>Privacy Policy</h1>
          <div className="m-legal-date">Last Updated: October 10, 2026 · {LEGAL_NAME} · Bakersfield, CA</div>
        </div>

        <section className="m-legal-section">
          <h2>1. Who We Are</h2>
          <p>
            {LEGAL_NAME} (&quot;COAI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides digital infrastructure and AI
            automation services from {CONTACT.city}, {CONTACT.region}. We operate remotely and do not maintain a public
            walk-in office. Contact us at <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.phoneDisplay}.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>2. Information We Collect</h2>
          <p>When you contact us, request a diagnostic, or engage our services, we may collect:</p>
          <ul>
            <li>Name, business name, phone number, email address, website URL, and service-area details.</li>
            <li>Messages, project requirements, and business metrics you choose to submit.</li>
            <li>Consent records and technical anti-abuse signals connected with a form submission.</li>
          </ul>
          <p>
            Website tools may also collect IP address, browser and device details, referring page, pages viewed,
            approximate region, performance timing, and error diagnostics. We do not ask analytics or error-monitoring
            providers to record routine session video, and our Sentry configuration disables default PII collection.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>3. How We Use Information</h2>
          <ul>
            <li>Respond to inquiries, prepare diagnostics, and provide requested services.</li>
            <li>Operate, secure, debug, and improve this website.</li>
            <li>Measure aggregate traffic and site performance.</li>
            <li>Maintain records, prevent abuse, and comply with legal obligations.</li>
          </ul>
          <p>We do not sell personal information or use it for cross-context behavioral advertising.</p>
        </section>

        <section className="m-legal-section">
          <h2>4. Service Providers</h2>
          <p>We disclose limited data to processors only for the functions below:</p>
          <ul>
            <li><strong>Formspree</strong> — processes contact and intake form submissions.</li>
            <li><strong>Cloudflare Turnstile</strong> — detects automated or abusive form traffic.</li>
            <li><strong>Google Analytics via Google Tag Manager</strong> — measures website use and traffic sources.</li>
            <li><strong>Vercel Speed Insights</strong> — measures real-user page performance.</li>
            <li><strong>Sentry</strong> — captures sampled application errors and limited performance diagnostics.</li>
            <li><strong>Vercel</strong> — hosts and delivers the website and associated server functions.</li>
          </ul>
          <p>These providers process information under their own privacy terms and our applicable service settings.</p>
        </section>

        <section className="m-legal-section">
          <h2>5. Cookies and Controls</h2>
          <p>
            Google Analytics may use first-party identifiers to distinguish visits. Security and form tools may set
            strictly necessary cookies or use equivalent storage. We do not run Microsoft Clarity, routine session
            replay, or a separate advertising pixel. See our <a href="/cookies">Cookie Notice</a> for browser controls
            and opt-out links.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>6. Retention</h2>
          <p>
            Inquiry records are generally kept while we respond and for up to 24 months for service history, unless a
            longer period is required for an active client relationship, dispute, accounting, or law. We configure
            analytics and error data for limited operational retention where provider controls are available and review
            those records periodically. You may request deletion at any time; some records may be retained where legally
            required or necessary to protect legal rights.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>7. California Privacy Rights</h2>
          <p>
            California residents may request access, correction, or deletion of covered personal information and may ask
            for the categories of information collected, purposes of use, and recipients. COAI does not sell or share
            personal information for cross-context behavioral advertising. We will not discriminate against you for
            exercising a privacy right. Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> with “Privacy
            Request” in the subject. We may need to verify your identity before completing the request.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>8. Security and Children</h2>
          <p>
            We use reasonable technical and organizational safeguards, but no internet transmission or storage system is
            completely secure. This business-to-business site is not directed to children under 13, and we do not
            knowingly collect their personal information.
          </p>
        </section>

        <section className="m-legal-section">
          <h2>9. Changes and Contact</h2>
          <p>
            We may update this policy as our services or processors change. The date above identifies the latest version.
            Questions or privacy requests: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · {CONTACT.phoneDisplay}
            · {CONTACT.city}, {CONTACT.region}.
          </p>
        </section>
      </div>
    </LegalShell>
  );
}
