import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { FOUNDER, LEGAL_NAME } from "@/lib/site";
import { BreachVisualizer } from "@/components/BreachVisualizer";
import { GoogleBusinessLink } from "@/components/GoogleBusinessLink";

export function Hero() {
  return (
    <section className="panel">
      <p className="blueprint-subhead mono">Bakersfield Cipher Diagnostic Interface</p>
      <h1 className="hero-title">Structural Digital Audit Engine</h1>
      <div className="hero-plain">
        <p style={{ marginBottom: 0 }}>
          <strong>{LEGAL_NAME}</strong> helps Bakersfield and 661-area operators fix slow pages, broken schema, and
          visibility leaks before ad spend. We run structural audits and AEO/GEO-ready systems so search engines and AI
          surfaces can read your business clearly.
        </p>
      </div>
      <p className="muted">
        Outcome first: faster load paths, cleaner machine-readable entities, and a single conversion funnel designed to
        capture qualified owners.
      </p>
      <div className="hero-visual panel">
        <p className="mono hero-visual-title">BREACH VIEW: VISIBILITY LEAK DETECTED</p>
        <p className="muted">
          A layered schema structure is ruptured. Green diagnostic light marks where ranking authority and lead flow
          escape the system.
        </p>
        <div className="hero-visual-canvas-wrap" aria-hidden="true">
          <BreachVisualizer intensity={1} />
        </div>
      </div>
      <div className="trust-strip">
        <p className="mono" style={{ marginTop: 0 }}>
          Trust signal
        </p>
        <p>
          Founded by <strong>{FOUNDER.name}</strong>. Proof in <Link href="/portfolio">case studies</Link>, answers on
          the <Link href="/faq">FAQ</Link>, and{" "}
          <GoogleBusinessLink>Google Business</GoogleBusinessLink> for hours and directions. Leads still route through
          the audit workflow first.
        </p>
        <ul className="trust-bullets mono">
          <li>Target response: sub-3 second diagnostic feedback path</li>
          <li>Entity alignment: LocalBusiness + ProfessionalService schema layers</li>
        </ul>
      </div>
      <AuditForm />
      <div className="hero-cta-row">
        <Link className="btn btn-primary" href="/intake">
          Run My Growth Diagnostic
        </Link>
        <Link className="btn btn-ghost" href="/pricing">
          View Pricing
        </Link>
        <Link className="btn btn-ghost" href="/services">
          Services
        </Link>
      </div>
    </section>
  );
}
