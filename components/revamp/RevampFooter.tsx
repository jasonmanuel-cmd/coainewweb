import Image from "next/image";
import Link from "next/link";
import { BUSINESS_HOURS_LABEL, CTA_BOOKING_URL, PRIMARY_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

const systemLinks = [
  ["Systems Catalog", "/systems"],
  ["Services", "/services"],
  ["Pricing", "/pricing"],
  ["Website Design", "/website-design"],
  ["Portfolio", "/portfolio"]
] as const;

const companyLinks = [
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["AI Disclosure", "/ai-disclosure"],
  ["Contact", "/contact"]
] as const;

export function RevampFooter() {
  return (
    <footer className="revamp-footer">
      <div className="revamp-footer-cta">
        <div>
          <span className="revamp-kicker"><i aria-hidden="true" /> Deployment window open</span>
          <h2>Ready to stop losing the calls you already paid to earn?</h2>
        </div>
        <Link href={CTA_BOOKING_URL} className="revamp-btn-primary revamp-btn-light">
          Get your leak score <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="revamp-footer-grid">
        <div className="revamp-footer-brand">
          <Link className="revamp-footer-logo" href="/" aria-label="Chaotically Organized AI — home">
            <Image src="/coai-logo.webp" alt="Chaotically Organized AI" width={910} height={741} sizes="220px" />
          </Link>
          <p>AI-powered lead response and follow-up infrastructure for local service businesses.</p>
          <div className="revamp-footer-status"><i aria-hidden="true" /> Systems online · Bakersfield, California</div>
        </div>

        <div className="revamp-footer-column">
          <h3>System</h3>
          {systemLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="revamp-footer-column">
          <h3>Company</h3>
          {companyLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </div>
        <div className="revamp-footer-column revamp-footer-contact">
          <h3>Direct line</h3>
          <a href={`mailto:${PRIMARY_EMAIL}`}>{PRIMARY_EMAIL}</a>
          <span>{BUSINESS_HOURS_LABEL}</span>
          <span>Bakersfield · Kern County · California</span>
        </div>
      </div>

      <div className="revamp-footer-bottom">
        <span>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <a href={`${SITE_URL}/sitemap.xml`}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
