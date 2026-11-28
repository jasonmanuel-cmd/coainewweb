import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, PhoneIncoming, Search, Workflow, ShieldCheck, ChartNoAxesCombined } from "lucide-react";
import { CONTACT, SITE_URL, ORG_ID } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { LAUNCH_OFFERS, LAUNCH_FAQS } from "@/lib/coai-launch";
import { RevenueCalculator } from "@/components/revamp/RevenueCalculator";

export const metadata: Metadata = {
 title: "Intelligent Business Infrastructure for Service Businesses",
 description: "COAI finds and repairs gaps in websites, customer inquiries and follow-up. Three clear solutions for Bakersfield, Kern County and nationwide service businesses.",
 alternates: { canonical: "/" }
};

export default function HomePage() {
 return <main id="main-content" className="coai-launch">
  <JsonLd data={{"@context":"https://schema.org","@type":"OfferCatalog",name:"COAI business infrastructure solutions",url:SITE_URL+"/#solutions",itemListElement:LAUNCH_OFFERS.map(o=>({"@type":"Offer",name:o.name,description:o.description+" "+o.billing,url:SITE_URL+"/#"+o.id,itemOffered:{"@type":"Service",name:o.name,provider:{"@id":ORG_ID}}}))}} />
  <section className="cl-hero">
   <div className="cl-shell cl-hero-grid">
    <div><p className="cl-eyebrow">INTELLIGENT BUSINESS INFRASTRUCTURE</p>
    <h1>Stop losing the customers you&apos;ve already earned.</h1>
    <p className="cl-lede">Missed calls. Broken websites. Unanswered inquiries. COAI finds where your business is losing opportunities, fixes the gaps and helps keep the system running.</p>
    <div className="cl-actions"><Link className="cl-button" href="/intake">Find My Revenue Leaks <ArrowRight size={18} aria-hidden /></Link><a className="cl-button cl-outline" href="#solutions">Explore solutions</a></div>
    <p className="cl-location">Bakersfield &amp; Kern County · Remote services nationwide</p></div>
    <aside className="cl-flow" aria-label="Illustrative connected customer journey"><span className="cl-flow-label">THE CONNECTED CUSTOMER JOURNEY</span>
    {[["01","Discover","Make your business easier to find"],["02","Convert","Give customers a clear next step"],["03","Capture","Route calls and forms to your team"],["04","Recover","Follow up on eligible missed inquiries"],["05","Optimize","Measure and improve the workflow"]].map(([number,title,detail])=><div className="cl-flow-row" key={number}><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div><ArrowRight size={16} aria-hidden /></div>)}
    <p>Illustrative workflow · configured to your business</p></aside>
   </div>
  </section>
  <section className="cl-shell cl-section" id="process"><p className="cl-kicker">HOW WE WORK</p><h2>Find the leak. Fix the leak. Run the system.</h2>
   <div className="cl-three">{[{icon:Search,title:"Find the leak",text:"Follow the journey from search to website to call or quote. Identify actual problems and establish a baseline."},{icon:Workflow,title:"Fix the leak",text:"Repair the agreed issues and connect the right tools. Test the customer journey before handoff."},{icon:ChartNoAxesCombined,title:"Run the system",text:"Monitor the agreed workflows, report measurable activity and improve what is actually working."}].map(({icon:Icon,title,text})=><article className="cl-process" key={title}><Icon size={30} aria-hidden/><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>
  <section className="cl-band" id="solutions"><div className="cl-shell cl-section"><p className="cl-kicker">THREE SOLUTIONS</p><h2>Clear scope. Transparent pricing.</h2><p className="cl-intro">Start with a diagnosis or discuss an implementation that fits your business. No purchase is made by submitting an inquiry.</p>
   <div className="cl-three cl-offers">{LAUNCH_OFFERS.map(o=><article className={"cl-card"+(o.id==="revenue-engine"?" cl-core":"")} key={o.id} id={o.id}><p className="cl-stage">{o.stage}{o.id==="revenue-engine"?" · Core offer":""}</p><h3>{o.name}</h3><strong className="cl-price">{o.price}</strong><p className="cl-billing">{o.billing}</p><p>{o.description}</p><ul>{o.includes.map(i=><li key={i}><Check size={18} aria-hidden/><span>{i}</span></li>)}</ul><Link className="cl-button" href={o.pkg?"/intake?pkg="+o.pkg:"/intake"}>{o.cta}<ArrowRight size={17} aria-hidden/></Link></article>)}</div>
   <p className="cl-fine">Written scope, usage limits, third-party charges and payment milestones are confirmed before work begins. Communications features require applicable consent and carrier approval. Additional work is separately quoted.</p></div></section>
  <section className="cl-shell cl-section cl-split" id="calculator"><div><p className="cl-kicker">THE COST OF DOING NOTHING</p><h2>What could a missed call be worth?</h2><p>Use your own numbers to estimate revenue at risk. We verify real inquiries and workflows instead of promising sales we cannot attribute.</p></div><div className="cl-calculator"><RevenueCalculator /></div></section>
  <section className="cl-band"><div className="cl-shell cl-section cl-split"><div><p className="cl-kicker">BUILT FOR SERVICE BUSINESSES</p><h2>Practical systems for people doing real work.</h2><p>HVAC, plumbing, roofing, electrical, hauling, automotive and other appointment- or quote-based businesses.</p></div><div className="cl-trust"><ShieldCheck size={32} aria-hidden/><h3>Accountability before automation.</h3><p>We define the scope, test agreed integrations, document handoff and disclose usage costs. No guaranteed rankings or earnings.</p><Link href="/privacy">Privacy and data handling</Link></div></div></section>
  <section className="cl-shell cl-section" id="faq"><p className="cl-kicker">QUESTIONS</p><h2>Know what you&apos;re buying.</h2><div className="cl-faq">{LAUNCH_FAQS.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <section className="cl-end" id="contact"><div className="cl-shell cl-section"><p className="cl-eyebrow">START HERE</p><h2>Find out what is costing you opportunities.</h2><p>Tell us about your business. We will confirm the right scope, pricing and next steps before you commit.</p><div className="cl-actions"><Link className="cl-button" href="/intake">Request a diagnostic <ArrowRight size={18} aria-hidden/></Link><a className="cl-button cl-outline" href={"tel:"+CONTACT.phoneE164}><PhoneIncoming size={18} aria-hidden/> {CONTACT.phoneDisplay}</a></div><a href={"mailto:"+CONTACT.email}>{CONTACT.email}</a></div></section>
 </main>;
}
