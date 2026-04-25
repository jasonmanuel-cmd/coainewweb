import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { AnalyticsRouteTracker } from "@/components/AnalyticsRouteTracker";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { NeuralMesh } from "@/components/NeuralMesh";
import { SplashIntro } from "@/components/SplashIntro";
import { organizationJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";
import "./landing-page.css";
import "./marketing-inner.css";
import "./revamp.css";

const bodySans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

const headline = Syne({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["700", "800"],
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
    images: [{ url: "/logo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaotically Organized AI",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"]
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="en">
      <body className={`${bodySans.variable} ${mono.variable} ${headline.variable} ${plusJakarta.variable} ${dmSans.variable}`}>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
              nonce={nonce}
            />
            <Script id="ga4-init" strategy="afterInteractive" nonce={nonce}>
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });`}
            </Script>
            <AnalyticsRouteTracker />
          </>
        ) : null}
        <NeuralMesh />
        <div className="scanline-overlay" aria-hidden="true" />
        <SplashIntro />
        <JsonLd data={organizationJsonLd()} />
        <AppChrome>{children}</AppChrome>
        <Analytics />
      </body>
    </html>
  );
}
