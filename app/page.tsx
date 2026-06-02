import type { Metadata } from "next";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { SITE_URL, ORG_ID } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "COAI - Digital Lead Systems for Trades",
  description:
    "Stop losing jobs to missed calls and bad websites. COAI builds custom lead systems for trades businesses - websites you own, AI that texts missed callers back, and SEO that puts you on top of Google. Free 20-min audit.",
  openGraph: {
    title: "COAI - Digital Lead Systems for Trades Businesses",
    description:
      "Get more job calls without increasing your ad spend. Websites you own, AI automation, and SEO that actually works.",
    url: SITE_URL,
  },
  other: {
    "author": "Jason Robert Manuel",
  },
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does it cost to work with COAI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Website builds start at $1,200 for Signal Foundation and go up to $2,000+ for Sentinel Automation. The diagnostic call and proposal are free. You only pay when clear scope is agreed and work begins."
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
        text: "Standard website builds complete in 2 to 4 weeks from signed scope to live deployment. Simpler builds can be faster. Every milestone has a staging link."
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
    name: "Signal Foundation",
    description: "Core website operating layer. A custom-coded sovereign site with geo-targeted schema, AEO-optimized content, lead capture forms, and Google Business Profile alignment.",
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "1200",
      priceCurrency: "USD",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Sentinel Automation",
    description: "Lead qualification, missed-call text-back recovery, and AI receptionist (Cipher) that answers calls 24/7 - built on top of Signal Foundation.",
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      price: "2000",
      priceCurrency: "USD",
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split("T")[0],
      availability: "https://schema.org/InStock"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "LeadShield",
    description: "Missed-call recovery system that auto-texts every missed caller back, scores leads HOT/WARM/COLD, and runs automated follow-up sequences for trades businesses.",
    brand: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  }
];

const homeReviewSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": ORG_ID
    },
    author: { "@type": "Person", name: "Ryan & Ted" },
    reviewRating: { "@type": "Rating", ratingValue: "5" },
    reviewBody: "Jason is genuinely extremely impressive. He is an adept coder, he can design websites and AI systems in weeks. He has transformed our business."
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": ORG_ID
    },
    author: { "@type": "Person", name: "Edwin Ward" },
    reviewRating: { "@type": "Rating", ratingValue: "5" },
    reviewBody: "Jason did an amazing job building my website from live results to sleek design he did it all. Also more affordable than 85% of the other companies out there."
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": ORG_ID
    },
    author: { "@type": "Person", name: "Matthew Hoover" },
    reviewRating: { "@type": "Rating", ratingValue: "5" },
    reviewBody: "Jason just completed a website for our Record Label. He did professional, technical, amazing job on our website."
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": ORG_ID
    },
    author: { "@type": "Person", name: "Christopher Moore" },
    reviewRating: { "@type": "Rating", ratingValue: "5" },
    reviewBody: "Jason at Chaotically Organized AI helped our business build a great website that helped give us better online presence."
  },
  {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "LocalBusiness",
      "@id": ORG_ID
    },
    author: { "@type": "Person", name: "Los boricuas" },
    reviewRating: { "@type": "Rating", ratingValue: "5" },
    reviewBody: "Great professional work and talented. I started making money with the website he built me."
  }
];

const homeAggregateRating = {
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  itemReviewed: { "@id": ORG_ID },
  ratingValue: "5.0",
  bestRating: "5",
  ratingCount: "8",
  reviewCount: "8"
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeFaqSchema} />
      <JsonLd data={homeAggregateRating} />
      {homeProductSchemas.map((s, i) => <JsonLd key={`prod-${i}`} data={s} />)}
      {homeReviewSchemas.map((s, i) => <JsonLd key={`rev-${i}`} data={s} />)}
      <LandingHomeRevamp />
    </>
  );
}
