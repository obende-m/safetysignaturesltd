import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleEditor, type ArticleInput } from "@/components/admin/ArticleEditor";
import { AdminHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit article" };

/** Handles both /admin/articles/new and /admin/articles/<uuid>. */
export default async function EditArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ kind?: string }>;
}) {
  await requireStaff();
  const { id } = await params;
  const { kind } = await searchParams;

  let initial: ArticleInput = {
    kind: kind === "media" ? "media" : "insight",
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "",
    publication: "",
    sourceUrl: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    dateLabel: "",
    readingMinutes: "",
    status: "draft",
  };

  if (id !== "new") {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const supabase = await createSessionClient();
    const { data: a } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
    if (!a) notFound();
    initial = {
      id: a.id,
      kind: a.kind,
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt,
      body: a.body ?? "",
      category: a.category ?? "",
      publication: a.publication ?? "",
      sourceUrl: a.source_url ?? "",
      publishedAt: a.published_at,
      dateLabel: a.date_label ?? "",
      readingMinutes: a.reading_minutes ? String(a.reading_minutes) : "",
      status: a.status,
    };
  }

  return (
    <>
      <Link href="/admin/articles" className="inline-flex min-h-10 items-center text-sm text-navy">
        ← All articles
      </Link>
      <AdminHeader title={initial.id ? "Edit article" : initial.kind === "media" ? "Add press coverage" : "New insight article"} />
      <ArticleEditor initial={initial} />
    </>
  );
}
