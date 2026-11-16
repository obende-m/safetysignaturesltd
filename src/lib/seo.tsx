import type { Metadata } from "next";
import { company, siteUrl } from "@/content/company";

/** Per-page metadata with a canonical URL and matching Open Graph tags. */
export function pageMeta({
  path,
  title,
  description,
  image,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.shortName}`,
      description,
      url: `${siteUrl}${path}`,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

/** Organization structured data. Only facts that are published on the site go in here. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    name: company.name,
    slogan: company.tagline,
    url: siteUrl,
    logo: `${siteUrl}/images/brand/safety-signatures-logo.png`,
    image: `${siteUrl}/og.jpg`,
    areaServed: { "@type": "City", name: "Lagos" },
    address: { "@type": "PostalAddress", addressLocality: "Oworonshoki, Lagos", addressCountry: "NG" },
    sameAs: company.socials.filter((s) => s.confirmed).map((s) => s.href),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script element.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
