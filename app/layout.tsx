import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppChrome } from "@/components/AppChrome";
import { PublicOnly } from "@/components/PublicOnly";
import { PublicActivity } from "@/components/hq/PublicActivity";
import { JsonLd } from "@/components/JsonLd";
import { CipherChat } from "@/components/revamp/CipherChat";
import { SentryLazyInit } from "@/components/SentryLazyInit";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./tokens.css";
import "./globals.css";
import "./revamp.css";
import "./cinematic.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chaotically Organized AI",
    template: "%s | Chaotically Organized AI"
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Chaotically Organized AI",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Chaotically Organized AI",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "COAI revenue infrastructure for contractors" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaotically Organized AI",
    description: SITE_DESCRIPTION,
    images: ["/og-default.png"]
  }
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08100c",
  width: "device-width",
  initialScale: 1
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NMKLXR5R";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="coai-site">
        {/* Marks JS as active before content parses, so .reveal sections hidden
            by CSS never stay hidden for non-JS clients. See globals.css. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <PublicOnly><noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script
          id="gtm"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} /></PublicOnly>
        <AppChrome>{children}</AppChrome>
        <PublicOnly><PublicActivity /><CipherChat />
        <SentryLazyInit />
        <SpeedInsights />
        {/* Simple Analytics: privacy-first, honors Do Not Track */}
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="lazyOnload"
          data-collect-dnt="true"
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif?collect-dnt=true"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
        <Script
          src="https://trtc.io/knocket-sdk/sdk.js?identifier=9368e40215abec47a6&v=1791814761160"
          strategy="lazyOnload"
        /></PublicOnly>
      </body>
    </html>
  );
}
