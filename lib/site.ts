/** Canonical business facts — keep NAP identical across schema, footer, GBP, and directories. */
export const SITE_URL = "https://chaoticallyorganizedai.com";

export const ORG_NAME = "Chaotically Organized AI";
export const LEGAL_NAME = "Chaotically Organized AI, LLC";

export const FOUNDER = {
  name: "Jason Robert Manuel",
  role: "Founder"
} as const;

export const CONTACT = {
  email: "chaoticallyorganizedai@gmail.com",
  phoneDisplay: "(661) 610-9198",
  phoneE164: "+16616109198",
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
  "Structural digital audits, AEO, GEO, and technical SEO for Bakersfield and the 661. Sovereign infrastructure for operators who need speed, schema, and visibility that machines can trust.";

export const BRAND_TAGLINE = "Where Chaos Meets Clarity";

/** Google Business Profile (Maps / share link). Keep in sync with GBP dashboard. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/QASlHnjE2K6FzdNfJ";

/**
 * SameAs — start with GBP; add LinkedIn, YouTube, etc. when you have public URLs.
 * @see https://developers.google.com/search/docs/appearance/structured-data/organization
 */
export const SAME_AS = [GOOGLE_BUSINESS_PROFILE_URL] as const;

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
