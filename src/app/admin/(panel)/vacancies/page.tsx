import Link from "next/link";
import { AdminHeader, DangerButton, Empty, StatusPill } from "@/components/admin/ui";
import { deleteVacancy } from "@/lib/admin/actions";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "Vacancies" };

export default async function VacanciesPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const staff = await requireStaff();
  const { saved } = await searchParams;
  const supabase = await createSessionClient();
  const { data: rows, error } = await supabase
    .from("vacancies")
    .select("id, title, location, employment_type, closing_date, published")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminHeader
        title="Vacancies"
        lead="Published vacancies appear on the careers page and in the application form."
        action={
          <Link href="/admin/vacancies/new" className="btn btn-primary">
            New vacancy
          </Link>
        }
      />
      {saved && (
        <p role="status" className="mt-6 rounded-2xl bg-[#1f7a4d]/10 p-4 text-[#1f7a4d]">
          Saved. The careers page updates straight away.
        </p>
      )}
      {error && <p className="mt-6 text-red-deep">Could not load vacancies: {error.message}</p>}
      {rows && rows.length === 0 && <Empty>No vacancies yet.</Empty>}
      <ul className="mt-8 space-y-3">
        {rows?.map((r) => (
          <li key={r.id} className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-white p-5">
            <StatusPill status={r.published ? "published" : "draft"} />
            <Link href={`/admin/vacancies/${r.id}`} className="font-[600] text-navy hover:underline">
              {r.title}
            </Link>
            <span className="text-sm text-mute">
              {r.location} · {r.employment_type}
              {r.closing_date ? ` · closes ${r.closing_date}` : ""}
            </span>
            {staff.role === "admin" && (
              <form action={deleteVacancy} className="ml-auto">
                <input type="hidden" name="id" value={r.id} />
                <DangerButton>Delete</DangerButton>
              </form>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
