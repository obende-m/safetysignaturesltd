import Link from "next/link";
import { notFound } from "next/navigation";
import { VacancyEditor, type VacancyInput } from "@/components/admin/VacancyEditor";
import { AdminHeader } from "@/components/admin/ui";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "Edit vacancy" };

/** Handles both /admin/vacancies/new and /admin/vacancies/<uuid>. */
export default async function EditVacancyPage({ params }: { params: Promise<{ id: string }> }) {
  await requireStaff();
  const { id } = await params;

  let initial: VacancyInput = {
    title: "",
    slug: "",
    location: "Lagos",
    employmentType: "Full time",
    summary: "",
    requirements: "",
    closingDate: "",
    published: "false",
  };

  if (id !== "new") {
    if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
    const supabase = await createSessionClient();
    const { data: r } = await supabase.from("vacancies").select("*").eq("id", id).maybeSingle();
    if (!r) notFound();
    initial = {
      id: r.id,
      title: r.title,
      slug: r.slug,
      location: r.location,
      employmentType: r.employment_type,
      summary: r.summary,
      requirements: r.requirements ?? "",
      closingDate: r.closing_date ?? "",
      published: r.published ? "true" : "false",
    };
  }

  return (
    <>
      <Link href="/admin/vacancies" className="inline-flex min-h-10 items-center text-sm text-navy">
        ← All vacancies
      </Link>
      <AdminHeader title={initial.id ? "Edit vacancy" : "New vacancy"} />
      <VacancyEditor initial={initial} />
    </>
  );
}
