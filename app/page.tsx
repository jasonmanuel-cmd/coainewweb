import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, MessageSquareText, PhoneIncoming, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { RevenueCalculator } from "@/components/revamp/RevenueCalculator";
import { REVAMP_PROJECTS } from "@/components/revamp/revampData";
import { serviceJsonLd } from "@/lib/schema";
import { BUILD_PRICE, CONTINUITY_MONTHLY, CTA_BOOKING_URL, DELIVERY_TIMELINE, SITE_DESCRIPTION, formatUsd } from "@/lib/site";
import { SYSTEM_CAPABILITY_COUNT } from "@/lib/systems";

export const metadata: Metadata = {
  title: "AI Lead Response Systems for Contractors",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" }
};

const proofMarks = ["PHIL’S", "EDWIN WARD", "SIGNATURE 954", "HOME GROW MONEY", "WILLAM DEAN", "POISON WELL", "MASTER GLASS"];

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
  ["Is this another chatbot?", "No. A chatbot is one interface. COAI connects response, qualification, booking, follow-up, and reporting into an owned revenue system built around how your business already works."],
  ["Do I need to replace my current tools?", "Usually not. We connect to the tools you already rely on where practical, then fill the gaps that cause slow response, dropped handoffs, and forgotten follow-up."],
  ["How quickly can we launch?", `Standard turnaround is ${DELIVERY_TIMELINE} from signed scope, depending on access, integrations, and approval speed. You receive a clear deployment plan before work begins.`],
  ["What happens after launch?", `Thirty days of optimization are included. After that, Revenue Continuity is an optional ${formatUsd(CONTINUITY_MONTHLY)}/month for monitoring, testing, and one monthly improvement priority—or you can keep the delivered system without an ongoing retainer.`]
];

export default function HomePage() {
  return (
    <main id="main-content" className="cinematic-home">
      <JsonLd data={serviceJsonLd("TradeCall Revenue Infrastructure Build", SITE_DESCRIPTION, "/", BUILD_PRICE)} />

      <section className="cinematic-hero" aria-labelledby="hero-title">
        <Image
          className="cinematic-hero-art"
          src="/coai-command-grid.jpg"
          alt=""
          fill
          priority
          quality={88}
          sizes="100vw"
        />
        <div className="cinematic-hero-shade" aria-hidden="true" />
        <div className="cinematic-hero-grid" aria-hidden="true" />
        <div className="cinematic-container cinematic-hero-inner">
          <div className="cinematic-hero-copy">
            <span className="revamp-kicker"><i aria-hidden="true" /> Revenue infrastructure for local service businesses</span>
            <h1 id="hero-title">The job is yours.<br /><em>Answer first.</em></h1>
            <p className="cinematic-hero-lede">The website is one piece. COAI builds the systems around it to catch the inquiry, clarify the job, and keep the next action moving.</p>
            <div className="cinematic-hero-actions">
              <Link className="revamp-btn-primary" href={CTA_BOOKING_URL}>
                Get your job-call leak score <ArrowUpRight aria-hidden="true" />
              </Link>
              <a className="revamp-btn-ghost" href="#system">See the system <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="cinematic-hero-trust" aria-label="Offer highlights">
              <span><Check aria-hidden="true" /> {DELIVERY_TIMELINE} standard turnaround</span>
              <span><Check aria-hidden="true" /> 30-day optimization</span>
              <span><Check aria-hidden="true" /> You own the build</span>
            </div>
          </div>

          <aside className="dispatch-panel" aria-label="Example lead response workflow">
            <div className="dispatch-header">
              <div>
                <span className="dispatch-label">Example workflow</span>
                <strong>Lead → Booked</strong>
              </div>
              <span className="dispatch-live"><i aria-hidden="true" /> Active</span>
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
              <span className="dispatch-value">Complete</span>
            </div>
          </aside>
        </div>
        <a className="cinematic-scroll-cue" href="#proof"><span>Scroll to proof</span><i aria-hidden="true" /></a>
      </section>

      <section className="proof-rail" id="proof" aria-labelledby="proof-title">
        <div className="cinematic-container">
          <span className="section-micro" id="proof-title">Systems deployed for teams at</span>
          <div className="proof-marks">
            {proofMarks.map((mark) => <span key={mark}>{mark}</span>)}
          </div>
          <div className="proof-stats">
            <div><strong>{formatUsd(BUILD_PRICE)}</strong><span>flat flagship build</span></div>
            <div><strong>7</strong><span>public project links</span></div>
            <div><strong>30 days</strong><span>optimization included</span></div>
            <div><strong>100%</strong><span>ownership transferred</span></div>
          </div>
        </div>
      </section>

      <section className="revenue-section cinematic-section">
        <div className="cinematic-container revenue-layout">
          <div className="section-heading section-heading-sticky">
            <span className="section-index">[ 01 / REVENUE LEAK ]</span>
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
              <span className="section-index">[ 02 / THE SYSTEM ]</span>
              <h2 id="system-title">Catch the inquiry. Convert the guest. Keep the relationship.</h2>
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

      <section className="portfolio-section cinematic-section" aria-labelledby="portfolio-title">
        <div className="cinematic-container">
          <div className="section-heading section-heading-wide">
            <div><span className="section-index">[ 03 / FIELD PROOF ]</span><h2 id="portfolio-title">Built systems. Live URLs. Real operators.</h2></div>
            <Link className="text-link" href="/portfolio">View all seven projects <ArrowUpRight aria-hidden="true" /></Link>
          </div>
          <div className="case-grid">
            {REVAMP_PROJECTS.slice(0, 3).map((project, index) => (
              <article className="case-card" key={project.href}>
                <div className="case-card-visual">
                  <span className="case-number">0{index + 1}</span>
                  <span className="case-monogram">{project.logo}</span>
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
          </div>
        </div>
      </section>

      <section className="ownership-section cinematic-section" aria-labelledby="ownership-title">
        <div className="cinematic-container ownership-layout">
          <div className="ownership-copy">
            <span className="section-index">[ 04 / OWNERSHIP ]</span>
            <ShieldCheck aria-hidden="true" />
            <h2 id="ownership-title">No hostage tech.<br />No mystery fees.</h2>
            <p>You receive the delivered assets, workflow map, operating documentation, and access required to run what you paid for.</p>
          </div>
          <div className="ownership-ledger">
            <div><span>System build</span><strong>{formatUsd(BUILD_PRICE)}</strong></div>
            <div><span>Optimization period</span><strong>30 days included</strong></div>
            <div><span>Revenue Continuity</span><strong>{formatUsd(CONTINUITY_MONTHLY)}/mo · optional</strong></div>
            <div><span>Contract lock-in</span><strong>None</strong></div>
            <div><span>Your ownership</span><strong className="ledger-pass"><Check aria-hidden="true" /> Confirmed</strong></div>
            <Link href="/pricing">Review the full offer <ArrowRight aria-hidden="true" /></Link>
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
            <span className="section-index">[ 05 / STRAIGHT ANSWERS ]</span>
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
