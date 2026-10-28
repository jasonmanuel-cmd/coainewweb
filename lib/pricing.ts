import { OFFERS } from "./site";

/**
 * The full COAI price menu, from the 8/12/26 price sheet.
 *
 * Single source of truth for every package, add-on and care plan on the site
 * (pricing, services, website-design, home, FAQ, schema, llms.txt). Never write
 * a price literal anywhere else. The base website price lives in OFFERS
 * (lib/site.ts) and package totals are computed from it so they cannot drift.
 *
 * Wording is deliberately generic ("your business", "jobs", "services"): the
 * source sheet was written for one automotive client, so vehicle-specific terms
 * were generalised. Review-system wording follows Google's review policy
 * (every customer is invited to review; nothing is routed away from Google).
 */

export type PriceItem = {
  id: string;
  name: string;
  /** Display price, exactly as published: "$450", "$800 setup + $200/mo", "$150–$300/page". */
  price: string;
  summary: string;
  /** Short extra note shown under the summary. */
  note?: string;
};

export type AddOnCategory = {
  id: string;
  title: string;
  blurb: string;
  items: readonly PriceItem[];
};

/** What the base website build includes. */
export const BUILD_INCLUDED = [
  "Custom-coded, call-first, mobile-first website — you own 100% of the source",
  "One aligned business identity on the site: name, address, phone, hours, services, service areas",
  "Click-to-call, form capture, an owner email alert, and a tested contact path",
  "Essential on-page SEO: titles, descriptions, sitemap, and canonical tags",
  "Ownership and account map, plus a documented handoff",
  "Launch QA and 30 days of post-launch fixes"
] as const;

/** Deliberately excluded from every offer. */
export const NOT_INCLUDED = [
  "Ad spend on Google, Meta, or anywhere else",
  "Custom third-party integrations",
  "Ongoing content beyond the agreed scope",
  "Carrier, SMS, and AI usage fees",
  "Hosting",
  "Advanced CRM migration",
  "Around-the-clock human dispatch"
] as const;

/* -------------------------------------------------------------------------- */
/* Packages                                                                   */
/* -------------------------------------------------------------------------- */

type PackageLine = { name: string; amount: number };

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const sum = (lines: readonly PackageLine[]) => lines.reduce((total, line) => total + line.amount, 0);

const WEBSITE_PRICE = Number(OFFERS.website.priceNumeric);

/** Package 1 — add-ons that complete the website. */
const FOUNDATION_LINES: readonly PackageLine[] = [
  { name: "Enhanced Quote Form", amount: 350 },
  { name: "Project Gallery", amount: 200 },
  { name: "Google Business + Schema", amount: 350 },
  { name: "Service Area Map", amount: 300 },
  { name: "Customer Review System", amount: 450 }
];

/** Package 2 — adds the lead-capture and follow-up systems. */
const LEAD_MACHINE_LINES: readonly PackageLine[] = [
  { name: "Missed-Call SMS Back", amount: 450 },
  { name: "AI Website Chatbot", amount: 500 },
  { name: "Lead Follow-Up System (setup)", amount: 497 },
  { name: "Quote Recovery System (setup)", amount: 497 },
  { name: "Online Booking", amount: 600 },
  { name: "Bilingual Spanish", amount: 250 }
];

/** Package 3 — the customer-lifecycle systems (priced as one total, not per line). */
const LIFECYCLE_SYSTEMS = [
  "Customer Reactivation",
  "Service Reminders",
  "Customer & Job History",
  "Automated Upsells",
  "Referral System",
  "CRM",
  "Revenue Dashboard",
  "AI Voice Receptionist"
] as const;

const FOUNDATION_ADDONS_TOTAL = sum(FOUNDATION_LINES);
const LEAD_MACHINE_ADDONS_TOTAL = sum(LEAD_MACHINE_LINES);

/** Package 3 systems total, per the sheet: $5,000–$7,500 setup, $597–$997/month. */
const LIFECYCLE_SETUP_LOW = 5000;
const LIFECYCLE_SETUP_HIGH = 7500;

export type Package = {
  id: "1" | "2" | "3";
  name: string;
  stage: string;
  tagline: string;
  /** Items added by this package (Package 2 and 3 also include everything before them). */
  adds: readonly string[];
  /** Per-item prices for packages 1 and 2; absent for package 3 (priced as a total). */
  lines?: readonly PackageLine[];
  inherits?: string;
  /** Headline price, e.g. "$3,647". Includes the website. */
  total: string;
  totalNote: string;
  /** Breakdown shown under the headline. */
  breakdown: string;
  recurring: string;
  recurringNote: string;
  numeric: { low: number; high: number };
};

