import Link from "next/link";
import { AdminHeader, DangerButton, Empty, StatusPill } from "@/components/admin/ui";
import { deleteArticle } from "@/lib/admin/actions";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "News and insights" };

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { saved } = await searchParams;
  const supabase = await createSessionClient();
  const { data: rows, error } = await supabase
    .from("articles")
    .select("id, kind, title, slug, publication, published_at, status")
    .order("published_at", { ascending: false });

  return (
    <>
      <AdminHeader
        title="News and insights"
        lead="Press coverage (linked to the original publication) and Security Insights articles written by the team."
        action={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/articles/new?kind=insight" className="btn btn-primary">
              New insight article
            </Link>
            <Link href="/admin/articles/new?kind=media" className="btn btn-outline">
              Add press coverage
            </Link>
          </div>
        }
      />
      {saved && (
        <p role="status" className="mt-6 rounded-2xl bg-[#1f7a4d]/10 p-4 text-[#1f7a4d]">
          Saved. The website updates straight away.
        </p>
      )}
      {error && <p className="mt-6 text-red-deep">Could not load articles: {error.message}</p>}
      {rows && rows.length === 0 && <Empty>No articles yet. Run supabase/seed.sql to load the launch content.</Empty>}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-[0.95rem]">
          <thead className="border-b border-line font-mono text-xs text-mute">
            <tr>
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal">Type</th>
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal">Status</th>
              <th className="p-4 font-normal">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((r) => (
              <tr key={r.id} className="border-b border-line last:border-0">
                <td className="p-4">
                  <Link href={`/admin/articles/${r.id}`} className="font-[560] text-navy hover:underline">
                    {r.title}
                  </Link>
                  {r.publication && <span className="block text-sm text-mute">{r.publication}</span>}
                </td>
                <td className="p-4">{r.kind === "media" ? "Press coverage" : "Insight"}</td>
                <td className="p-4 font-mono text-xs">{r.published_at}</td>
                <td className="p-4">
                  <StatusPill status={r.status} />
                </td>
                <td className="p-4 text-right">
                  {staff.role === "admin" && (
                    <form action={deleteArticle}>
                      <input type="hidden" name="id" value={r.id} />
                      <DangerButton>Delete</DangerButton>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
