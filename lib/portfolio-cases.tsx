import type { ReactNode } from "react";

export type PortfolioCategory =
  | "all"
  | "food"
  | "finance"
  | "contracting"
  | "apparel"
  | "photo"
  | "music";

export type PortfolioCase = {
  id: string;
  category: Exclude<PortfolioCategory, "all">;
  accentClass: string;
  tagClass: string;
  industryLabel: string;
  client: string;
  location: string;
  description: ReactNode;
  built: string[];
  liveUrl: string;
};

/** Case cards — copy aligned to live client-owned builds */
export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: "phils",
    category: "food",
    accentClass: "m-accent-food",
    tagClass: "m-tag-food",
    industryLabel: "Food & Beverage",
    client: "Phil's Cheesesteaks & More",
    location: "1112 19th St · Bakersfield, CA · Est. 1978",
    description: (
      <>
        Owner Felipe brought his <strong>North Philly roots and Boricua flavor</strong> to downtown Bakersfield — real
        Cheez Whiz, thinly sliced ribeye, smash burgers, and crinkle-cut fries that customers call better than Philly
        originals. COAI built a conversion-first restaurant site with online ordering integration, DoorDash linkage,
        Google Business alignment, and a menu system designed to drive <strong>pickup revenue and repeat visits</strong>.
        Rated 4.8–4.9 stars across Google, Yelp, and DoorDash.
      </>
    ),
    built: [
      "Menu System",
      "Online Order Flow",
      "DoorDash Integration",
      "GBP Schema",
      "Mobile-First",
      "Review Aggregation"
    ],
    liveUrl: "https://phils-cheesesteaks-and-more.com"
  },
  {
    id: "edwin",
    category: "finance",
    accentClass: "m-accent-finance",
    tagClass: "m-tag-finance",
    industryLabel: "Credit Restoration",
    client: "Edwin Ward Consulting",
    location: "Credit Restoration Services · USA",
    description: (
      <>
        Edwin Ward helps individuals <strong>repair, rebuild, and take ownership of their credit profile</strong> — one
        of the most high-trust, high-stakes service categories in financial consulting. COAI built a credibility-forward
        site with a clear service breakdown, transparent process flow, and a lead intake funnel designed to convert
        skeptical clients who have been burned by credit repair scams before.{" "}
        <strong>Trust architecture was the core design brief.</strong>
      </>
    ),
    built: [
      "Trust-First Layout",
      "Lead Intake Form",
      "Service Breakdown",
      "Process Timeline",
      "Schema Markup",
      "Mobile Optimized"
    ],
    liveUrl: "https://edwinwardconsulting.com"
  },
  {
    id: "sig954",
    category: "contracting",
    accentClass: "m-accent-contracting",
    tagClass: "m-tag-contracting",
    industryLabel: "General Contracting",
    client: "Signature 954",
    location: "Miami, FL · Area Code 954",
    description: (
      <>
        Signature 954 is a <strong>Miami-area contracting company</strong> delivering premium construction and
        renovation work across South Florida&apos;s competitive trades market. COAI built a high-impact project showcase
        site with a portfolio-forward layout, service category pages, and a quote request funnel engineered for{" "}
        <strong>high-ticket residential and commercial contracts</strong>. Built to signal premium positioning in a
        market where the website is the first impression before the bid.
      </>
    ),
    built: [
      "Project Showcase",
      "Quote Request Funnel",
      "Service Pages",
      "Local SEO",
      "Vercel Deploy",
      "Fast Load Architecture"
    ],
    liveUrl: "https://signature954.vercel.app"
  },
  {
    id: "hgm",
    category: "apparel",
    accentClass: "m-accent-apparel",
    tagClass: "m-tag-apparel",
    industryLabel: "Apparel & Cannabis",
    client: "Home Grow Money",
    location: "E-Commerce · Apparel & Cannabis Lifestyle",
    description: (
      <>
        Home Grow Money is a <strong>dual-channel lifestyle brand</strong> merging street apparel with cannabis culture —
        built for a founder who moves between both worlds with equal authenticity. COAI architected a full Next.js
        e-commerce storefront handling product catalog, cart, checkout, and order flow across two distinct product
        verticals. The system was engineered with <strong>rate limiting, admin controls, and Vercel deployment</strong>{" "}
        so the owner operates it independently without relying on Shopify or third-party platforms.
      </>
    ),
    built: [
      "Next.js Storefront",
      "Dual Product Catalog",
      "Cart & Checkout",
      "Admin Dashboard",
      "Rate Limiting",
      "Vercel Deploy"
    ],
    liveUrl: "https://homegrowmoney.com"
  },
  {
    id: "willam",
    category: "photo",
    accentClass: "m-accent-photo",
    tagClass: "m-tag-photo",
    industryLabel: "Photography & Tattoo",
    client: "Willam Dean",
    location: "Real Estate Photography · Tattoo Artist",
    description: (
      <>
        Willam Dean operates in two visually-driven worlds — <strong>real estate photography</strong> where sharp
        imagery moves listings faster, and <strong>custom tattoo artistry</strong> where the portfolio is the entire
        pitch. COAI built a dual-identity portfolio site that lets both audiences land in the right place without
        confusion. Real estate agents and brokers get a clean gallery and booking path. Tattoo clients get a curated flash
        and custom work showcase with a consultation intake. <strong>One URL, two audiences.</strong>
      </>
    ),
    built: [
      "Dual Portfolio",
      "Gallery System",
      "Booking Intake",
      "Real Estate Focus",
      "Tattoo Showcase",
      "Netlify Deploy"
    ],
    liveUrl: "https://willamdean.netlify.app"
  },
  {
    id: "pwr",
    category: "music",
    accentClass: "m-accent-music",
    tagClass: "m-tag-music",
    industryLabel: "Independent Music",
    client: "Poison Well Records",
    location: "Independent Punk Label · USA",
    description: (
      <>
        Poison Well Records is an <strong>independent punk label</strong> — raw, confrontational, and completely
        outside the major label machine. COAI built a site that matches the genre&apos;s energy without flinching:
        dark, high-contrast, built for the community not the algorithm. Roster pages, release archives, merch linkage,
        and a booking/contact system give the label a <strong>digital home it actually owns</strong> — no
        streaming platform dependency, no social media landlord. The underground, structured.
      </>
    ),
    built: [
      "Roster Pages",
      "Release Archive",
      "Merch Integration",
      "Booking System",
      "High-Contrast UI",
      "Netlify Deploy"
    ],
    liveUrl: "https://poisonwellrecord.netlify.app"
  }
];
