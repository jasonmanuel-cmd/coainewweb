import {
  BUSINESS_HOURS,
  CO_FOUNDER,
  CONTACT,
  FOUNDER,
  GEO,
  HAS_MAP_URL,
  LEGAL_NAME,
  ORG_ID,
  FOUNDER_ID,
  ORG_NAME,
  SAME_AS,
  SITE_URL,
  AREA_SERVED,
  WEBSITE_ID,
  SERVED_CITIES,
  type CitySlug
} from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": ORG_ID,
        name: ORG_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/newlogo.png`,
        telephone: CONTACT.phoneE164,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.addressLine,
          addressLocality: CONTACT.city,
          addressRegion: CONTACT.region,
          postalCode: CONTACT.postalCode,
          addressCountry: CONTACT.country
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: GEO.latitude,
          longitude: GEO.longitude
        },
        hasMap: HAS_MAP_URL,
        sameAs: [...SAME_AS],
        openingHoursSpecification: BUSINESS_HOURS.days.map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: BUSINESS_HOURS.weekday.opens,
          closes: BUSINESS_HOURS.weekday.closes
        })),
        founder: { "@id": FOUNDER_ID },
        areaServed: [...AREA_SERVED],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: CONTACT.phoneE164,
          email: CONTACT.email,
          availableLanguage: "English"
        },
        priceRange: "$1,200–$2,000+"
      },
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: FOUNDER.name,
        jobTitle: FOUNDER.role,
        email: FOUNDER.email,
        url: `${SITE_URL}/about`,
        description: "Founder of Chaotically Organized AI, Bakersfield CA. 15+ years in operations, trades, and events.",
        worksFor: { "@id": ORG_ID }
      },
      {
        "@type": "Person",
        name: CO_FOUNDER.name,
        jobTitle: CO_FOUNDER.role,
        email: CO_FOUNDER.email,
        worksFor: { "@id": ORG_ID }
      }
    ]
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: ORG_NAME,
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?s={search_term_string}` },
      "query-input": "required name=search_term_string"
    }
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`
    }))
  };
}

export function serviceJsonLd(serviceName: string, description: string, path?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    serviceType: serviceName,
    ...(path ? { url: `${SITE_URL}${path}` } : {}),
    provider: { "@id": ORG_ID },
    areaServed: [...AREA_SERVED],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 1200,
        maxPrice: 2000,
        priceCurrency: "USD"
      }
    }
  };
}

/** Generate Service schema scoped to a specific city — for location pages. */
export function localServiceJsonLd(slug: CitySlug) {
  const city = SERVED_CITIES[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${city.name} website design services`,
    description: city.serviceDesc,
    serviceType: "Website Design",
    provider: { "@id": ORG_ID },
    areaServed: [
      {
        "@type": "City",
        name: city.name,
        address: { "@type": "PostalAddress", addressRegion: city.region, addressCountry: "US" }
      },
      {
        "@type": "AdministrativeArea",
        name: "Kern County",
        address: { "@type": "PostalAddress", addressRegion: "CA", addressCountry: "US" }
      }
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: 600,
        maxPrice: 2000,
        priceCurrency: "USD"
      }
    }
  };
}

export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${SITE_URL}${path}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Person",
      name: FOUNDER.name,
      url: `${SITE_URL}/about`
    },
    publisher: { "@id": ORG_ID }
  };
}

export function faqPageJsonLd(qa: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
