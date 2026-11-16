import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/company";
import { publishedServices } from "@/content/services";
import { getArticles } from "@/lib/data/content";

const staticPaths = [
  "",
  "/services",
  "/industries",
  "/training-standards",
  "/about",
  "/leadership",
  "/why-safety-signatures",
  "/news",
  "/insights",
  "/careers",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const insights = await getArticles("insight");
  return [
    ...staticPaths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...publishedServices.map((s) => ({ url: `${siteUrl}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...insights.map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.publishedAt, priority: 0.5 })),
  ];
}
