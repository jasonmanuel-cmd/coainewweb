import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { JaxWaitlistForm } from "@/components/jax/JaxWaitlistForm";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "JAX Sentinel - AI Diagnostic Engine",
    description:
      "JAX Sentinel - the COAI autonomous AI diagnostic and visibility engine. Pre-deployment. Register for early access.",
    path: "/jax"
  }),
  robots: { index: false }
};


export default function JaxPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "JAX Sentinel", path: "/jax" }
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "JAX Sentinel",
    url: `${SITE_URL}/jax`
  };

  return (
    <MarketingLayout activeHref="/jax">
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />
      <div className="m-jax-main">
        <div className="m-jax-inner">
          <div className="m-jax-system-tag">
            <span className="m-jax-dot-red" />
            System Status: Pre-Deployment
          </div>
          <h1 className="m-jax-title">
            JAX
            <br />
            <span className="m-text-green">SENTINEL</span>
          </h1>
          <p className="m-jax-sub">
            COAI&apos;s autonomous AI diagnostic and visibility engine.{" "}
            <strong>JAX is being developed to evaluate a business&apos;s approved digital presence</strong> — performance,
            schema integrity, answer-engine readiness, and Google Business Profile alignment — then organize the findings
            into a prioritized technical report. It is not a publicly deployed product yet.
          </p>

          <div className="m-tech-brief" id="technical-brief">
            <div className="m-tb-header">
              <span className="m-tb-title">Technical Brief · Development Preview</span>
              <span className="m-tb-version">Status: Pre-Deployment</span>
            </div>
            <div className="m-tb-grid">
              <div>
                <div className="m-tb-label">Scan Engine</div>
                <div className="m-tb-value m-tb-amber">Internal testing</div>
              </div>
              <div>
                <div className="m-tb-label">Public Performance Claim</div>
                <div className="m-tb-value">Not published before deployment</div>
              </div>
              <div>
                <div className="m-tb-label">Schema Coverage</div>
                <div className="m-tb-value">LocalBusiness + Service + FAQ</div>
              </div>
              <div>
                <div className="m-tb-label">AEO Surfaces Checked</div>
                <div className="m-tb-value">ChatGPT · Perplexity · Gemini · Siri</div>
              </div>
              <div>
                <div className="m-tb-label">GBP Alignment</div>
                <div className="m-tb-value m-tb-amber">In development · Phase II</div>
              </div>
              <div>
                <div className="m-tb-label">Competitor Intelligence</div>
                <div className="m-tb-value m-tb-red">Phase III - Roadmap</div>
              </div>
              <div>
                <div className="m-tb-label">Output Format</div>
                <div className="m-tb-value">Prioritized fix list + revenue impact</div>
              </div>
              <div>
                <div className="m-tb-label">Deployment</div>
                <div className="m-tb-value m-tb-amber">No public launch date</div>
              </div>
            </div>
          </div>

          <div className="m-jax-cap-head">Core Capabilities</div>
          <ul className="m-cap-list">
            <li>
              <span className="m-cap-icon">SCAN</span>
              <div className="m-cap-text">
                Full site performance audit - Core Web Vitals, load time, mobile speed, render blocking
                <span className="m-cap-sub">
                  Returns scored report against industry baseline for your business category
                </span>
              </div>
            </li>
            <li>
              <span className="m-cap-icon">SCHEMA</span>
              <div className="m-cap-text">
                Structured data integrity check - missing entities, malformed markup, coverage gaps
                <span className="m-cap-sub">Maps exactly which AI surfaces are misreading or ignoring your business</span>
              </div>
            </li>
            <li>
              <span className="m-cap-icon">AEO</span>
              <div className="m-cap-text">
                Answer engine readiness - how AI tools currently describe your business
                <span className="m-cap-sub">Live test across ChatGPT, Perplexity, Google AI, and voice assistants</span>
              </div>
            </li>
            <li>
              <span className="m-cap-icon">LEAK</span>
              <div className="m-cap-text">
                Revenue leak calculation - missed call volume × close rate × average ticket
                <span className="m-cap-sub">Converts technical failures into dollar amounts your accountant can read</span>
              </div>
            </li>
          </ul>

          <div className="m-jax-waitlist-head">Register for Early Access</div>
          <JaxWaitlistForm />

          <div className="m-cta-row m-cta-row--center m-cta-row--mt">
            <Link href="/intake" className="m-btn-primary">
              Run My Diagnostic →
            </Link>
            <Link href="/contact" className="m-btn-ghost">
              Talk to Jason
            </Link>
            <Link href="/services" className="m-btn-ghost">
              Explore Services
            </Link>
          </div>

          <p className="m-jax-foot-link">
            <Link href="/">← Return to COAI</Link>
          </p>
        </div>
      </div>
    </MarketingLayout>
  );
}
