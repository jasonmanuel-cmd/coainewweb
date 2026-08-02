import type { Metadata } from "next";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { OFFERS, ORG_ID, SITE_URL, THIRD_PARTY_COSTS } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

const HOME_DESCRIPTION =
  "COAI installs a call-first website, instant missed-call response, Google Business Profile cleanup, and lead routing you own — for Bakersfield contractors. TradeCall Build, $1,997 flat.";

export const metadata: Metadata = {
  title: "Fix the leak — revenue infrastructure for Bakersfield contractors | COAI",
  description: HOME_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "When you miss the call, you miss the job. Fix the leak.",
    description: HOME_DESCRIPTION,
    url: SITE_URL
  },
  other: {
    author: "Jason Robert Manuel",
    "article:published_time": "2026-01-15",
    "article:modified_time": "2026-08-02"
  }
};

const homeArticle = articleJsonLd({
  headline: "TradeCall Revenue Infrastructure Build | COAI Bakersfield",
  description:
    "COAI installs the revenue intake layer for Bakersfield contractors: a call-first website, one aligned business identity, Google Business Profile cleanup, missed-call text-back, lead routing, and a documented ownership handoff.",
  path: "/",
  datePublished: "2026-01-15",
  dateModified: "2026-08-02"
});

/**
 * Every answer here must be independently checkable. No statistics without a
 * cited source, no performance or outcome claims, no prices that disagree with
 * OFFERS in lib/site.ts — this text is emitted as structured data and gets
 * quoted verbatim by AI search engines.
 */
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does it cost to work with COAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `The ${OFFERS.tradecall.name} is ${OFFERS.tradecall.price} flat — ${OFFERS.tradecall.terms}. A bilingual English/Spanish build adds ${OFFERS.tradecall.bilingual}. ${OFFERS.continuity.name} is an optional ${OFFERS.continuity.price} per month, cancel anytime. The ${OFFERS.scorecard.name} is free for qualified owner-operators; otherwise it is a $350 Structural Audit, credited to the build.`
      }
    },
    {
      "@type": "Question",
      name: "Are there monthly fees or retainers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `No mandatory retainer. The build is a one-time fixed-price engagement. Two recurring costs continue after launch and are paid by you directly to the vendor, never to COAI: ${THIRD_PARTY_COSTS.map((c) => `${c.item.toLowerCase()} at ${c.cost} (${c.paidTo})`).join(", and ")}. Revenue Continuity is optional.`
      }
    },
    {
      "@type": "Question",
      name: "What is not included in the build price?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ad spend, custom integrations, ongoing content beyond the agreed scope, carrier and SMS usage fees, hosting, advanced CRM migration, and around-the-clock human dispatch are not included. Actual third-party costs are listed before you sign."
      }
    },
    {
      "@type": "Question",
      name: "How long does a build take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two to three weeks from signed scope to live deployment. Every milestone has a staging link so you can see the work as it happens."
      }
    },
    {
      "@type": "Question",
      name: "Who owns the website after it is built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. You control the domain registrar, hosting account, source code repository, analytics, Search Console, Google Business Profile, and all lead data. COAI deploys into your accounts, documents the setup, and hands over admin access. There is no platform lock-in."
      }
    },
    {
      "@type": "Question",
      name: "How does missed-call text-back work with my existing number?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your published number stays yours. Calls that go unanswered trigger an automatic text back to the caller and a task for you. An automated acknowledgement is not the same as a human response — the system is configured so an unhandled lead escalates to a named person."
      }
    },
    {
      "@type": "Question",
      name: "What tech stack do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Next.js with TypeScript, deployed on Vercel. You receive full source access and written handoff documentation. No proprietary platforms and no locked-in systems."
      }
    }
  ]
};

const tradecallProduct = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: OFFERS.tradecall.name,
  description: OFFERS.tradecall.summary,
  brand: { "@id": ORG_ID },
  offers: {
    "@type": "Offer",
    price: OFFERS.tradecall.priceNumeric,
    priceCurrency: "USD",
    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
    availability: "https://schema.org/InStock"
  }
};

export default function Home() {
  const crumbs = breadcrumbJsonLd([{ name: "Home", path: "/" }]);
  const tradecallService = serviceJsonLd(
    OFFERS.tradecall.name,
    `${OFFERS.tradecall.summary} ${OFFERS.tradecall.price} flat.`
  );

  return (
    <>
      <JsonLd data={homeArticle} />
      <JsonLd data={homeFaqSchema} />
      <JsonLd data={crumbs} />
      <JsonLd data={tradecallService} />
      <JsonLd data={tradecallProduct} />
      <LandingHomeRevamp />
    </>
  );
}
