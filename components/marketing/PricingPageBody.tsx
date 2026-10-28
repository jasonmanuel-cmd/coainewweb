import Link from "next/link";
import { Button, Card, Tag } from "@/components/ui";
import { AddOnMenu } from "@/components/marketing/AddOnMenu";
import { PackageCards } from "@/components/marketing/PackageCards";
import { PricingMatrix } from "@/components/marketing/PricingMatrix";
import { ADDON_COUNT, BUILD_INCLUDED, NOT_INCLUDED } from "@/lib/pricing";
import { DELIVERY_TIMELINE, OFFERS, THIRD_PARTY_COSTS } from "@/lib/site";
import "@/components/revamp/home.css";

/**
 * The page that quotes prices in detail. Every number comes from lib/site.ts
 * (OFFERS) and lib/pricing.ts — nothing here is a literal. Retired ladders
 * (Trades Starter Pack, AI Lead Machine, Operational Ecosystem, Signal
 * Foundation, Sentinel Automation, TradeCall Build, Revenue Continuity) are
 * gone; do not reintroduce them.
 */

export function PricingPageBody() {
  return (
    <>
      <section className="home-hero">
        <div className="home-container">
          <div className="home-hero__eyebrow">Pricing</div>
          <h1 className="home-hero__title">Websites, systems, and every price on the table.</h1>
          <p className="home-hero__sub">
            Start with a custom website, then add only the systems that fit your business, as a package or one
            piece at a time. Fixed scope, fixed price: you approve the proposal before a line of code is written,
            and every third-party cost is on the table before you sign.
          </p>
        </div>
      </section>

      {/* Where to start */}
      <section className="home-section">
        <div className="home-container">
          <span className="home-eyebrow">01 — Where to start</span>
          <h2 className="home-h2">Two ways in.</h2>
          <p className="home-lede">
            Not sure what you need? Start with the scorecard. Already know? Start with the website and build up
            from there.
          </p>
          <div className="home-grid-2">
            <Card>
              <div className="home-offer">
                <Tag kind="proof">{OFFERS.scorecard.stage}</Tag>
                <div className="home-offer__name">{OFFERS.scorecard.name}</div>
                <div className="home-offer__price">{OFFERS.scorecard.price}</div>
                <div className="home-offer__terms">{OFFERS.scorecard.alt} · {OFFERS.scorecard.turnaround}</div>
                <p className="home-offer__desc">{OFFERS.scorecard.summary}</p>
                <Button href="/intake" variant="secondary">Get my leak score</Button>
              </div>
            </Card>
            <Card>
              <div className="home-offer">
                <Tag kind="control">{OFFERS.website.stage}</Tag>
                <div className="home-offer__name">{OFFERS.website.name}</div>
                <div className="home-offer__price">{OFFERS.website.price} flat</div>
                <div className="home-offer__terms">{OFFERS.website.terms} · {DELIVERY_TIMELINE} from signed scope</div>
                <p className="home-offer__desc">{OFFERS.website.summary}</p>
                <Button href="/intake?pkg=website" variant="primary">Discuss my website</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="home-section" id="packages">
        <div className="home-container">
          <span className="home-eyebrow">02 — Packages</span>
          <h2 className="home-h2" id="packages-title">Three packages. Build up as far as you need.</h2>
          <p className="home-lede">
            Each package starts from the {OFFERS.website.name} and adds the systems that win and keep the customer.
            Missed-call text-back, review requests, booking, follow-up, and the rest are inside the packages, or
            available one at a time below. Package prices include the website; the larger systems are scoped
            and fixed in writing before work begins, so the final number depends on exactly what is implemented.
          </p>
          <PackageCards headingId="packages-title" />
        </div>
      </section>

      {/* Comparison */}
      <section className="home-section" id="compare">
        <div className="home-container">
          <span className="home-eyebrow">03 — Compare</span>
          <h2 className="home-h2">Side by side.</h2>
          <p className="home-lede">
            What each option includes, how it is paid for, and what is deliberately left out of every offer.
          </p>
          <PricingMatrix />
        </div>
      </section>

      {/* Included / not included */}
      <section className="home-section">
        <div className="home-container">
          <span className="home-eyebrow">04 — What {OFFERS.website.price} buys</span>
          <h2 className="home-h2">Included, and deliberately not included.</h2>
          <p className="home-lede">
            &ldquo;No surprises&rdquo; only means something if the exclusions are published too. Here are both
            lists for the website build every package starts from.
          </p>
          <div className="home-grid-2">
            <Card>
              <Tag kind="control">Control installed</Tag>
              <ul className="pricing-list">
                {BUILD_INCLUDED.map((item) => (
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

      {/* Add-on menu */}
      <section className="home-section" id="addons">
        <div className="home-container">
          <span className="home-eyebrow">05 — The full menu</span>
          <h2 className="home-h2">{ADDON_COUNT} add-ons, each priced.</h2>
          <p className="home-lede">
            Prefer to build one piece at a time? Every system below can be added to a website individually.
            Ranges depend on scope and are fixed in writing before work starts. Where a price shows a monthly
            amount, that is the ongoing cost for running the system.
          </p>
          <AddOnMenu />
        </div>
      </section>

      {/* Third-party costs */}
      <section className="home-section home-section--inverse">
        <div className="home-container">
          <span className="home-eyebrow">06 — What continues after launch</span>
          <h2 className="home-h2">Third-party costs, none of them paid to us.</h2>
          <p className="home-lede">
            These run in your own accounts. If you leave, they stay with you — that is the point. Systems that send
            texts or use AI also carry carrier and usage fees from those providers; we tell you what to expect
            before you sign.
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
          <span className="home-eyebrow">07 — How we handle scope</span>
          <h2 className="home-h2">The proposal is the contract.</h2>
          <p className="home-lede">
            Every project is scoped in writing before work begins. If we miss a deliverable that was in the
            scope document, we fix it at no additional cost. No scope-creep charges, and no &ldquo;that
            wasn&apos;t included&rdquo; conversation after you have paid.
          </p>
          <p className="home-lede">
            This is a commitment about scope, not about results. We do not promise a number of calls, a
            ranking, an AI citation, a rating, or a revenue figure — see the{" "}
            <Link href="/terms">terms</Link> for what we do and do not warrant.
          </p>
        </div>
      </section>

      <section className="home-section home-section--inverse">
        <div className="home-container home-container--narrow home-cta">
          <span className="home-eyebrow">Not sure yet</span>
          <h2 className="home-h2">Start with the leak score.</h2>
          <p className="home-lede home-lede--spaced">
            Three observed leaks on your actual site and Google profile, the assumptions behind each, and the
            one control we would install first. You keep it either way.
          </p>
          <div className="home-cta__actions">
            <Button href="/intake" variant="primary" size="lg">
              Get my leak score
            </Button>
            <Button href="/demo" variant="inverse" size="lg">
              Try the lead-response demo
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
