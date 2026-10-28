import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, MessageSquareText, PhoneIncoming, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { HeroParticleField } from "@/components/revamp/HeroParticleField";
import { HeroSignalField } from "@/components/revamp/HeroSignalField";
import { RevenueCalculator } from "@/components/revamp/RevenueCalculator";
import { SpotlightGrid } from "@/components/revamp/SpotlightGrid";
import { ZoomableScreenshot } from "@/components/revamp/ZoomableScreenshot";
import { REVAMP_PROJECTS } from "@/components/revamp/revampData";
import { serviceJsonLd } from "@/lib/schema";
import { PackageCards } from "@/components/marketing/PackageCards";
import { ADDON_COUNT, PACKAGES, getAddOn } from "@/lib/pricing";
import { BUILD_PRICE, DELIVERY_TIMELINE, SITE_DESCRIPTION, formatUsd } from "@/lib/site";
import { PORTFOLIO_STATS, countWord } from "@/lib/portfolio-stats";
import { SYSTEM_CAPABILITY_COUNT } from "@/lib/systems";

const HOME_PAGE_DESCRIPTION =
  "Custom, hand-coded websites and the systems around them—local search, AI answer visibility, missed-call text-back, booking, and follow-up—for Bakersfield and Kern County businesses, with full ownership.";

export const metadata: Metadata = {
  title: "Custom Websites & Growth Systems for Local Businesses",
  description: HOME_PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Custom Websites & Growth Systems for Local Businesses",
    description: HOME_PAGE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Websites & Growth Systems for Local Businesses",
    description: HOME_PAGE_DESCRIPTION
  }
};

const proofMarks = ["ASPEN II HOMES", "HARBISON STANDARD", "THE PITTS", "T&M HAULING", "PHIL’S", "EDWIN WARD", "HOME GROW MONEY", "WILLAM DEAN", "POISON WELL", "MASTER GLASS"];

const workflow = [
  { time: "01", title: "Lead detected", detail: "Missed call · Service request", icon: PhoneIncoming },
  { time: "02", title: "Response sent", detail: "Approved message · Delivery confirmed", icon: Zap },
  { time: "03", title: "Job qualified", detail: "Urgency, ZIP and service captured", icon: MessageSquareText },
  { time: "04", title: "Estimate routed", detail: "Calendar path · Owner notified", icon: Check }
];

const systemCards = [
  { number: "01", title: "Catch", text: "Missed calls, forms, and booking attempts enter a visible response path instead of disappearing into voicemail or a shared inbox.", metric: "NO LOST HANDOFF", icon: PhoneIncoming, className: "is-cyan" },
  { number: "02", title: "Answer", text: "Approved replies and qualification questions capture the service, location, urgency, and details your team needs.", metric: "CLEAR RULES", icon: MessageSquareText, className: "is-orange" },
  { number: "03", title: "Convert", text: "Qualified requests move into the right calendar, estimate path, or human handoff—with the context attached.", metric: "ONE NEXT ACTION", icon: ArrowRight, className: "is-green" },
  { number: "04", title: "Keep", text: "Quote recovery, service reminders, review requests, and reactivation turn finished work into an operating relationship.", metric: "LIFECYCLE READY", icon: Clock3, className: "is-yellow" }
];

const faqs = [
  ["Is every website custom?", "Yes. Each build starts with your audience, offer, brand, and the action you want customers to take. The layout and code are shaped around your business—not dropped into a one-size-fits-all theme."],
  ["Is this another chatbot, and do I need to replace my tools?", "No. A chatbot is one interface; COAI connects response, qualification, booking, follow-up, and reporting into an owned revenue system. Where practical, we connect to tools you already use instead of replacing them."],
  ["Will I own my website?", "Yes. Your agreed handoff includes the website assets, code, account access, and operating documentation needed to run the build. You are not locked into a COAI-only platform."],
  ["How quickly can we launch?", `The standard website build takes ${DELIVERY_TIMELINE} from signed scope, depending on content, access, integrations, and approval speed. Systems added through a package are scoped with their own timeline in the written plan, and you receive it before work begins.`],
  ["What happens after launch?", `Thirty days of post-launch fixes are included with every website. After that, optional website care plans start at ${getAddOn("care-basic").price} per month—or you can keep the delivered site with no ongoing retainer. Systems that run continuously, like a CRM or follow-up, show their monthly cost up front.`]
];

