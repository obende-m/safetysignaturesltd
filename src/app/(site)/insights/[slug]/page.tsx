import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { CloseCTA, formatDate } from "@/components/sections/Blocks";
import { ArticleBody } from "@/components/ui/ArticleBody";
import { getArticles, getInsight } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";
import { company, siteUrl } from "@/content/company";
import { JsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const insights = await getArticles("insight");
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) return {};
  return pageMeta({ path: `/insights/${article.slug}`, title: article.title, description: article.excerpt });
}

export default function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[80svh] pt-[var(--nav-h)]" aria-busy="true" />}>
      <InsightContent params={params} />
    </Suspense>
  );
}

async function InsightContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article || !article.body) notFound();

  return (
    <>
      <article className="pt-[var(--nav-h)]">
        <div className="wrap pb-20 pt-14 md:pb-28 md:pt-20">
          <Reveal className="mx-auto max-w-[760px]">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-mute">
              <Link href="/insights" className="link-draw inline-flex min-h-10 items-center">
                Weekly Security Tonic
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span>{article.category}</span>
            </nav>
            <h1 className="display t-1 mt-4 text-balance">{article.title}</h1>
            <p className="lead mt-6 text-mute">{article.excerpt}</p>
            <p className="mt-8 flex flex-wrap gap-x-6 gap-y-1 border-y border-line py-4 font-mono text-xs text-mute">
              <span>{formatDate(article.publishedAt, article.dateLabel)}</span>
              {article.readingMinutes ? <span>{article.readingMinutes} min read</span> : null}
              <span>{company.name}</span>
            </p>
          </Reveal>
          <div className="mx-auto mt-12 max-w-[680px]">
            <ArticleBody body={article.body} />
            <div className="mt-14 border-t border-line pt-8">
              <Link href="/insights" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span aria-hidden="true">←</span>
                <span className="link-draw">See all security insights</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedAt,
          author: { "@type": "Organization", name: company.name },
          publisher: { "@type": "Organization", name: company.name, logo: `${siteUrl}/images/brand/safety-signatures-logo.png` },
          mainEntityOfPage: `${siteUrl}/insights/${article.slug}`,
        }}
      />
      <CloseCTA />
    </>
  );
}