export const PACKAGES: readonly Package[] = [
  {
    id: "1",
    name: "Digital Foundation",
    stage: "Package 1",
    tagline: "The logical completion package for your new website.",
    adds: FOUNDATION_LINES.map((line) => line.name),
    lines: FOUNDATION_LINES,
    total: usd(WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL),
    totalNote: "website + add-ons",
    breakdown: `${OFFERS.website.name} ${OFFERS.website.price} + ${usd(FOUNDATION_ADDONS_TOTAL)} in add-ons`,
    recurring: "None required",
    recurringNote: "Optional website care from $100/month",
    numeric: { low: WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL, high: WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL }
  },
  {
    id: "2",
    name: "Lead Machine",
    stage: "Package 2",
    tagline: "Everything in Digital Foundation, plus the systems that capture and follow up on every inquiry.",
    inherits: "Everything in Digital Foundation",
    adds: LEAD_MACHINE_LINES.map((line) => line.name),
    lines: LEAD_MACHINE_LINES,
    total: `≈ ${usd(WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL + LEAD_MACHINE_ADDONS_TOTAL)}`,
    totalNote: "website + all add-ons, approximate",
    breakdown: `${OFFERS.website.price} website + ${usd(FOUNDATION_ADDONS_TOTAL)} Foundation add-ons + approximately ${usd(LEAD_MACHINE_ADDONS_TOTAL)} lead systems`,
    recurring: "$294–$500/month",
    recurringNote: "For the automation, depending on exactly what is implemented",
    numeric: {
      low: WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL + LEAD_MACHINE_ADDONS_TOTAL,
      high: WEBSITE_PRICE + FOUNDATION_ADDONS_TOTAL + LEAD_MACHINE_ADDONS_TOTAL
    }
  },
  {
    id: "3",
    name: "Customer Lifecycle",
    stage: "Package 3",
    tagline: "Everything in Lead Machine, plus the systems that bring customers back and show you the numbers.",
    inherits: "Everything in Lead Machine",
    adds: LIFECYCLE_SYSTEMS,
    total: `${usd(WEBSITE_PRICE + LIFECYCLE_SETUP_LOW)}–${usd(WEBSITE_PRICE + LIFECYCLE_SETUP_HIGH)}`,
    totalNote: "website + all systems",
    breakdown: `${OFFERS.website.price} website + ${usd(LIFECYCLE_SETUP_LOW)}–${usd(LIFECYCLE_SETUP_HIGH)} for the complete systems setup (replaces the separate Package 1 and 2 add-on prices)`,
    recurring: "$597–$997/month",
    recurringNote: "For all the systems together, depending on exactly what is implemented",
    numeric: { low: WEBSITE_PRICE + LIFECYCLE_SETUP_LOW, high: WEBSITE_PRICE + LIFECYCLE_SETUP_HIGH }
  }
] as const;

/** Rows for the comparison matrix, grouped by where the item first appears. */
export const MATRIX_GROUPS = [
  { label: "Package 1 — Digital Foundation adds", from: 1, items: FOUNDATION_LINES.map((line) => line.name) },
  { label: "Package 2 — Lead Machine adds", from: 2, items: LEAD_MACHINE_LINES.map((line) => line.name) },
  { label: "Package 3 — Customer Lifecycle adds", from: 3, items: [...LIFECYCLE_SYSTEMS] }
] as const;

/* -------------------------------------------------------------------------- */
/* Individual add-ons                                                         */
/* -------------------------------------------------------------------------- */

