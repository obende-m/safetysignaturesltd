import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { isSupabaseConfigured } from "@/lib/env";
import { createPublicClient } from "@/lib/supabase/server";
import { seedInsights, seedMedia, type Article } from "@/content/articles";

export type Vacancy = {
  id: string;
  title: string;
  slug: string;
  location: string;
  employmentType: string;
  summary: string;
  requirements: string | null;
  closingDate: string | null;
};

type ArticleRow = {
  slug: string;
  kind: "media" | "insight";
  title: string;
  excerpt: string;
  body: string | null;
  category: string | null;
  publication: string | null;
  source_url: string | null;
  published_at: string;
  date_label: string | null;
  reading_minutes: number | null;
};

const toArticle = (r: ArticleRow): Article => ({
  slug: r.slug,
  kind: r.kind,
  title: r.title,
  excerpt: r.excerpt,
  body: r.body,
  category: r.category,
  publication: r.publication,
  sourceUrl: r.source_url,
  publishedAt: r.published_at,
  dateLabel: r.date_label,
  readingMinutes: r.reading_minutes,
});

const byDateDesc = (a: Article, b: Article) => b.publishedAt.localeCompare(a.publishedAt);

/** Published articles of one kind. Cached; admin edits call updateTag("articles"). */
export async function getArticles(kind: "media" | "insight"): Promise<Article[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");

  if (!isSupabaseConfigured()) {
    return [...(kind === "media" ? seedMedia : seedInsights)].sort(byDateDesc);
  }

  const { data, error } = await createPublicClient()
    .from("articles")
    .select("slug, kind, title, excerpt, body, category, publication, source_url, published_at, date_label, reading_minutes")
    .eq("kind", kind)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[content] Failed to load articles:", error.message);
    return [];
  }
  return (data as ArticleRow[]).map(toArticle);
}

export async function getInsight(slug: string): Promise<Article | null> {
  const all = await getArticles("insight");
  return all.find((a) => a.slug === slug) ?? null;
}

/** Published vacancies. Without Supabase there are none: vacancies only ever come from the database. */
export async function getVacancies(): Promise<Vacancy[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("vacancies");

  if (!isSupabaseConfigured()) return [];

  const { data, error } = await createPublicClient()
    .from("vacancies")
    .select("id, title, slug, location, employment_type, summary, requirements, closing_date")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[content] Failed to load vacancies:", error.message);
    return [];
  }
  return data.map((v) => ({
    id: v.id,
    title: v.title,
    slug: v.slug,
    location: v.location,
    employmentType: v.employment_type,
    summary: v.summary,
    requirements: v.requirements,
    closingDate: v.closing_date,
  }));
}
