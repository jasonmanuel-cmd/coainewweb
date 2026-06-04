import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import { Suspense, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsRouteTracker } from "@/components/AnalyticsRouteTracker";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { NeuralMesh } from "@/components/NeuralMesh";
import { CipherChat } from "@/components/revamp/CipherChat";
import { Scene3DLoader } from "@/components/revamp/Scene3DLoader";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./landing-page.css";
import "./marketing-inner.css";
import "./revamp.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap"
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
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

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-ZYCPQEBGTN";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="en">
      <body className={`${mono.variable} ${plusJakarta.variable} ${dmSans.variable}`}>
        {GA_MEASUREMENT_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });`}
            </Script>
            <Suspense fallback={null}>
              <AnalyticsRouteTracker />
            </Suspense>
          </>
        ) : null}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [{ where: { href_matches: "/*" }, eagerness: "moderate" }]
            })
          }}
        />
        <NeuralMesh />
        <Scene3DLoader />
        <div className="scanline-overlay" aria-hidden="true" />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <AppChrome>{children}</AppChrome>
        <CipherChat />
        <Analytics />
      </body>
    </html>
  );
}