export const ADDON_CATEGORIES: readonly AddOnCategory[] = [
  {
    id: "quick-wins",
    title: "Capture and respond",
    blurb: "The fastest wins: catch the call, answer the question, follow up before the customer goes cold.",
    items: [
      {
        id: "missed-call-sms",
        name: "Missed-Call SMS Back",
        price: "$450",
        summary: "Automatically texts a customer when you miss their call and starts the lead-recovery conversation."
      },
      {
        id: "review-system",
        name: "Customer Review System",
        price: "$450",
        summary:
          "Automated Google review requests after completed work, plus a private feedback form so concerns reach you quickly. Every customer is invited to review."
      },
      {
        id: "ai-chatbot",
        name: "AI Website Chatbot",
        price: "$500",
        summary:
          "An always-on website assistant that answers approved common questions, captures leads, qualifies customers, and sends inquiries to your team."
      },
      {
        id: "quote-form",
        name: "Enhanced Quote Form",
        price: "$300–$400",
        summary:
          "An advanced quote form with service selection, conditional questions, photo uploads, and project details. Photo uploads and job-detail capture are included."
      },
      {
        id: "voice-receptionist",
        name: "AI Voice Receptionist",
        price: "$800 setup + $200/mo",
        summary: "AI answers incoming calls, handles common questions, qualifies leads, and routes or captures customers.",
        note: "Usage costs are separate."
      },
      {
        id: "lead-follow-up",
        name: "Lead Follow-Up System",
        price: "$497 setup + $100/mo",
        summary: "Automatically follows up with new inquiries that haven't responded or booked."
      },
      {
        id: "quote-recovery",
        name: "Quote Recovery System",
        price: "$497 setup + $147/mo",
        summary: "Follows up with customers who received a quote but haven't purchased."
      }
    ]
  },
  {
    id: "website",
    title: "Website and conversion",
    blurb: "Enhancements to the website build that turn visitors into inquiries.",
    items: [
      {
        id: "gallery",
        name: "Project Gallery",
        price: "$200",
        summary: "A filterable before-and-after gallery organized by service type."
      },
      {
        id: "service-area-map",
        name: "Service Area Map",
        price: "$300",
        summary: "An interactive coverage map plus a ZIP-code and service-area checker."
      },
      {
        id: "online-booking",
        name: "Online Booking",
        price: "$600",
        summary:
          "Appointment scheduling built into the website through Calendly, Google Calendar, or another booking platform."
      },
      {
        id: "bilingual",
        name: "Bilingual Spanish",
        price: "$250",
        summary: "Spanish-language pages and navigation for Spanish-speaking customers."
      },
      {
        id: "service-pages",
        name: "Advanced Service Pages",
        price: "$150–$300/page",
        summary:
          "High-converting pages that explain individual services, pricing considerations, common questions, and one clear call to action."
      }
    ]
  },
  {
    id: "search",
    title: "Search and local visibility",
    blurb: "Be found by search engines and understood by AI answer engines. No ranking or citation is ever promised.",
    items: [
      {
        id: "gbp-schema",
        name: "Google Business + Schema",
        price: "$350",
        summary: "Aligns your Google Business information with the website and implements structured data."
      },
      {
        id: "local-seo",
        name: "Local SEO Foundation",
        price: "$750–$1,500",
        summary: "On-page local SEO, service structure, NAP consistency, metadata, internal linking, and local search foundation."
      },
      {
        id: "geo-aeo",
        name: "GEO / AEO Setup",
        price: "$750–$1,500",
        summary: "Structures your content and entities for AI search and answer engines."
      },
      {
        id: "blog",
        name: "Blog Setup",
        price: "$650",
        summary: "Blog infrastructure plus 3–5 initial SEO-focused articles."
      },
      {
        id: "ongoing-seo",
        name: "Ongoing SEO / GEO",
        price: "$150–$500/mo",
        summary: "Continued content, optimization, local search work, and visibility monitoring."
      }
    ]
  },
  {
    id: "retention",
    title: "Customer retention",
    blurb: "Move beyond website services: keep the customers you already earned.",
    items: [
      {
        id: "reactivation",
        name: "Customer Reactivation",
        price: "$750 setup + $200/mo",
        summary: "Finds past customers and automatically invites them back."
      },
      {
        id: "service-reminders",
        name: "Service Reminder System",
        price: "$750 setup + $200/mo",
        summary: "Reminds customers when maintenance or another service is due."
      },
      {
        id: "customer-history",
        name: "Customer & Job History",
        price: "$1,000–$2,000 setup + $200/mo",
        summary: "Tracks customers, jobs, services, and service history."
      },
      {
        id: "upsell",
        name: "Automated Upsell Engine",
        price: "$750 setup + $200/mo",
        summary: "Recommends relevant additional services based on what the customer already purchased."
      },
      {
        id: "referral",
        name: "Referral System",
        price: "$500 setup + $97/mo",
        summary: "Turns satisfied customers into tracked referral sources."
      }
    ]
  },
  {
    id: "sales",
    title: "Sales and lead management",
    blurb: "One place for every lead, quote, appointment, and follow-up.",
    items: [
      {
        id: "crm",
        name: "CRM / Lead Pipeline",
        price: "$997 setup + $197/mo",
        summary: "Centralizes leads, quotes, appointments, customers, and follow-up."
      },
      {
        id: "lead-recovery",
        name: "Lead Recovery",
        price: "$750 setup + $197/mo",
        summary: "Re-engages leads that contacted you but never converted."
      },
      {
        id: "appointment-recovery",
        name: "Appointment Recovery",
        price: "$497 setup + $147/mo",
        summary: "Recovers cancellations, no-shows, and abandoned booking attempts."
      },
      {
        id: "sms-comms",
        name: "Automated SMS Communications",
        price: "$197–$397/mo",
        summary: "Confirmations, reminders, follow-ups, status updates, and customer communication."
      }
    ]
  },
  {
    id: "ai",
    title: "AI systems",
    blurb: "Scoped AI that works from your approved facts, with a person always in the loop for judgment calls.",
    items: [
      {
        id: "service-advisor",
        name: "AI Service Advisor",
        price: "$750 setup + $147/mo",
        summary: "Helps customers work out which of your services fits their situation."
      },
      {
        id: "lead-qualifier",
        name: "AI Lead Qualifier",
        price: "$750 setup + $197/mo",
        summary: "Scores and qualifies incoming leads before staff follow-up."
      },
      {
        id: "knowledge-agent",
        name: "AI Knowledge Agent",
        price: "$1,500–$3,500 setup + $297–$750/mo",
        summary: "An internal AI trained on your services, policies, FAQs, and procedures.",
        note: "The AI Website Chatbot and AI Voice Receptionist are listed under Capture and respond."
      }
    ]
  },
  {
    id: "marketing",
    title: "Marketing automation",
    blurb: "Targeted campaigns that use what you already know about your customers.",
    items: [
      {
        id: "campaign-engine",
        name: "Automated Campaign Engine",
        price: "$750 setup + $197/mo",
        summary: "Sends targeted campaigns based on service, season, and customer history."
      },
      {
        id: "seasonal",
        name: "Seasonal Campaigns",
        price: "$150–$300/campaign",
        summary: "Summer, holiday, and other seasonal promotions."
      },
      {
        id: "reactivation-campaign",
        name: "Customer Reactivation Campaign",
        price: "$250–$500/campaign",
        summary: "A one-time campaign targeting dormant customers."
      },
      {
        id: "referral-campaign",
        name: "Referral Campaign",
        price: "$250–$500/campaign",
        summary: "Activates existing customers as referral sources."
      }
    ]
  },
  {
    id: "data",
    title: "Data and reporting",
    blurb: "See what is working and where revenue is leaking.",
    items: [
      {
        id: "dashboard",
        name: "Revenue Dashboard",
        price: "$1,000 setup + $147/mo",
        summary: "Tracks leads, calls, quotes, appointments, conversions, and other key numbers."
      },
      {
        id: "lead-analytics",
        name: "Lead Analytics",
        price: "$500 setup + $97/mo",
        summary: "Tracks where leads come from and what happens to them."
      },
      {
        id: "leak-audit",
        name: "Revenue Leak Audit",
        price: "$497–$1,500",
        summary: "Finds where you are losing potential customers and revenue."
      },
      {
        id: "database-intelligence",
        name: "Customer Database Intelligence",
        price: "$750–$2,500",
        summary: "Analyzes your existing customer data for retention, upsell, and reactivation opportunities."
      }
    ]
  }
] as const;

