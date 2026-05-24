/** Canonical business facts — keep NAP identical across schema, footer, GBP, and directories. */
function normalizeSiteUrl(input: string | undefined): string {
  const fallback = "https://chaoticallyorganizedai.com";
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
  phoneDisplay: "(661) 659-1376",
  phoneE164: "+16616591376",
  addressLine: "1712 19th St #216",
  city: "Bakersfield",
  region: "CA",
  postalCode: "93301",
  country: "US"
} as const;

/** Geocode for 1712 19th St #216, Bakersfield, CA 93301 — update if you verify with Google Maps pin. */
export const GEO = {
  latitude: 35.3749,
  longitude: -119.0187
} as const;

export const SITE_DESCRIPTION =
  "Chaotically Organized AI builds digital lead systems for trades businesses in Bakersfield and Kern County. Sovereign websites with schema markup, AEO-optimized content, AI phone systems, and local SEO. Founder Jason Robert Manuel hand-codes every site.";

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
