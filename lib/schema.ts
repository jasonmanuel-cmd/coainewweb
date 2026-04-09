import {
  BUSINESS_HOURS,
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
  WEBSITE_ID
} from "./site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": ORG_ID,
        name: ORG_NAME,
        legalName: LEGAL_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
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
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Bakersfield, CA"
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: CONTACT.phoneE164,
          email: CONTACT.email,
          availableLanguage: "English"
        }
      },
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: FOUNDER.name,
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
    inLanguage: "en-US"
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

export function serviceJsonLd(serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bakersfield, CA"
    }
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
