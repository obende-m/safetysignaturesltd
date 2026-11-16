import { AdminHeader, DangerButton, dateTime, Empty, FilterTabs, StatusPill } from "@/components/admin/ui";
import { deleteApplication, updateApplication } from "@/lib/admin/actions";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "Applications" };

const statuses = ["new", "reviewing", "shortlisted", "rejected", "hired"] as const;

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const staff = await requireStaff();
  const { status = "" } = await searchParams;
  const supabase = await createSessionClient();

  let query = supabase
    .from("applications")
    .select(
      "id, created_at, position, full_name, email, phone, state_of_residence, qualification, experience_years, previous_service, cover_note, status, staff_notes, vacancies(title)",
    )
    .order("created_at", { ascending: false })
    .limit(200);
  if ((statuses as readonly string[]).includes(status)) query = query.eq("status", status);
  const { data: rows, error } = await query;

  return (
    <>
      <AdminHeader
        title="Applications"
        lead="Job applications from the careers page. CVs open through a private link that expires after one minute."
      />
      <FilterTabs
        base="/admin/applications"
        current={status}
        options={[{ value: "", label: "All" }, ...statuses.map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) }))]}
      />
      {error && <p className="mt-6 text-red-deep">Could not load applications: {error.message}</p>}
      {rows && rows.length === 0 && <Empty>No applications here yet.</Empty>}
      <ul className="mt-8 space-y-3">
        {rows?.map((r) => {
          const vacancy = (r.vacancies as unknown as { title: string } | null)?.title;
          return (
            <li key={r.id} className="rounded-2xl border border-line bg-white">
              <details>
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-2 p-5">
                  <StatusPill status={r.status} />
                  <span className="font-[600]">{r.full_name}</span>
                  <span className="text-sm">{vacancy ?? r.position}</span>
                  <span className="ml-auto font-mono text-xs text-mute">{dateTime(r.created_at)}</span>
                </summary>
                <div className="grid gap-8 border-t border-line p-5 lg:grid-cols-2">
                  <div>
                    <dl className="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2 text-[0.95rem]">
                      <dt className="text-mute">Position</dt>
                      <dd>{r.position}</dd>
                      <dt className="text-mute">Email</dt>
                      <dd>
                        <a className="text-navy underline" href={`mailto:${r.email}`}>
                          {r.email}
                        </a>
                      </dd>
                      <dt className="text-mute">Phone</dt>
                      <dd>{r.phone}</dd>
                      <dt className="text-mute">State</dt>
                      <dd>{r.state_of_residence}</dd>
                      <dt className="text-mute">Qualification</dt>
                      <dd>{r.qualification}</dd>
                      <dt className="text-mute">Experience</dt>
                      <dd>{r.experience_years} years</dd>
                      <dt className="text-mute">Uniformed service</dt>
                      <dd>{r.previous_service ? "Yes" : "No"}</dd>
                      {r.cover_note && (
                        <>
                          <dt className="text-mute">Note</dt>
                          <dd className="whitespace-pre-line">{r.cover_note}</dd>
                        </>
                      )}
                    </dl>
                    <a href={`/admin/cv/${r.id}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6">
                      Open the CV
                    </a>
                  </div>
                  <div>
                    <form action={updateApplication} className="grid gap-4">
                      <input type="hidden" name="id" value={r.id} />
                      <label className="field-label" htmlFor={`status-${r.id}`}>
                        Status
                      </label>
                      <select id={`status-${r.id}`} name="status" defaultValue={r.status} className="field -mt-3">
                        {statuses.map((s) => (
                          <option key={s} value={s}>
                            {s[0].toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                      <label className="field-label" htmlFor={`notes-${r.id}`}>
                        Staff notes
                      </label>
                      <textarea id={`notes-${r.id}`} name="staffNotes" defaultValue={r.staff_notes ?? ""} className="field -mt-3 !min-h-24" />
                      <button type="submit" className="btn btn-primary w-fit">
                        Save changes
                      </button>
                    </form>
                    {staff.role === "admin" && (
                      <form action={deleteApplication} className="mt-4">
                        <input type="hidden" name="id" value={r.id} />
                        <DangerButton>Delete application and CV</DangerButton>
                      </form>
                    )}
                  </div>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </>
  );
}
