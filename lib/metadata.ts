import type { Metadata } from "next";
import { ORG_NAME, SITE_DESCRIPTION, SITE_URL } from "./site";

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = opts.path === "/" ? SITE_URL : `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: ORG_NAME,
      images: [{ url: "/logo.png", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: ["/logo.png"]
    }
  };
}

export const homeMetadata: Metadata = {
  title: "Structural Digital Audits & AEO | Bakersfield 661",
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Structural Digital Audits & AEO | Bakersfield 661",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: ORG_NAME,
    images: [{ url: "/logo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Structural Digital Audits & AEO | Bakersfield 661",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"]
  }
};
