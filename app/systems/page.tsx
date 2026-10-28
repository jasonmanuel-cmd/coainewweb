import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { OFFERS, SITE_URL } from "@/lib/site";
import { SYSTEM_CAPABILITY_COUNT, SYSTEM_CHAPTERS, SYSTEM_CHAPTER_COUNT } from "@/lib/systems";

const description =
  "Explore COAI's public systems catalog: practical capabilities for capturing inquiries, qualifying leads, converting demand, retaining customers, and measuring revenue leaks.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Systems Catalog | Chaotically Organized AI" },
  description,
  path: "/systems",
  published: "2026-08-12",
  modified: "2026-10-10"
});

export default function SystemsPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Systems", path: "/systems" }
  ]);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "COAI Systems Catalog",
    description,
    url: `${SITE_URL}/systems`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: SYSTEM_CAPABILITY_COUNT,
      itemListElement: SYSTEM_CHAPTERS.flatMap((chapter) =>
        chapter.capabilities.map((capability, index) => ({
          "@type": "ListItem",
          position:
            SYSTEM_CHAPTERS.slice(0, SYSTEM_CHAPTERS.indexOf(chapter)).reduce(
              (total, previous) => total + previous.capabilities.length,
              0
            ) + index + 1,
          name: capability.name,
          description: capability.purpose
        }))
      )
    }
  };

  return (
    <MarketingLayout activeHref="/systems">
      <JsonLd data={crumbs} />
      <JsonLd data={collection} />
      <JsonLd data={serviceJsonLd("Revenue response and customer lifecycle systems", description, "/systems")} />

      <section className="systems-hero" aria-labelledby="systems-title">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-container systems-hero-inner">
          <span className="section-index">[ PUBLIC SYSTEMS BRIEFING ]</span>
          <h1 id="systems-title">The website is one piece.<br /><em>The systems around it are the rest.</em></h1>
          <p>
            Most local businesses already get inquiries. The leak is the space between a raised hand and scheduled work—and
            the space between a finished job and the next one. COAI builds the path in between.
          </p>
          <div className="systems-hero-actions">
            <Link href="/intake" className="revamp-btn-primary">Find my first leak <ArrowRight aria-hidden="true" /></Link>
            <Link href="/pricing" className="revamp-btn-ghost">See packages and pricing</Link>
          </div>
          <div className="systems-hero-stats" aria-label="Catalog summary">
            <div><strong>{SYSTEM_CHAPTER_COUNT}</strong><span>operating chapters</span></div>
            <div><strong>{SYSTEM_CAPABILITY_COUNT}</strong><span>scoped capabilities</span></div>
            <div><strong>1</strong><span>documented next action</span></div>
          </div>
        </div>
      </section>

      <section className="systems-principle" aria-labelledby="systems-principle-title">
        <div className="m-container systems-principle-grid">
          <div>
            <span className="section-index">[ THE OPERATING MODEL ]</span>
            <h2 id="systems-principle-title">Catch. Convert. Keep.</h2>
          </div>
          <div>
            <p>
              Nothing here is installed because “AI” sounds impressive. A capability earns its place only when it answers
              the phone, clarifies the job, follows the quote, protects the handoff, or helps the team make a better decision.
            </p>
            <ul>
              <li><Check aria-hidden="true" /> Business function before technology</li>
              <li><Check aria-hidden="true" /> Approved facts and human escalation</li>
              <li><Check aria-hidden="true" /> Client-owned accounts, code, and data</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="systems-catalog" aria-labelledby="catalog-title">
        <div className="m-container">
          <div className="systems-catalog-heading">
            <div>
              <span className="section-index">[ CAPABILITY MAP ]</span>
              <h2 id="catalog-title">Every system has one job.</h2>
            </div>
            <p>Select the failure point first. Scope the smallest useful control second.</p>
          </div>

          <div className="systems-chapters">
            {SYSTEM_CHAPTERS.map((chapter) => (
              <article className="systems-chapter" key={chapter.code}>
                <header>
                  <span>{chapter.code}</span>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.outcome}</p>
                </header>
                <div className="systems-capabilities">
                  {chapter.capabilities.map((capability, index) => (
                    <div className="systems-capability" key={capability.name}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><h4>{capability.name}</h4><p>{capability.purpose}</p></div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="systems-scope" aria-labelledby="systems-scope-title">
        <div className="m-container systems-scope-grid">
          <div className="systems-scope-icon"><ShieldCheck aria-hidden="true" /></div>
          <div>
            <span className="section-index">[ SCOPE CONTROL ]</span>
            <h2 id="systems-scope-title">A catalog is not a promise that every module is included.</h2>
            <p>
              The {OFFERS.website.name} is {OFFERS.website.price}, and the packages and add-ons built on it are priced on the
              pricing page. Advanced integrations and lifecycle modules are quoted only when the diagnostic finds a real use
              for them. Your statement of work names every included system before you approve it.
            </p>
          </div>
          <Link href="/pricing" className="text-link">Review price and exclusions <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="services-final systems-final">
        <div className="m-container services-final-inner">
          <Check aria-hidden="true" />
          <h2>Start with the leak.<br />Not the shopping list.</h2>
          <p>The Job-Call Leak Scorecard identifies the first control worth installing before a larger system is scoped.</p>
          <Link href="/intake" className="revamp-btn-primary">Get my leak score <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
