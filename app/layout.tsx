import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Syne } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";
import { AnalyticsRouteTracker } from "@/components/AnalyticsRouteTracker";
import { JsonLd } from "@/components/JsonLd";
import { NeuralMesh } from "@/components/NeuralMesh";
import { NavRail } from "@/components/NavRail";
import { Logo } from "@/components/Logo";
import { SplashIntro } from "@/components/SplashIntro";
import { organizationJsonLd } from "@/lib/schema";
import { CONTACT, GOOGLE_BUSINESS_PROFILE_URL, LEGAL_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

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
        <div className="app-frame">
          <aside className="left-rail panel">
            <div className="left-rail-top">
              <Logo />
              <div className="left-divider" />
              <NavRail />
              <div className="left-rail-utility">
                <p className="mono">DIRECT LINE</p>
                <p className="muted">{CONTACT.phoneDisplay}</p>
                <p className="muted">{CONTACT.email}</p>
                <Link className="btn btn-primary" href="/intake">
                  Run Diagnostic
                </Link>
              </div>
            </div>
          </aside>
          <div className="shell">
            {children}
            <footer className="panel footer-rail">
            <div className="footer-brand">
              <p>
                <strong>{LEGAL_NAME}</strong>
              </p>
              <p className="muted">
                {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              </p>
              <p className="muted">
                {CONTACT.phoneDisplay} · {CONTACT.email}
              </p>
            </div>
            <nav className="footer-links" aria-label="Footer">
              <Link href="/services">Services</Link>
              <Link href="/portfolio">Case studies</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/intake">Diagnostic</Link>
              <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                Google Business
              </a>
            </nav>
            <p className="muted footer-meta">
              Last updated April 2026 · {LEGAL_NAME.split(",")[0]} | Bakersfield, CA · Where Chaos Meets Clarity
            </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
