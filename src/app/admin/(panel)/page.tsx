import Link from "next/link";
import { AdminHeader } from "@/components/admin/ui";
import { createSessionClient } from "@/lib/supabase/server";
import { requireStaff } from "@/lib/admin/auth";

export const metadata = { title: "Overview" };

export default async function AdminHome({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireStaff();
  const { error } = await searchParams;
  const supabase = await createSessionClient();

  const count = async (table: string, filter?: [string, string]) => {
    let q = supabase.from(table).select("id", { count: "exact", head: true });
    if (filter) q = q.eq(filter[0], filter[1]);
    const { count } = await q;
    return count ?? 0;
  };

  const [newEnquiries, newApplications, published, drafts, openVacancies] = await Promise.all([
    count("enquiries", ["status", "new"]),
    count("applications", ["status", "new"]),
    count("articles", ["status", "published"]),
    count("articles", ["status", "draft"]),
    count("vacancies", ["published", "true"]),
  ]);

  const cards = [
    { label: "New enquiries", value: newEnquiries, href: "/admin/enquiries?status=new" },
    { label: "New applications", value: newApplications, href: "/admin/applications?status=new" },
    { label: "Published articles", value: published, href: "/admin/articles" },
    { label: "Draft articles", value: drafts, href: "/admin/articles" },
    { label: "Open vacancies", value: openVacancies, href: "/admin/vacancies" },
  ];

  return (
    <>
      <AdminHeader title="Overview" lead="Enquiries and applications waiting for a reply, and the state of the website's content." />
      {error === "forbidden" && (
        <p role="alert" className="mt-6 rounded-2xl bg-red/5 p-4 text-red-deep">
          Only administrators can do that.
        </p>
      )}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="card-lift block rounded-2xl border border-line bg-white p-6">
              <span className="display block text-[2.6rem] leading-none">{c.value}</span>
              <span className="mt-3 block text-sm text-mute">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
