import Image from "next/image";
import Link from "next/link";
import { BUSINESS_HOURS_LABEL, CONTACT, PRIMARY_EMAIL, SITE_NAME, SITE_URL, SOCIAL_LINKS } from "@/lib/site";

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

const socialIcons = {
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  )
} as const;

export function RevampFooter() {
  return (
    <footer className="revamp-footer">
      <div className="revamp-footer-cta">
        <div>
          <span className="revamp-kicker"><i aria-hidden="true" /> Deployment window open</span>
          <h2>Ready for a website that looks as good as your work?</h2>
        </div>
        <Link href="/website-design" className="revamp-btn-primary revamp-btn-light">
          Plan your website build <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div className="revamp-footer-grid">
        <div className="revamp-footer-brand">
          <Link className="revamp-footer-logo" href="/" aria-label="Chaotically Organized AI — home">
            <Image src="/coai-logo.webp" alt="Chaotically Organized AI" width={910} height={741} sizes="220px" />
          </Link>
          <p>AI-powered lead response and follow-up infrastructure for local service businesses.</p>
          <div className="revamp-footer-status"><i aria-hidden="true" /> Systems online · Bakersfield, California</div>
          <ul className="revamp-footer-social" aria-label="Social profiles">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} target="_blank" rel="noopener noreferrer me" aria-label={link.label} title={link.label}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    {socialIcons[link.id]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
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
          <a className="revamp-footer-phone" href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
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
