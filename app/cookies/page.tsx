import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Notice",
  description: "Cookies and similar technologies used on the COAI website, plus the controls available to visitors.",
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <LegalShell>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Cookie Notice", path: "/cookies" }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "Cookie Notice", url: `${SITE_URL}/cookies` }} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal Document</div>
          <h1>Cookie Notice</h1>
          <div className="m-legal-date">Last Updated: October 10, 2026</div>
        </div>
        <section className="m-legal-section">
          <h2>What We Use</h2>
          <p>
            This site uses essential storage for security and form handling, Google Analytics through Google Tag Manager
            to understand site use, Vercel Speed Insights to measure page performance, and Sentry to diagnose sampled
            application errors. We do not run advertising pixels, Microsoft Clarity, or routine session replay.
          </p>
        </section>
        <section className="m-legal-section">
          <h2>Your Controls</h2>
          <p>
            You can block or delete cookies in your browser settings. Blocking essential security storage may prevent a
            form from working. You can also install the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">Google Analytics Opt-out Browser Add-on</a>.
            Browser privacy extensions can block additional measurement requests.
          </p>
        </section>
        <section className="m-legal-section">
          <h2>Contact</h2>
          <p>
            Questions about website tracking can be sent to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            See the <a href="/privacy">Privacy Policy</a> for data categories, service providers, retention, and California rights.
          </p>
        </section>
      </div>
    </LegalShell>
  );
}
