import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { company, siteUrl } from "@/content/company";
import "./globals.css";

// Headings: Inter Tight (tight, modern grotesk). Body and labels: Inter.
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Security guards and protection in Lagos`,
    template: `%s | ${company.shortName}`,
  },
  description:
    "Safety Signatures Limited provides trained security guards, executive protection, event security, K9 services and security consultancy for organisations in Lagos, Nigeria.",
  applicationName: company.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: company.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Safety Signatures security officers in formation" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${interTight.variable} ${inter.variable} antialiased`}>
      <body className="min-h-svh">{children}</body>
    </html>
  );
}
