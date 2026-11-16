import type { Metadata } from "next";
import { company, primaryEmail, primaryPhone, siteUrl } from "@/content/company";

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
    address: {
      "@type": "PostalAddress",
      ...(company.address.confirmed ? { streetAddress: "Security House, Salami Ogejo Street, Off Palace Way, Oko Cole" } : {}),
      addressLocality: "Oworonshoki, Lagos",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    ...(primaryPhone() ? { telephone: `+234${primaryPhone()!.value.slice(1)}` } : {}),
    ...(primaryEmail() ? { email: primaryEmail()!.value } : {}),
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
