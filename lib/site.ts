/** Canonical business facts — keep NAP identical across schema, footer, GBP, and directories. */
function normalizeSiteUrl(input: string | undefined): string {
  const fallback = "https://www.coaibakersfield.com";
  if (!input) return fallback;
  try {
    const parsed = new URL(input);
    return `${parsed.origin}`.replace(/\/+$/, "");
  } catch {
    return fallback;
  }
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const ORG_NAME = "Chaotically Organized AI";
export const LEGAL_NAME = "Chaotically Organized AI, LLC";

export const FOUNDER = {
  name: "Jason Robert Manuel",
  role: "Founder",
  email: "jasonm@coaibakersfield.com"
} as const;

export const CO_FOUNDER = {
  name: "Frank Hernandez",
  role: "Co-Founder",
  email: "frankh@coaibakersfield.com"
} as const;

export const CONTACT = {
  email: "jasonm@coaibakersfield.com",
  secondaryEmail: "frankh@coaibakersfield.com",
  phoneDisplay: "(661) 331-1767",
  phoneE164: "+16613311767",
  addressLine: "1712 19th St #216",
  city: "Bakersfield",
  region: "CA",
  postalCode: "93301",
  country: "US"
} as const;

/**
 * Single source of truth for every published price.
 *
 * One buyer journey: find the leak -> fix the leak -> run the system.
 * Nothing else may quote a price. If a number is not in here, it does not
 * belong on the site. Retired offers (Trades Starter Pack, AI Lead Machine,
 * Operational Ecosystem, Signal Foundation, Sentinel Automation) are gone —
 * do not reintroduce them.
 */
export const OFFERS = {
  /** Wedge — qualify the contractor and show one real leak before proposing a system. */
  scorecard: {
    stage: "Find the leak",
    name: "Job-Call Leak Scorecard",
    price: "Free for qualified owner-operators",
    alt: "$350 Structural Audit otherwise, credited to the build",
    turnaround: "24–48 hours",
    summary:
      "A one-page scorecard with three observed leaks, the assumptions behind them, screenshots, and one recommended first control."
  },
  /** Flagship — the installation of the contractor's revenue intake layer. */
  tradecall: {
    stage: "Fix the leak",
    name: "TradeCall Revenue Infrastructure Build",
    price: "$1,997",
    priceNumeric: "1997",
    terms: "$997 to start / $1,000 at launch",
    bilingual: "+$400",
    summary:
      "Call-first website, one aligned business identity, Google Business Profile cleanup, missed-call text-back, lead pipeline and owner alert, ownership handoff, launch QA, and a 30-day baseline scorecard."
  },
  /** Recurring — keeps the revenue intake system working. Not "maintenance". */
  continuity: {
    stage: "Run the system",
    name: "Revenue Continuity",
    price: "$197",
    period: "month",
    terms: "cancel anytime",
    summary:
      "Routing, form, and SMS test log. Response-time report. Uncontacted-lead review. Monthly scorecard, minor site and profile corrections, and one improvement priority."
  }
} as const;

/**
 * Third-party costs the client pays directly — never to COAI.
 * Published before signature so "no surprises" is literally true.
 */
export const THIRD_PARTY_COSTS = [
  { item: "Hosting", cost: "$20–30/mo", paidTo: "Vercel, in your account" },
  { item: "Phone / SMS", cost: "$15–50/mo per number", paidTo: "Twilio, in your account" }
] as const;

/** Geocode for 1712 19th St #216, Bakersfield, CA 93301 — update if you verify with Google Maps pin. */
export const GEO = {
  latitude: 35.3749,
  longitude: -119.0187
} as const;

export const SITE_DESCRIPTION =
  "COAI installs a call-first website, instant missed-call response, Google Business Profile cleanup, and lead routing you own — for Bakersfield and Kern County contractors. Built by Jason Robert Manuel, a contractor who codes. You control the domain, hosting, source code, analytics, and lead data.";

/** Category descriptor. Sits beneath the buyer-facing outcome line, never in front of it. */
export const CATEGORY = "Industrial-Strength Revenue Infrastructure";

/** Buyer-facing outcome line. Lead with this — a contractor does not shop for "infrastructure". */
export const BUYER_OUTCOME = "Stop losing ready-to-book jobs while you're on the job.";

export const BRAND_TAGLINE = "Where Chaos Meets Clarity";

/** Google Business Profile (Maps / share link). Keep in sync with GBP dashboard. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/QASlHnjE2K6FzdNfJ";

/**
 * SameAs — start with GBP; add LinkedIn, YouTube, etc. when you have public URLs.
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export const SAME_AS = [
  GOOGLE_BUSINESS_PROFILE_URL,
  "https://www.linkedin.com/company/chaoticallyorganizedai",
  "https://x.com/COAIBakersfield",
  "https://www.facebook.com/profile.php?id=61574535114589"
] as const;

/**
 * Map / place URL for schema `hasMap` (often the same as your public GBP link).
 * Replace with a `maps.google.com/?cid=...` URL from “Share” on your Business Profile if you prefer.
 */
export const HAS_MAP_URL = GOOGLE_BUSINESS_PROFILE_URL;

/**
 * Office hours for JSON-LD — must match what you publish on Google Business Profile.
 * Edit here and in GBP together when you change availability.
 */
export const BUSINESS_HOURS = {
  /** IANA timezone for Bakersfield */
  timeZone: "America/Los_Angeles",
  /** Weekday blocks shown in UI + schema */
  weekday: { opens: "09:00", closes: "17:00" },
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const
} as const;

/** Human-readable hours — keep aligned with GBP and `BUSINESS_HOURS`. */
export const BUSINESS_HOURS_LABEL =
  "Monday–Friday · 9:00 a.m.–5:00 p.m. Pacific (matches Google Business Profile)";

export const ORG_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Primary service coverage for schema `areaServed`. */
export const AREA_SERVED = [
  {
    "@type": "City",
    name: "Bakersfield",
    address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" }
  },
  {
    "@type": "AdministrativeArea",
    name: "Kern County",
    address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" }
  },
  { "@type": "AdministrativeArea", name: "California", address: { "@type": "PostalAddress", addressCountry: "US" } },
  { "@type": "Country", name: "United States" }
] as const;

/** Cities actively served — used for city-specific schema and location pages. */
const cityData = {
  bakersfield: {
    name: "Bakersfield", region: "CA", slug: "bakersfield",
    ticker: ["BAKERSFIELD WEB DESIGN", "LOCAL SEO", "AEO READY", "SCHEMA", "SOVEREIGN BUILDS"] as string[],
    description: "Conversion-first websites with local schema, fast mobile performance, and full ownership for Bakersfield service businesses.",
    serviceDesc: "Website design and local search architecture for Bakersfield businesses that need faster conversion and clearer trust signals."
  },
  delano: {
    name: "Delano", region: "CA", slug: "delano",
    ticker: ["DELANO WEB DESIGN", "LOCAL LEAD FLOW", "SCHEMA", "MOBILE SPEED", "KERN COUNTY"] as string[],
    description: "Delano websites focused on local lead conversion, mobile speed, and entity schema for better Google and AI visibility.",
    serviceDesc: "Website design and local search architecture for Delano businesses that need more calls, form submissions, and clear trust signals."
  },
  shafter: {
    name: "Shafter", region: "CA", slug: "shafter",
    ticker: ["SHAFTER WEB DESIGN", "CONVERSION UX", "LOCAL VISIBILITY", "MOBILE-FIRST", "KERN COUNTY"] as string[],
    description: "Shafter website design for local service businesses: high-speed mobile pages, cleaner conversion UX, and structured local trust signals.",
    serviceDesc: "Website design, schema implementation, and conversion architecture for Shafter businesses that need stronger local lead flow."
  }
};
export const SERVED_CITIES: { [K in keyof typeof cityData]: typeof cityData[K] } = cityData;
export type CitySlug = keyof typeof cityData;
