import type { Metadata } from "next";
import { FOUNDER, ORG_NAME, SITE_DESCRIPTION, SITE_URL } from "./site";

export function pageMetadata(opts: {
  title: string | { absolute: string };
  description: string;
  path: string;
  published?: string;
  modified?: string;
}): Metadata {
  const url = opts.path === "/" ? SITE_URL : `${SITE_URL}${opts.path}`;
  const titleStr = typeof opts.title === "string" ? opts.title : opts.title.absolute;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    authors: [{ name: FOUNDER.name, url: `${SITE_URL}/about` }],
    openGraph: {
      title: titleStr,
      description: opts.description,
      url,
      siteName: ORG_NAME,
      images: [{ url: "/newlogo.png", width: 1200, height: 630 }],
      ...(opts.published ? { publishedTime: opts.published } : {}),
      ...(opts.modified ? { modifiedTime: opts.modified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description: opts.description,
      images: ["/newlogo.png"]
    },
    other: {
      ...(opts.published ? { "article:published_time": opts.published } : {}),
      ...(opts.modified ? { "article:modified_time": opts.modified } : {}),
      "author": FOUNDER.name,
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
    images: [{ url: "/newlogo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Structural Digital Audits & AEO | Bakersfield 661",
    description: SITE_DESCRIPTION,
    images: ["/newlogo.png"]
  }
};
