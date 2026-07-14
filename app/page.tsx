import type { Metadata } from "next";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { SITE_URL, ORG_ID } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "COAI - Digital Lead Systems for Trades",
  description:
    "COAI builds custom digital lead systems for trades businesses. Sovereign websites, AI call recovery, and local SEO for more job calls. Free 20-min audit.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "COAI - Digital Lead Systems for Trades Businesses",
    description:
      "Sovereign websites with AI automation and local SEO — purpose-built for trades businesses to get more job calls.",
    url: SITE_URL,
  },
  other: {
    "author": "Jason Robert Manuel",
    "article:published_time": "2026-01-15",
    "article:modified_time": "2026-07-14",
  },
};

const homeArticle = articleJsonLd({
  headline: "TradeCall System — AI Lead Systems for Trades | COAI",
  description:
    "Chaotically Organized AI builds the TradeCall System for trades businesses in Bakersfield, CA: custom websites with AI call recovery, geo-targeted schema, and AEO content to generate more job calls.",
  path: "/",
  datePublished: "2026-01-15",
  dateModified: "2026-07-14",
});

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does it cost to work with COAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TradeCall System is $1,997 flat — $997 to start, $1,000 on launch day. That includes a custom-coded website plus missed-call auto text-back for trade businesses. Bilingual adds $400. Monthly maintenance at $197/mo is optional. The diagnostic call and proposal are free."
      }
    },
    {
      "@type": "Question",
      name: "Are there monthly fees or retainers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No mandatory retainers. Every build is a one-time fixed-price engagement. You own everything. Optional support is available but never required."
      }
    },
    {
      "@type": "Question",
      name: "How long does a build take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The TradeCall System completes in 2 to 3 weeks from signed scope to live deployment. Every milestone has a staging link so you can see it taking shape in real time."
      }
    },
    {
      "@type": "Question",
      name: "Who owns the website after it's built?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You own everything. The code, the domain, the hosting account, the customer data - all of it transfers to you at handoff. COAI retains no ongoing control or access."
      }
    },
    {
      "@type": "Question",
      name: "What is AEO and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AEO (Answer Engine Optimization) optimizes content so AI engines like ChatGPT, Claude, and Google AI Overviews cite your business in their answers. 70% of consumers now use ChatGPT for searches - if AI can't extract your business facts, you're invisible in the fastest-growing search channel."
      }
    },
    {
      "@type": "Question",
      name: "What tech stack do you use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build on Next.js with HTML, CSS, and JavaScript - deployed on Vercel or Netlify. You receive full code access and handoff documentation. No proprietary platforms, no locked-in systems."
      }
    }
  ]
};

const homeProductSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "TradeCall System",
    description: "All-in-one digital lead system for trades: custom-coded website with geo-targeted schema, AEO content, lead capture, AI phone answering with bilingual voice agents, missed-call text-back recovery, and automated lead scoring.",
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "1997",
      priceCurrency: "USD",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock"
    }
  }
];

export default function Home() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" }
  ]);
  const tradecallService = serviceJsonLd(
    "TradeCall System",
    "All-in-one digital lead system for trades: custom website with AI call recovery, geo-targeted schema, AEO content, and lead scoring. $1,997 flat."
  );
  return (
    <>
      <JsonLd data={homeArticle} />
      <JsonLd data={homeFaqSchema} />
      <JsonLd data={crumbs} />
      <JsonLd data={tradecallService} />
      {homeProductSchemas.map((s, i) => <JsonLd key={`prod-${i}`} data={s} />)}
      <LandingHomeRevamp />
    </>
  );
}
