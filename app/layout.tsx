import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { AnalyticsRouteTracker } from "@/components/AnalyticsRouteTracker";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { NeuralMesh } from "@/components/NeuralMesh";
import { SplashIntro } from "@/components/SplashIntro";
import { organizationJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";
import "./landing-page.css";

const inter = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-inter",
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

export const metadata: Metadata = {
  metadataBase: new URL("https://chaoticallyorganizedai.com"),
  title: {
    default: "Chaotically Organized AI",
    template: "%s | Chaotically Organized AI"
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Chaotically Organized AI",
    description: SITE_DESCRIPTION,
    url: "https://chaoticallyorganizedai.com",
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

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return (
    <html lang="en">
      <body className={`${inter.variable} ${mono.variable} ${headline.variable}`}>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
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
      </body>
    </html>
  );
}