// Hero layer note: the decorative watermark is deliberately an Image, not a CSS
// background. A background image can only be discovered after the render-blocking CSS
// has been fetched and parsed, which put it on a strictly longer critical path than the
// hero art and dominated simulated LCP. As an Image the browser sees it in the HTML and
// fetches it in parallel.
export default function HomePage() {
  return (
    <main id="main-content" className="cinematic-home">
      <JsonLd data={serviceJsonLd("Custom Website Design & Growth Systems", SITE_DESCRIPTION, "/", BUILD_PRICE)} />

      <section className="cinematic-hero" aria-labelledby="hero-title">
        <Image
          className="cinematic-hero-art"
          src="/coai-command-grid.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={88}
          sizes="100vw"
        />
        <Image className="cinematic-hero-mark" src="/coai-mark.webp" alt="" width={512} height={512} priority aria-hidden="true" />
        <div className="cinematic-hero-shade" aria-hidden="true" />
        <div className="cinematic-hero-grid" aria-hidden="true" />
        <HeroParticleField />
        <HeroSignalField />
        <div className="cinematic-container cinematic-hero-inner">
          <div className="cinematic-hero-copy">
            <span className="revamp-kicker"><i aria-hidden="true" /> Custom websites + growth systems for local businesses</span>
            <h1 id="hero-title">Built to stand out.<br /><em>Designed to convert.</em></h1>
            <p className="cinematic-hero-lede">Custom websites with a point of view—and a clear path to the next customer. COAI pairs fast, search-ready design with the systems that win the job and keep the customer: missed-call text-back, booking, follow-up, reviews, and reporting.</p>
            <div className="cinematic-hero-actions">
              <Link className="revamp-btn-primary" href="/intake?pkg=website">
                Discuss my website <ArrowUpRight aria-hidden="true" />
              </Link>
              <Link className="revamp-btn-ghost" href="/pricing#packages">See packages and prices <ArrowRight aria-hidden="true" /></Link>
            </div>
            <div className="cinematic-hero-trust" aria-label="Website build highlights">
              <span><Check aria-hidden="true" /> Custom, never cookie-cutter</span>
              <span><Check aria-hidden="true" /> Mobile-first + search-ready</span>
              <span><Check aria-hidden="true" /> You own the code + keys</span>
            </div>
          </div>

          <aside className="dispatch-panel" aria-label="Example lead response workflow">
            <div className="dispatch-header">
              <div>
                <span className="dispatch-label">Example workflow</span>
                <strong>Inquiry → Owner handoff</strong>
              </div>
              <span className="dispatch-live"><i aria-hidden="true" /> Example</span>
            </div>
            <div className="dispatch-events">
              {workflow.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div className="dispatch-event" key={event.title} style={{ "--event-delay": `${index * 0.55}s` } as React.CSSProperties}>
                    <span className="dispatch-event-icon"><Icon aria-hidden="true" /></span>
                    <div><strong>{event.title}</strong><small>{event.detail}</small></div>
                    <time>{event.time}</time>
                  </div>
                );
              })}
            </div>
            <div className="dispatch-result">
              <span>Qualified handoff</span>
              <strong>Estimate request routed</strong>
              <span className="dispatch-value">COMPLETE</span>
            </div>
          </aside>
        </div>
        <a className="cinematic-scroll-cue" href="#proof"><span>See the proof</span><i aria-hidden="true" /></a>
      </section>

      <section className="proof-rail" id="proof" aria-labelledby="proof-title">
        <div className="cinematic-container">
          <span className="section-micro" id="proof-title">Selected brands, built with purpose</span>
          <div className="proof-marks">
            {proofMarks.map((mark) => <span key={mark}>{mark}</span>)}
          </div>
          <div className="proof-stats">
            <div><strong>{formatUsd(BUILD_PRICE)}</strong><span>custom website, flat</span></div>
            <div><strong>{PORTFOLIO_STATS.projectCount}</strong><span>public project links</span></div>
            <div><strong>30 days</strong><span>post-launch fixes included</span></div>
            <div><strong>100%</strong><span>ownership transferred</span></div>
          </div>
        </div>
      </section>

      <section className="portfolio-section cinematic-section" id="portfolio" aria-labelledby="portfolio-title">
        <div className="cinematic-container">
          <div className="section-heading section-heading-wide">
            <div><span className="section-index">[ 01 / SELECTED BUILDS ]</span><h2 id="portfolio-title">Different businesses. Distinct digital storefronts.</h2></div>
            <Link className="text-link" href="/portfolio">View all {countWord(PORTFOLIO_STATS.projectCount)} builds <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <SpotlightGrid className="case-grid spotlight-grid">
            {REVAMP_PROJECTS.slice(0, 4).map((project, index) => (
              <article className="case-card spotlight-card" data-spotlight-card="" key={project.href}>
                <div className={`case-card-visual ${project.previewImage ? "case-card-visual--screenshot" : ""}`}>
                  {project.previewImage ? (
                    <Image
                      className="case-preview-image"
                      src={project.previewImage}
                      alt={project.previewAlt ?? `${project.title} website preview`}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 1100px) 100vw, 50vw"
                    />
                  ) : (
                    <span className="case-monogram">{project.logo}</span>
                  )}
                  <span className="case-number">0{index + 1} / SELECTED BUILD</span>
                  <span className="case-visual-caption">CUSTOM WEB BUILD · {project.category}</span>
                  <div className="case-scan" aria-hidden="true" />
                </div>
                <div className="case-card-copy">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="case-metric"><strong>{project.result}</strong><span>{project.metric}</span></div>
                  <a href={project.href} target="_blank" rel="noreferrer">Open live project <ArrowUpRight aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </SpotlightGrid>
        </div>
      </section>

      <section className="lead-engine-section cinematic-section" aria-labelledby="lead-engine-title">
        <div className="cinematic-container lead-engine-layout">
          <div className="lead-engine-copy">
            <span className="section-index">[ PRODUCT / BUILT BY COAI ]</span>
            <p className="lead-engine-brand">COAI Lead Engine</p>
            <h2 id="lead-engine-title">Find the gap.<br /><em>Start the conversation.</em></h2>
            <p>
              A local prospecting tool built by COAI. Scan live Google Maps data by city and industry, qualify the
              businesses that need help, then prepare personalized outreach—all in one workflow.
            </p>
            <div className="lead-engine-actions">
              <a className="revamp-btn-primary" href="https://www.coaihq.online/" target="_blank" rel="noopener noreferrer">
                Explore the Lead Engine <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="revamp-btn-ghost" href="https://www.coaihq.online/app" target="_blank" rel="noopener noreferrer">
                Start free <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="lead-engine-promises" aria-label="Lead Engine highlights">
              <span><Check aria-hidden="true" /> First scan free</span>
              <span><Check aria-hidden="true" /> CSV export</span>
              <span><Check aria-hidden="true" /> Built-in CRM</span>
            </div>
          </div>
          <div className="lead-engine-panel" aria-label="COAI Lead Engine dashboard preview">
            <div className="lead-engine-panel-head">
              <div><span>COAI / PRODUCT 01</span><strong>Lead Engine dashboard</strong></div>
              <span className="lead-engine-status"><i aria-hidden="true" /> PRODUCT LIVE</span>
            </div>
            <ZoomableScreenshot
              className="lead-engine-image-frame"
              imageClassName="lead-engine-image"
              src="/projects/coai-lead-engine.webp"
              alt="COAI Lead Engine dashboard showing prospect filters, lead scores, and local business results"
              sizes="(max-width: 1000px) 100vw, 50vw"
            />
            <div className="lead-engine-tags" aria-label="Included capabilities">
              <span>LIVE MAPS DATA</span><span>LEAD SCORING</span><span>AI OUTREACH</span>
            </div>
          </div>
        </div>
      </section>

      <section className="revenue-section cinematic-section">
        <div className="cinematic-container revenue-layout">
          <div className="section-heading section-heading-sticky">
            <span className="section-index">[ 02 / REVENUE LEAK ]</span>
            <h2>Your marketing is working. Your response time isn’t.</h2>
            <p>Adjust the inputs to estimate what slow follow-up may be costing. This is directional—not a promise—but the leak is usually more expensive than the fix.</p>
          </div>
          <RevenueCalculator />
        </div>
      </section>

      <section className="system-section cinematic-section" id="system" aria-labelledby="system-title">
        <div className="cinematic-container">
          <div className="section-heading section-heading-wide">
            <div>
              <span className="section-index">[ 03 / THE SYSTEM ]</span>
              <h2 id="system-title">Catch the inquiry. Convert the customer. Keep the relationship.</h2>
            </div>
            <p>Every component has one business job. Modules are selected against a documented leak—not installed because the technology sounds impressive.</p>
          </div>
          <div className="system-grid">
            {systemCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className={`system-card ${card.className}`} key={card.title}>
                  <div className="system-card-top"><span>{card.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <strong>{card.metric}</strong>
                </article>
              );
            })}
          </div>
          <div className="system-catalog-link">
            <span>{SYSTEM_CAPABILITY_COUNT} scoped capabilities across six operating chapters.</span>
            <Link className="text-link" href="/systems">Explore the systems catalog <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="cinematic-section" id="packages" aria-labelledby="packages-title">
        <div className="cinematic-container">
          <div className="section-heading section-heading-wide">
            <div>
              <span className="section-index">[ 04 / PACKAGES ]</span>
              <h2 id="packages-title">Pick your starting point.<br />Build up from there.</h2>
            </div>
            <p>Every package starts with a custom website and adds the systems that win the job and keep the customer. Prices include the website; larger systems are scoped and fixed in writing before work begins.</p>
          </div>
          <PackageCards headingId="packages-title" compact />
          <div className="system-catalog-link">
            <span>Prefer one piece at a time? {ADDON_COUNT} add-ons, each priced.</span>
            <Link className="text-link" href="/pricing#addons">Compare packages and see every price <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="ownership-section cinematic-section" aria-labelledby="ownership-title">
        <div className="cinematic-container ownership-layout">
          <div className="ownership-copy">
            <span className="section-index">[ 05 / OWNERSHIP ]</span>
            <ShieldCheck aria-hidden="true" />
            <h2 id="ownership-title">No hostage tech.<br />No mystery fees.</h2>
            <p>You receive the delivered assets, workflow map, operating documentation, and access required to run what you paid for.</p>
          </div>
          <div className="ownership-ledger">
            <div><span>Custom Website Build</span><strong>{formatUsd(BUILD_PRICE)} flat</strong></div>
            <div><span>Packages, website included</span><strong>From {PACKAGES[0].total}</strong></div>
            <div><span>Post-launch fixes</span><strong>30 days included</strong></div>
            <div><span>Website care</span><strong>From {getAddOn("care-basic").price} · optional</strong></div>
            <div><span>Contract lock-in</span><strong>None</strong></div>
            <div><span>Your ownership</span><strong className="ledger-pass"><Check aria-hidden="true" /> Confirmed</strong></div>
            <Link href="/pricing">Review every price <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section cinematic-section" aria-labelledby="testimonial-title">
        <div className="cinematic-container">
          <span className="section-index">[ OPERATOR SIGNAL ]</span>
          <blockquote>
            <Sparkles aria-hidden="true" />
            <p id="testimonial-title">“Jason took the time to truly understand what our business needed, then built a system that made the whole operation feel more organized and intentional.”</p>
            <footer><strong>Shelly Graham</strong><span>Clear Choice Tax Solutions · Bakersfield</span></footer>
          </blockquote>
        </div>
      </section>

      <section className="faq-section cinematic-section" aria-labelledby="faq-title">
        <div className="cinematic-container faq-layout">
          <div className="section-heading section-heading-sticky">
            <span className="section-index">[ 06 / STRAIGHT ANSWERS ]</span>
            <h2 id="faq-title">Before you book.</h2>
            <p>Still comparing options? The complete FAQ covers integrations, security, support, and fit.</p>
            <Link className="text-link" href="/faq">Read every answer <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>0{index + 1}</span>{question}<i aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
