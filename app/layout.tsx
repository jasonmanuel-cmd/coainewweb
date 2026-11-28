import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { type ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppChrome } from "@/components/AppChrome";
import { Analytics } from "@vercel/analytics/next";
import { ClickTracker } from "@/components/analytics/ClickTracker";
import { MobileCallBar } from "@/components/analytics/MobileCallBar";
import { PublicOnly } from "@/components/PublicOnly";
import { JsonLd } from "@/components/JsonLd";
import { SentryLazyInit } from "@/components/SentryLazyInit";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/schema";
import { CLARITY_PROJECT_ID, GOOGLE_TAG_ID, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
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
import "./coai-launch.css";

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
  colorScheme: "light dark",
  themeColor: "#0F2A44",
  width: "device-width",
  initialScale: 1
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NMKLXR5R";
// Plain <script> tags in <head> (not next/script) so the Google tag is present in the raw HTML,
// which is what Google's tag detection reads. Config is skipped on the private /hq workspace.
const GOOGLE_TAG_INIT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());if(!/^\\/hq(\\/|$)/.test(location.pathname)){gtag('config','${GOOGLE_TAG_ID}');}`;

// Microsoft Clarity. Skipped on the private /hq workspace and for visitors who send
// Do Not Track or Global Privacy Control, matching how the site's own counter behaves.
const CLARITY_INIT = `(function(){var n=navigator;if(/^\\/hq(\\/|$)/.test(location.pathname)||n.doNotTrack==="1"||n.globalPrivacyControl)return;(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: GOOGLE_TAG_INIT }} />
        <script dangerouslySetInnerHTML={{ __html: CLARITY_INIT }} />
      </head>
      <body className="coai-site">
        {/* Set the progressive-enhancement flag before hydration so reveal content
            never stays hidden for non-JS clients. The intentional html attribute
            mutation is covered by suppressHydrationWarning above. */}
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
        <PublicOnly>
        <SentryLazyInit />
        <SpeedInsights />
        <Analytics />
        <ClickTracker />
        <MobileCallBar />
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
</PublicOnly>
      </body>
    </html>
  );
}
