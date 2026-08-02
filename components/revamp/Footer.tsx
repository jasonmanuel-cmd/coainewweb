import Image from "next/image";
import Link from "next/link";
import { BUSINESS_HOURS_LABEL, CONTACT, LEGAL_NAME } from "@/lib/site";
import "./chrome.css";

const COLUMNS = [
  {
    title: "What we install",
    links: [
      ["/services", "Services"],
      ["/pricing", "Pricing"],
      ["/portfolio", "Portfolio"],
      ["/website-design", "Website design"]
    ]
  },
  {
    title: "Company",
    links: [
      ["/about", "About Jason"],
      ["/faq", "FAQ"],
      ["/contact", "Contact"],
      ["/intake", "Get my leak score"]
    ]
  }
] as const;

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
        <div>
          <Image
            src="/newlogo.png"
            alt="COAI"
            width={100}
            height={28}
            style={{ objectFit: "contain", width: "auto", height: "28px" }}
          />
          <p className="site-footer__tagline">
            Industrial-strength revenue infrastructure for Bakersfield contractors. Call-first website,
            missed-call response, Google Business cleanup, and lead routing you own.
          </p>
          <address className="site-footer__address">
            {CONTACT.city}, {CONTACT.region}
            <br />
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </address>
          <p className="site-footer__note">
            {BUSINESS_HOURS_LABEL}. We work remotely and meet clients on site or by call — there is no
            walk-in office. This is our only company phone number; any other number in our material is a
            product demo line.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title} className="site-footer__col">
            <h4 className="site-footer__col-title">{col.title}</h4>
            <ul>
              {col.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="site-footer__bottom">
        <span>
          &copy; {new Date().getFullYear()} {LEGAL_NAME} &middot; {CONTACT.city}, {CONTACT.region}
        </span>
        <div className="site-footer__legal">
          {LEGAL_LINKS.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
