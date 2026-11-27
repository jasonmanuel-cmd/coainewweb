import type { ReactNode } from "react";

export type PortfolioCategory =
  | "all"
  | "food"
  | "finance"
  | "contracting"
  | "apparel"
  | "photo"
  | "music"
  | "real-estate"
  | "home-services";

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
  previewImage?: string;
  previewAlt?: string;
};

/** Case cards — copy aligned to live client-owned builds */
export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: "aspen-ii",
    category: "contracting",
    accentClass: "m-accent-contracting",
    tagClass: "m-tag-contracting",
    industryLabel: "Residential Homebuilding",
    client: "Aspen II Homes",
    location: "Tehachapi, CA · Building locally since 1994",
    description: (
      <>
        Aspen II Homes is a <strong>Tehachapi home builder with roots dating to 1994</strong>, currently presenting
        Sunset Retreat and six semi-custom plans. The site connects prospective buyers with release availability, floor
        plan details, financing information, and a direct inquiry path—while making clear that pricing and availability
        should be confirmed with the builder.
      </>
    ),
    built: [
      "Homebuilder Landing Page",
      "Community Release Details",
      "Six-Plan Catalog",
      "Financing Information",
      "Availability Path",
      "Buyer Contact CTA"
    ],
    liveUrl: "https://aspen2homes.com/",
    previewImage: "/projects/aspen-ii-homes.webp",
    previewAlt: "Aspen II Homes homepage featuring Sunset Retreat in Tehachapi"
  },
  {
    id: "harbison-standard",
    category: "real-estate",
    accentClass: "m-accent-property",
    tagClass: "m-tag-property",
    industryLabel: "Real Estate & Development",
    client: "Harbison Standard",
    location: "Tehachapi · Bakersfield · Kern County",
    description: (
      <>
        Harbison Standard brings together <strong>real estate, development, and investing</strong> across Tehachapi,
        Bakersfield, and Kern County. A values-led brand story and clear service overviews lead into Nathanael&apos;s
        profile, video content, and direct contact options.
      </>
    ),
    built: [
      "Brand Story",
      "Service Overview",
      "Founder Profile",
      "Video Integration",
      "Service-Area Messaging",
      "Contact Pathways"
    ],
    liveUrl: "https://www.harbisonstandard.com/",
    previewImage: "/projects/harbison-standard.webp",
    previewAlt: "Harbison Standard homepage with its Kern County landscape hero"
  },
  {
    id: "the-pitts",
    category: "music",
    accentClass: "m-accent-music",
    tagClass: "m-tag-music",
    industryLabel: "Independent Music",
    client: "The Pitts",
    location: "Official Artist EPK · The 805",
    description: (
      <>
        The official site for <strong>The Pitts and their nine-track debut album, Jamestown</strong>, gives fans album and
        track details with links to streaming platforms. Artist profiles, a lyric video, downloadable press assets, and
        a direct booking contact make the site useful for both listeners and promoters.
      </>
    ),
    built: [
      "Band Profiles",
      "Album & Tracklist",
      "Streaming Links",
      "Lyric Video",
      "Downloadable Press Kit",
      "Booking Contact"
    ],
    liveUrl: "https://www.thepitts805.com/",
    previewImage: "/projects/the-pitts.webp",
    previewAlt: "The Pitts official website featuring the Jamestown album"
  },
  {
    id: "tm-hauling",
    category: "home-services",
    accentClass: "m-accent-services",
    tagClass: "m-tag-services",
    industryLabel: "Junk Removal & Hauling",
    client: "T&M Hauling",
    location: "Bakersfield, CA · Serving Kern County",
    description: (
      <>
        T&M Hauling is a <strong>Bakersfield father-and-son junk removal crew</strong>. The site makes its services and
        estimate process easy to scan, with call and text-photo actions, a before-and-after gallery, neighborhood
        coverage, and answers to common customer questions.
      </>
    ),
    built: [
      "Service Catalogue",
      "Estimate Request Form",
      "Call & Text CTAs",
      "Before-and-After Gallery",
      "Neighborhood Coverage",
      "Customer FAQ"
    ],
    liveUrl: "https://www.tandmbak.com/",
    previewImage: "/projects/tm-hauling.webp",
    previewAlt: "T&M Hauling homepage showing the Bakersfield father-and-son crew"
  },
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
    liveUrl: "https://www.bakersfieldcheesesteak.com",
    previewImage: "/projects/phils-cheesesteaks.webp",
    previewAlt: "Phil’s Cheesesteaks homepage with pickup ordering and Bakersfield location details"
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
    id: "mgs",
    category: "contracting",
    accentClass: "m-accent-contracting",
    tagClass: "m-tag-contracting",
    industryLabel: "Industrial Services",
    client: "Master Glass Solutions",
    location: "Texas · Commercial Glass & Glazing",
    description: (
      <>
        Master Glass Solutions is a <strong>Texas-based commercial glass and glazing contractor</strong> serving
        industrial, commercial, and institutional clients across the Lone Star State. COAI built a conversion-first
        site with a project showcase, service-area pages for major Texas metro markets, and Google Business Profile
        alignment. The documented scope also includes a customer-facing assistant, an enhanced project quote intake,
        and a customer review system—each built around the company&apos;s own services and approval rules.{" "}
        <strong>The delivered website and client-specific systems transfer to the client after final payment.</strong>
      </>
    ),
    built: [
      "Commercial Showcase",
      "Enhanced Quote Intake",
      "Customer Review System",
      "Website Assistant",
      "Service-Area Pages",
      "Local Search Structure",
      "Ownership Handoff"
    ],
    liveUrl: "https://mgsusa.llc"
  }
];
