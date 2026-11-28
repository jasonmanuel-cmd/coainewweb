/**
 * The one public origin. Canonical tags, Open Graph, JSON-LD, sitemap, robots and
 * llms.txt all derive from SITE_URL, and every alias host 301s here (next.config.ts).
 * Changing the primary domain means changing this constant, not an env var.
 */
export const CANONICAL_ORIGIN = "https://www.chaoticallyorganizedai.com";

/** Hosts that must permanently redirect to CANONICAL_ORIGIN, path and query preserved. */
export const ALIAS_HOSTS = ["chaoticallyorganizedai.com", "coaibakersfield.com", "www.coaibakersfield.com", "chaoticallyorganizedai.org", "www.chaoticallyorganizedai.org"] as const;

/**
 * NEXT_PUBLIC_SITE_URL is deliberately NOT trusted in deployed builds: a stale value in
 * a Vercel environment previously split canonical signals across two domains. It is only
 * honored for localhost so local dev links stay clickable.
 */
function normalizeSiteUrl(input: string | undefined): string {
  if (!input) return CANONICAL_ORIGIN;
  try {
    const { hostname, origin } = new URL(input);
    if (hostname === "localhost" || hostname === "127.0.0.1") return origin;
  } catch {
    // fall through to the canonical origin
  }
  return CANONICAL_ORIGIN;
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const ORG_NAME = "Chaotically Organized AI";
export const LEGAL_NAME = "Chaotically Organized AI, LLC";

export const FOUNDER = {
  name: "Jason Robert Manuel",
  role: "Founder & CEO",
  email: "chaoticallyorganizedai@gmail.com"
} as const;

/**
 * The one published phone number and location for the business.
 *
 * COAI is a service-area business: the work is done remotely and there is no
 * walk-in office, so no street address is published. Locality and region are
 * kept because they are true and carry the local search signal. Do not
 * reintroduce a `streetAddress` unless there is an actual office to visit.
 */
export const CONTACT = {
  email: "chaoticallyorganizedai@gmail.com",
  phoneDisplay: "(661) 683-0228",
  phoneE164: "+16616830228",
  city: "Bakersfield",
  region: "CA",
  country: "US",
  /** Shown wherever a location line is expected. */
  locationLabel: "Bakersfield, CA — remote / service-area business"
} as const;

/**
 * Single source of truth for the headline offers.
 *
 * The buyer journey: find the leak (scorecard) -> build the website -> add the
 * systems that win and keep the customer (packages and add-ons).
 * The full price menu — packages, individual add-ons and care plans from the
 * 8/12/26 COAI price sheet — lives in `lib/pricing.ts`, which builds on these
 * numbers. If a price is not in one of those two files it does not belong on
 * the site. Retired offers (Trades Starter Pack, AI Lead Machine, Operational
 * Ecosystem, Signal Foundation, Sentinel Automation, TradeCall Revenue
 * Infrastructure Build, Revenue Continuity) are gone — do not reintroduce them.
 */
export const OFFERS = {
  /** Entry point — qualify the business and show real leaks before proposing a build. */
  scorecard: {
    stage: "Find the leak",
    name: "Digital Diagnostic & Repair",
    price: "$200 diagnostic",
    alt: "$300 for agreed repairs, $500 total",
    turnaround: "7–14 days for diagnostic and agreed repairs, subject to access",
    summary:
      "An evidence-backed diagnostic of the customer journey with prioritized findings and optional agreed repairs."
  },
  /** Foundation — the custom website every package is built on. */
  website: {
    stage: "Build the foundation",
    name: "Custom Website Build",
    price: "$1,997",
    priceNumeric: "1997",
    terms: "$997 to start / $1,000 at launch",
    summary:
      "A custom-coded, call-first, mobile-first website with one aligned business identity, tested contact paths, launch QA, a documented ownership handoff, and 30 days of post-launch fixes."
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

/** Bakersfield city centroid — a service-area reference point, not an office location. */
export const GEO = {
  latitude: 35.3749,
  longitude: -119.0187
} as const;

export const SITE_DESCRIPTION = "COAI provides intelligent business infrastructure for contractors and service businesses: digital diagnostics, connected customer inquiry and follow-up systems, and advanced operational integrations in Bakersfield, Kern County and nationwide."

/** Category descriptor. Sits beneath the buyer-facing outcome line, never in front of it. */
export const CATEGORY = "Intelligent Business Infrastructure";

/** Buyer-facing outcome line. Lead with this — a contractor does not shop for "infrastructure". */
export const BUYER_OUTCOME = "Stop losing the customers you have already earned.";

export const BRAND_TAGLINE = "Find the leak. Fix the leak. Run the system.";

/** Google Business Profile (Maps / share link). Keep in sync with GBP dashboard. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/QASlHnjE2K6FzdNfJ";

/**
 * SameAs — Google Business Profile, Facebook and Instagram. Add others only when you have verified public URLs.
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
/** Google tag (GA4) measurement ID. Hard-coded on purpose: a stale NEXT_PUBLIC_ env value on Vercel
 *  once shadowed it and the wrong property received the data. */
export const GOOGLE_TAG_ID = "G-ZYCPQEBGTN";

/** Self-serve booking page (Google Calendar appointment schedule). */
export const BOOKING_URL = "https://calendar.app.google/EPr6vGFuVZ7e7pEa7";

/** Microsoft Clarity project (session recordings and heatmaps). */
export const CLARITY_PROJECT_ID = "zkbwp1z1cu";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61584598503488";
const INSTAGRAM_URL = "https://www.instagram.com/chaoticallyorganizedai661/";
const FOUNDER_LINKEDIN_URL = "https://www.linkedin.com/in/jason-manuel-52a2963b4/";

export const SAME_AS = [GOOGLE_BUSINESS_PROFILE_URL, FACEBOOK_URL, INSTAGRAM_URL] as const;

/** Founder's personal profile — belongs on the Person node, not the Organization. */
export const FOUNDER_SAME_AS = [FOUNDER_LINKEDIN_URL] as const;

/** Footer social icons. Same URLs as the schema above, so the two cannot drift apart. */
export const SOCIAL_LINKS = [
  { id: "facebook", label: "Chaotically Organized AI on Facebook", href: FACEBOOK_URL },
  { id: "instagram", label: "Chaotically Organized AI on Instagram", href: INSTAGRAM_URL },
  { id: "linkedin", label: "Jason Manuel on LinkedIn", href: FOUNDER_LINKEDIN_URL }
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
export const BUSINESS_HOURS_LABEL = "Contact us to arrange a time";

/** Canonical delivery language. Never publish a faster range without a signed scope. */
export const DELIVERY_TIMELINE = "2–3 weeks";

/** Shared presentation helpers and stable aliases for UI components. */
export const SITE_NAME = ORG_NAME;
export const PRIMARY_EMAIL = CONTACT.email;
export const CTA_BOOKING_URL = "/intake";
export const BUILD_PRICE = Number(OFFERS.website.priceNumeric);
export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

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
    ticker: ["BAKERSFIELD WEB DESIGN", "LOCAL SEO", "AEO READY", "SCHEMA", "CLIENT-OWNED"] as string[],
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
