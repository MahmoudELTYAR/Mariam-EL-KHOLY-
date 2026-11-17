import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/AppShell";
import { site } from "@/data/site";
import "./globals.css";

const display = localFont({
  src: [
    { path: "../fonts/syne-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/syne-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/syne-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/syne-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../fonts/dmsans-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/dmsans-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/dmsans-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/dmsans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariam-elkholy.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — UI/UX Designer`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "UI/UX Designer",
    "Mariam Elkholy",
    "Alexandria",
    "Figma",
    "Design Systems",
    "Portfolio",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${site.name} — UI/UX Designer`,
    description: site.tagline,
    siteName: site.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — UI/UX Designer`,
    description: site.tagline,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Alexandria",
    addressCountry: "EG",
  },
  url: siteUrl,
  alumniOf: site.education.school,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
