import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { CipherChat } from "@/components/revamp/CipherChat";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./tokens.css";
import "./globals.css";
import "./revamp.css";

/** Headline face — condensed industrial sans. Sentence case, never uppercase. */
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap"
});

/** Body face. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

/** Numerals, labels, and status tabs. */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap"
});

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
    images: [{ url: "/newlogo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaotically Organized AI",
    description: SITE_DESCRIPTION,
    images: ["/newlogo.png"]
  }
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NMKLXR5R";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // Font variables live on <html> so tokens.css can read them at :root.
    // On <body> they are out of scope there and every var() chain resolves to
    // nothing, silently falling the whole site back to Times New Roman.
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script
          id="gtm"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{
                where: { href_matches: ["/intake", "/pricing", "/services", "/portfolio", "/about", "/faq", "/website-design*"] },
                eagerness: "moderate"
              }]
            })
          }}
        />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <AppChrome>{children}</AppChrome>
        <CipherChat />
        <Analytics />
        <SpeedInsights />
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","x2zh9pih5y");`}
        </Script>
      </body>
    </html>
  );
}
