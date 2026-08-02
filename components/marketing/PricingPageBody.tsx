import Link from "next/link";
import { Button, Card, ComparisonTable, Tag } from "@/components/ui";
import { OFFERS, THIRD_PARTY_COSTS } from "@/lib/site";
import "@/components/revamp/home.css";

/**
 * The only page that quotes prices in detail. Every number comes from OFFERS in
 * lib/site.ts — nothing here is a literal. Retired ladders (Trades Starter Pack,
 * AI Lead Machine, Operational Ecosystem, Signal Foundation, Sentinel
 * Automation) are gone; do not reintroduce them.
 */

const INCLUDED = [
  "Call-first, mobile-first website, custom-coded — you own 100% of the source",
  "One aligned business identity: name, address, phone, hours, services, service areas",
  "Google Business Profile cleanup and baseline reconciliation",
  "Click-to-call, form capture, and a tested call-routing path",
  "Missed-call text-back and lead acknowledgement",
  "Basic lead pipeline with an owner alert",
  "Ownership and account map, plus documented handoff",
  "Launch QA and a 30-day baseline scorecard"
] as const;

const NOT_INCLUDED = [
  "Ad spend on Google, Meta, or anywhere else",
  "Custom third-party integrations",
  "Ongoing content beyond the agreed scope",
  "Carrier, SMS, and AI usage fees",
  "Hosting",
  "Advanced CRM migration",
  "Around-the-clock human dispatch"
] as const;

const PRICE_COLUMNS = ["Offer", "Price", "What it is", "Recurring"] as const;

const PRICE_ROWS = [
  [
    OFFERS.scorecard.name,
    OFFERS.scorecard.price,
    OFFERS.scorecard.summary,
    `Otherwise ${OFFERS.scorecard.alt.toLowerCase()}`
  ],
  [
    OFFERS.tradecall.name,
    `${OFFERS.tradecall.price} flat`,
    OFFERS.tradecall.summary,
    `${OFFERS.tradecall.terms}. Hosting and SMS billed by the vendor, not COAI.`
  ],
  [
    "Bilingual build (EN/ES)",
    OFFERS.tradecall.bilingual,
    "Full Spanish translation with hreflang markup and translation QA.",
    "Included in the build"
  ],
  [
    OFFERS.continuity.name,
    `${OFFERS.continuity.price}/${OFFERS.continuity.period}`,
    OFFERS.continuity.summary,
    `Monthly, ${OFFERS.continuity.terms}`
  ]
] as const;

export function PricingPageBody() {
  return (
    <>
      <section className="home-hero">
        <div className="home-container">
          <div className="home-hero__eyebrow">Pricing</div>
          <h1 className="home-hero__title">One price list. No surprises after signature.</h1>
          <p className="home-hero__sub">
            Fixed scope, fixed price. You approve the proposal before a line of code is written, and every
            third-party cost is on the table before you sign. This page is the single source of truth — if a
            number appears somewhere else on this site, it comes from here.
          </p>
        </div>
      </section>

      {/* The three offers */}
      <section className="home-section">
        <div className="home-container">
          <span className="home-eyebrow">01 — The whole price list</span>
          <h2 className="home-h2">Three offers. That is all we sell.</h2>
          <ComparisonTable columns={PRICE_COLUMNS} rows={PRICE_ROWS} />
        </div>
      </section>

      {/* Included / not included */}
      <section className="home-section">
        <div className="home-container">
          <span className="home-eyebrow">02 — What {OFFERS.tradecall.price} buys</span>
          <h2 className="home-h2">Included, and deliberately not included.</h2>
          <p className="home-lede">
            &ldquo;No surprises&rdquo; only means something if the exclusions are published too. Here are both
            lists.
          </p>
          <div className="home-grid-2">
            <Card>
              <Tag kind="control">Control installed</Tag>
              <ul className="pricing-list">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <Tag kind="leak">Not included</Tag>
              <ul className="pricing-list">
                {NOT_INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Third-party costs */}
      <section className="home-section home-section--inverse">
        <div className="home-container">
          <span className="home-eyebrow">03 — What continues after launch</span>
          <h2 className="home-h2">Two recurring costs, neither one paid to us.</h2>
          <p className="home-lede">
            These run in your own accounts. If you leave, they stay with you — that is the point.
          </p>
          <div className="home-grid-2">
            {THIRD_PARTY_COSTS.map((cost) => (
              <Card key={cost.item} inverse>
                <div className="home-proof">
                  <div>
                    <div className="home-proof__label">{cost.item}</div>
                    <div className="home-offer__desc">{cost.paidTo}</div>
                  </div>
                  <span className="home-offer__price">{cost.cost}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scope commitment */}
      <section className="home-section">
        <div className="home-container home-container--narrow">
          <span className="home-eyebrow">04 — How we handle scope</span>
          <h2 className="home-h2">The proposal is the contract.</h2>
          <p className="home-lede">
            Every project is scoped in writing before work begins. If we miss a deliverable that was in the
            scope document, we fix it at no additional cost. No scope-creep charges, and no &ldquo;that
            wasn&apos;t included&rdquo; conversation after you have paid.
          </p>
          <p className="home-lede">
            This is a commitment about scope, not about results. We do not promise a number of calls, a
            ranking, a rating, or a revenue figure — see the{" "}
            <Link href="/terms">terms</Link> for what we do and do not warrant.
          </p>
        </div>
      </section>

      <section className="home-section home-section--inverse">
        <div className="home-container home-container--narrow home-cta">
          <span className="home-eyebrow">Not sure yet</span>
          <h2 className="home-h2" style={{ maxWidth: "none" }}>
            Start with the leak score.
          </h2>
          <p className="home-lede" style={{ margin: "0 auto var(--space-5)" }}>
            Three observed leaks on your actual site and Google profile, the assumptions behind each, and the
            one control we would install first. You keep it either way.
          </p>
          <div className="home-cta__actions">
            <Button href="/intake" variant="primary" size="lg">
              Get my leak score
            </Button>
            <Button href="/faq" variant="inverse" size="lg">
              Read the FAQ
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