/* -------------------------------------------------------------------------- */
/* Website care                                                               */
/* -------------------------------------------------------------------------- */

export const CARE_PLANS: readonly PriceItem[] = [
  {
    id: "care-basic",
    name: "Basic Website Care",
    price: "$100/mo",
    summary: "Monitoring, updates, and minor changes."
  },
  {
    id: "care-professional",
    name: "Professional Website Care",
    price: "$200/mo",
    summary: "Maintenance plus content, performance, and SEO updates."
  },
  {
    id: "care-growth",
    name: "Growth Website Care",
    price: "$500/mo",
    summary: "Continuous conversion, SEO, content, and technical improvements."
  }
] as const;

/** Count of individually priced add-ons (care plans excluded). */
export const ADDON_COUNT = ADDON_CATEGORIES.reduce((total, category) => total + category.items.length, 0);

/** Lowest price a customer can start at, for "from" copy and schema. */
export const STARTING_PRICE = OFFERS.website.price;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Look up one add-on or care plan by id. Throws so a typo fails the build/tests, not production. */
export function getAddOn(id: string): PriceItem {
  const item = [...ADDON_CATEGORIES.flatMap((category) => category.items), ...CARE_PLANS].find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown add-on id: ${id}`);
  return item;
}

/** Intake `?pkg=` values that mean "build inquiry" (website or package 1-3). */
export const BUILD_INTERESTS = ["website", "1", "2", "3"] as const;

export function isBuildInterest(value: string | undefined | null): boolean {
  return !!value && (BUILD_INTERESTS as readonly string[]).includes(value);
}

/** Human description of an intake interest, for confirmation copy. */
export function describeInterest(value: string | undefined | null): { name: string; priceLine: string } | null {
  if (value === "website") {
    return { name: OFFERS.website.name, priceLine: `${OFFERS.website.price} flat, ${OFFERS.website.terms}` };
  }
  const pkg = PACKAGES.find((entry) => entry.id === value);
  return pkg ? { name: `${pkg.name} package`, priceLine: `${pkg.total} (${pkg.totalNote}), ${pkg.recurring} after launch` } : null;
}
