"use client";

import { useState } from "react";
import Image from "next/image";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Reveal } from "./Reveal";
import { WebsiteXray } from "./WebsiteXray";
import { Button, Card, ComparisonTable, Input, StatBlock, Tag } from "@/components/ui";
import { CLIENT_REVIEWS } from "@/lib/schema";
import { PORTFOLIO_CASES } from "@/lib/portfolio-cases";
import { revenueAtRisk } from "@/lib/revenue-at-risk";
import { CONTACT, GOOGLE_BUSINESS_PROFILE_URL, OFFERS } from "@/lib/site";
import "./home.css";

/** Derived, never hand-written — the published count cannot drift from the data again. */
const LIVE_SITE_COUNT = PORTFOLIO_CASES.length;

const OFFER_LIST = [
  { ...OFFERS.scorecard, terms: OFFERS.scorecard.alt },
  { ...OFFERS.tradecall, terms: OFFERS.tradecall.terms },
  {
    ...OFFERS.continuity,
    price: `${OFFERS.continuity.price}/${OFFERS.continuity.period}`,
    terms: OFFERS.continuity.terms
  }
] as const;

const LEDGER_COLUMNS = ["Decision", "Platform-first site", "COAI infrastructure standard"] as const;

const LEDGER_ROWS = [
  ["Who controls the account credentials?", "Verify before purchase", "You are named in the Ownership Ledger"],
  ["Can the system be exported, and is handoff documented?", "Verify plan and platform limits", "Repository and account handoff, in writing"],
  ["Is missed-call recovery installed and tested?", "Often a separate add-on", "A tested control inside the build scope"],
  ["Are business facts consistent across the web and Google?", "Your responsibility unless managed", "Baseline reconciliation included"],
  ["What happens when the vendor leaves?", "Varies", "Account map plus handoff checklist"]
] as const;

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function toCount(raw: string): number {
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

export function LandingHomeRevamp() {
  const [missedCalls, setMissedCalls] = useState("6");
  const [jobValue, setJobValue] = useState("450");
  const risk = revenueAtRisk(toCount(missedCalls), toCount(jobValue));

  return (
    <div className="revamp-shell">
      <Nav />

      <main>
        {/* Hero */}
        <section className="home-hero">
          <div className="home-hero__circuit" aria-hidden="true" />
          <div className="home-container">
            <div className="home-hero__logo-wrap">
              <Image
                src="/newlogo.png"
                alt="COAI logo — Chaotically Organized AI"
                className="home-hero__logo"
                fill
                sizes="(max-width: 768px) 60vw, 200px"
                priority
              />
            </div>
            <div className="home-hero__eyebrow">Bakersfield contractor revenue infrastructure</div>
            <h1 className="home-hero__title">When you miss the call, you miss the job. Fix the leak.</h1>
            <p className="home-hero__sub">
              COAI installs a call-first website, instant missed-call response, Google Business cleanup, and
              lead routing you own.
            </p>
            <div className="home-hero__actions">
              <Button href="/intake" variant="primary" size="lg">
                Get my job-call leak score
              </Button>
              <Button href={`tel:${CONTACT.phoneE164}`} variant="inverse" size="lg">
                Call {CONTACT.phoneDisplay}
              </Button>
            </div>
            <div className="home-hero__stats">
              <StatBlock inverse value={OFFERS.tradecall.price} label="Flat build price" />
              <StatBlock inverse value="<30 sec" label="Text-back target" />
              <StatBlock inverse value="01" label="Public identity" />
              <StatBlock inverse value="100%" label="You own the system" />
            </div>
          </div>
        </section>

        {/* 01 — Offer architecture */}
        <Reveal>
          <section id="offers" className="home-section home-section--inverse">
            <div className="home-container">
              <span className="home-eyebrow">01 — One buyer journey</span>
              <h2 className="home-h2">Find the leak. Fix the leak. Run the system.</h2>
              <p className="home-lede">
                Three things, in order. You do not have to learn a product taxonomy to buy from us.
              </p>
              <div className="home-grid-3">
                {OFFER_LIST.map((offer) => (
                  <Card key={offer.name} inverse interactive>
                    <div className="home-offer">
                      <Tag kind="info">{offer.stage}</Tag>
                      <div className="home-offer__name">{offer.name}</div>
                      <div className="home-offer__price">{offer.price}</div>
                      <div className="home-offer__terms">{offer.terms}</div>
                      <p className="home-offer__desc">{offer.summary}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 02 — Proof board */}
        <Reveal>
          <section id="proof" className="home-section">
            <div className="home-container">
              <span className="home-eyebrow">02 — Proof board</span>
              <h2 className="home-h2">No adjectives without a measurement.</h2>
              <p className="home-lede">
                Everything below is either verifiable right now or openly marked as not yet proven. We do not
                publish a number we cannot show you.
              </p>
              <div className="home-grid-2">
                <Card>
                  <div className="home-proof">
                    <div>
                      <div className="home-proof__label">Client-owned accounts</div>
                      <div className="home-proof__value">
                        Domain, hosting, source code, analytics, and lead data stay in your name. Documented
                        at handoff.
                      </div>
                    </div>
                    <Tag kind="control">Control installed</Tag>
                  </div>
                </Card>

                <Card>
                  <div className="home-proof">
                    <div>
                      <div className="home-proof__label">Portfolio links live</div>
                      <div className="home-proof__value">
                        {LIVE_SITE_COUNT} client sites, each linked and clickable on the{" "}
                        <a href="/portfolio">portfolio page</a>. Check them yourself.
                      </div>
                    </div>
                    <Tag kind="control">Control installed</Tag>
                  </div>
                </Card>

                <Card>
                  <div className="home-proof">
                    <div>
                      <div className="home-proof__label">Google reviews</div>
                      <div className="home-proof__value">
                        Read them on the{" "}
                        <a href={GOOGLE_BUSINESS_PROFILE_URL} rel="noopener noreferrer" target="_blank">
                          Google Business Profile
                        </a>
                        . We do not restate a rating here.
                      </div>
                    </div>
                    <Tag kind="control">Control installed</Tag>
                  </div>
                </Card>

                <Card>
                  <div className="home-proof">
                    <div>
                      <div className="home-proof__label">Response-time test log</div>
                      <div className="home-proof__value">
                        We will publish a dated, repeating test of our own missed-call path. Until that log
                        exists, we make no speed claim about it.
                      </div>
                    </div>
                    <Tag kind="proof">Proof required</Tag>
                  </div>
                </Card>
              </div>

              <div className="m-xray-wrap">
                <WebsiteXray />
              </div>
            </div>
          </section>
        </Reveal>

        {/* 03 — Revenue at risk */}
        <Reveal>
          <section id="calculator" className="home-section home-section--inverse">
            <div className="home-container home-container--narrow">
              <span className="home-eyebrow">03 — Your inputs, not industry facts</span>
              <h2 className="home-h2">Revenue at risk calculator</h2>
              <Card inverse raised>
                <div className="home-calc__inputs">
                  <Input
                    inverse
                    mono
                    label="Missed qualified calls / week"
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(e.target.value)}
                  />
                  <Input
                    inverse
                    mono
                    label="Average booked job value"
                    type="number"
                    min={0}
                    step={50}
                    inputMode="numeric"
                    value={jobValue}
                    onChange={(e) => setJobValue(e.target.value)}
                  />
                </div>
                <div className="home-calc__results">
                  <div className="home-calc__band">
                    <div className="home-calc__band-label">Low</div>
                    <div className="home-calc__band-value">{currency.format(risk.low)}/mo</div>
                  </div>
                  <div className="home-calc__band home-calc__band--base">
                    <div className="home-calc__band-label">Base</div>
                    <div className="home-calc__band-value">{currency.format(risk.base)}/mo</div>
                  </div>
                  <div className="home-calc__band">
                    <div className="home-calc__band-label">High</div>
                    <div className="home-calc__band-value">{currency.format(risk.high)}/mo</div>
                  </div>
                </div>
                <p className="home-calc__note">
                  Assumes roughly 40% of missed calls get a response too late or not at all, and about 1 in 4
                  of those would have booked. Low and high are 40% either side of the base. Edit the inputs —
                  these are your assumptions, not industry facts, and this is revenue at risk, not a
                  guaranteed loss. Nothing here is a projection of what you will earn.
                </p>
              </Card>
            </div>
          </section>
        </Reveal>

        {/* 04 — AI Diagnostic Engine (JAX) */}
        <Reveal>
          <section id="jax-preview" className="home-section home-section--inverse">
            <div className="home-container">
              <span className="home-eyebrow">04 — See what the AI sees</span>
              <h2 className="home-h2">
                <span className="m-text-steel">JAX Sentinel</span> AI diagnostic scan
              </h2>
              <p className="home-lede">
                JAX is COAI&apos;s autonomous AI diagnostic engine. In under 3 minutes it scans your entire digital
                presence — performance, schema integrity, AI answer-engine readiness, Google Business Profile alignment,
                and competitor gap analysis — then returns a prioritized action report in plain dollars.
              </p>
              <div className="home-grid-3">
                <Card inverse interactive>
                  <div className="home-offer">
                    <Tag kind="info">SCAN</Tag>
                    <div className="home-offer__name">Site Performance</div>
                    <div className="home-offer__desc">
                      Core Web Vitals, load time, mobile speed, render-blocking resources. Measured on your live URL.
                    </div>
                  </div>
                </Card>
                <Card inverse interactive>
                  <div className="home-offer">
                    <Tag kind="info">SCHEMA</Tag>
                    <div className="home-offer__name">AI Discoverability</div>
                    <div className="home-offer__desc">
                      How ChatGPT, Perplexity, Gemini, and Siri currently describe your business — and the gaps.
                    </div>
                  </div>
                </Card>
                <Card inverse interactive>
                  <div className="home-offer">
                    <Tag kind="info">LEAK</Tag>
                    <div className="home-offer__name">Revenue Impact</div>
                    <div className="home-offer__desc">
                      Converts technical failures into dollar amounts your accountant can read. Prioritized by revenue risk.
                    </div>
                  </div>
                </Card>
              </div>
              <div className="home-cta__actions home-cta__actions--mt">
                <Button href="/jax" variant="primary" size="lg">
                  See JAX Technical Brief →
                </Button>
                <Button href="/intake" variant="ghost" size="lg">
                  Run the free leak score →
                </Button>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 05 — Ownership ledger */}
        <Reveal>
          <section id="ledger" className="home-section">
            <div className="home-container">
              <span className="home-eyebrow">05 — Ownership ledger</span>
              <h2 className="home-h2">You control the login. We document the handoff.</h2>
              <p className="home-lede">
                A rented platform can be the right choice for a simple brochure site. The question is whether
                it gives you the account control, export path, call recovery, and documented handoff your
                revenue operation needs. Here is how to decide — every prospect gets this before they buy.
              </p>
              <ComparisonTable columns={LEDGER_COLUMNS} rows={LEDGER_ROWS} />
            </div>
          </section>
        </Reveal>

        {/* 06 — Founder */}
        <Reveal>
          <section className="home-section">
            <div className="home-container home-founder">
              <div className="home-founder__photo">
                <Image
                  src="/jason.png"
                  alt="Jason Manuel, founder of COAI, in Bakersfield"
                  fill
                  sizes="(max-width: 900px) 100vw, 360px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
              </div>
              <div className="home-founder__copy">
                <span className="home-eyebrow">Who builds it</span>
                <h2 className="home-h2">A contractor who codes.</h2>
                <p>
                  Jason Manuel founded COAI. Before building websites and lead systems he spent nine years as
                  a licensed building contractor in Florida, running multi-trade residential projects,
                  coordinating plumbing, electrical, HVAC, and framing crews, and owning the P&amp;L.
                </p>
                <p>
                  That is why the system has fallbacks. Field calls arrive while your hands are occupied. An
                  automation without a human path behind it is not a fix — it is a new way to fail. Every
                  control we install has a named person it escalates to.
                </p>
                <p>
                  You get his name and his direct line. No account manager, no gatekeepers, no AI persona
                  standing in for a person.
                </p>
                <div className="home-founder__actions">
                  <Button href={`tel:${CONTACT.phoneE164}`} variant="secondary">
                    {CONTACT.phoneDisplay}
                  </Button>
                  <Button href="/about" variant="ghost">
                    More about Jason
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 07 — Reviews — verbatim, attributed, linked. No paraphrase. */}
        <Reveal>
          <section className="home-section">
            <div className="home-container">
              <span className="home-eyebrow">In their words</span>
              <h2 className="home-h2">Direct quotes, or none.</h2>
              <p className="home-lede">
                These are copied word for word from the{" "}
                <a href={GOOGLE_BUSINESS_PROFILE_URL} rel="noopener noreferrer" target="_blank">
                  Google Business Profile
                </a>
                . We do not summarize, rewrite, or add outcomes the reviewer did not describe.
              </p>
              <div className="home-grid-3">
                {CLIENT_REVIEWS.map((review) => (
                  <Card key={review.author}>
                    <blockquote className="home-review__body">&ldquo;{review.body}&rdquo;</blockquote>
                    <div className="home-review__author">{review.author}</div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* 08 — Master Glass testimonial with audio */}
        <Reveal>
          <section className="home-section">
            <div className="home-container">
              <span className="home-eyebrow">Recent Project</span>
              <h2 className="home-h2">
                <span className="m-text-steel">Master Glass Solutions</span> — Texas commercial glazing
              </h2>
              <p className="home-lede">
                <a href="https://mgsusa.llc" target="_blank" rel="noopener noreferrer" className="m-text-steel">
                  mgsusa.llc ↗
                </a> — full call-first website build with embedded audio testimonial, service-area pages, and missed-call recovery.
              </p>
              <div className="home-testimonial-audio">
                <div className="m-testimonial-player">
                  <audio
                    controls
                    src="/master-glass-testimonial.wav"
                    preload="none"
                  >
                    <a href="/master-glass-testimonial.wav">Download audio testimonial (MP3)</a>
                  </audio>
                  <div className="m-testimonial-label">
                    Master Glass Solutions — voice testimonial
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* 09 — Final CTA */}
        <Reveal>
          <section className="home-section home-section--inverse">
            <div className="home-container home-container--narrow home-cta">
              <span className="home-eyebrow">Start here</span>
              <h2 className="home-h2">
                Get your job-call leak score.
              </h2>
              <p className="home-lede home-lede--spaced">
                One page. Three observed leaks on your actual site and Google profile, the assumptions behind
                each one, screenshots, and the one control we would install first. Back in 24 to 48 hours. You
                keep the scorecard either way.
              </p>
              <a className="home-cta__phone" href={`tel:${CONTACT.phoneE164}`}>
                {CONTACT.phoneDisplay}
              </a>
              <div className="home-cta__actions">
                <Button href="/intake" variant="primary" size="lg">
                  Get my leak score
                </Button>
                <Button href="/pricing" variant="inverse" size="lg">
                  See what it costs
                </Button>
              </div>
              <div className="home-cta__chat-row">
                <span className="home-cta__chat-icon" aria-hidden="true">◉</span>
                <span className="home-cta__chat-text">
                  Want answers before you call? Click the <strong>Cipher</strong> button in the corner — it&apos;s COAI&apos;s AI assistant and it can walk you through every part of the system.
                </span>
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <Footer />

      <div className="home-sticky">
        <Button href={`tel:${CONTACT.phoneE164}`} variant="inverse" block>
          Call Jason
        </Button>
        <Button href="/intake" variant="primary" block>
          Leak score
        </Button>
        <button type="button" className="home-sticky__chat" aria-label="Chat with Cipher AI">
          <span className="home-sticky__chat-dot" />
          Chat with Cipher
        </button>
      </div>
    </div>
  );
}
