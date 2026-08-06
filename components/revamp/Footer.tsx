import Image from "next/image";
import Link from "next/link";
import { BUSINESS_HOURS_LABEL, CONTACT, LEGAL_NAME } from "@/lib/site";
import "./chrome.css";

const LEGAL_LINKS = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/sms-terms", "SMS terms"],
  ["/ai-disclosure", "AI disclosure"]
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-col">
          <Image
            src="/newlogo.png"
            alt="COAI"
            width={100}
            height={28}
            className="site-footer__logo"
          />
          <p className="site-footer__tagline">
            {LEGAL_NAME} — {CONTACT.city}, {CONTACT.region} · Remote
          </p>
        </div>

        <div className="site-footer__contact-col">
          <div className="site-footer__contact-row">
            <span className="site-footer__contact-label">Hours</span>
            <span className="site-footer__contact-val">{BUSINESS_HOURS_LABEL}</span>
          </div>
          <div className="site-footer__contact-row">
            <span className="site-footer__contact-label">Phone</span>
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
          </div>
          <div className="site-footer__contact-row">
            <span className="site-footer__contact-label">Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div className="site-footer__contact-row">
            <span className="site-footer__contact-label">Address</span>
            <span className="site-footer__contact-val">{CONTACT.locationLabel}</span>
          </div>
        </div>

        <div className="site-footer__legal-col">
          <span className="site-footer__note">
            &copy; {new Date().getFullYear()} {LEGAL_NAME}
          </span>
          <div className="site-footer__legal">
            {LEGAL_LINKS.map(([href, label]) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
