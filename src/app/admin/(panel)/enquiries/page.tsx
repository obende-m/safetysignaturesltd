import { AdminHeader, DangerButton, dateTime, Empty, FilterTabs, StatusPill } from "@/components/admin/ui";
import { deleteEnquiry, updateEnquiry } from "@/lib/admin/actions";
import { requireStaff } from "@/lib/admin/auth";
import { createSessionClient } from "@/lib/supabase/server";

export const metadata = { title: "Enquiries" };

const statuses = ["new", "in_progress", "closed"] as const;

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const staff = await requireStaff();
  const { status = "" } = await searchParams;
  const supabase = await createSessionClient();

  let query = supabase
    .from("enquiries")
    .select("id, created_at, full_name, organisation, email, phone, service, location, message, status, staff_notes")
    .order("created_at", { ascending: false })
    .limit(200);
  if ((statuses as readonly string[]).includes(status)) query = query.eq("status", status);
  const { data: rows, error } = await query;

  return (
    <>
      <AdminHeader title="Enquiries" lead="Consultation requests sent from the website's contact page." />
      <FilterTabs
        base="/admin/enquiries"
        current={status}
        options={[
          { value: "", label: "All" },
          { value: "new", label: "New" },
          { value: "in_progress", label: "In progress" },
          { value: "closed", label: "Closed" },
        ]}
      />
      {error && <p className="mt-6 text-red-deep">Could not load enquiries: {error.message}</p>}
      {rows && rows.length === 0 && <Empty>No enquiries here yet.</Empty>}
      <ul className="mt-8 space-y-3">
        {rows?.map((r) => (
          <li key={r.id} className="rounded-2xl border border-line bg-white">
            <details className="group">
              <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-6 gap-y-2 p-5">
                <StatusPill status={r.status} />
                <span className="font-[600]">{r.full_name}</span>
                {r.organisation && <span className="text-mute">{r.organisation}</span>}
                <span className="text-sm">{r.service}</span>
                <span className="ml-auto font-mono text-xs text-mute">{dateTime(r.created_at)}</span>
              </summary>
              <div className="grid gap-8 border-t border-line p-5 lg:grid-cols-2">
                <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-2 text-[0.95rem]">
                  <dt className="text-mute">Email</dt>
                  <dd>
                    <a className="text-navy underline" href={`mailto:${r.email}`}>
                      {r.email}
                    </a>
                  </dd>
                  <dt className="text-mute">Phone</dt>
                  <dd>
                    <a className="text-navy underline" href={`tel:${r.phone}`}>
                      {r.phone}
                    </a>
                  </dd>
                  <dt className="text-mute">Location</dt>
                  <dd>{r.location}</dd>
                  <dt className="text-mute">Message</dt>
                  <dd className="whitespace-pre-line">{r.message}</dd>
                </dl>
                <div>
                  <form action={updateEnquiry} className="grid gap-4">
                    <input type="hidden" name="id" value={r.id} />
                    <label className="field-label" htmlFor={`status-${r.id}`}>
                      Status
                    </label>
                    <select id={`status-${r.id}`} name="status" defaultValue={r.status} className="field -mt-3">
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="closed">Closed</option>
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
                    <form action={deleteEnquiry} className="mt-4">
                      <input type="hidden" name="id" value={r.id} />
                      <DangerButton>Delete enquiry</DangerButton>
                    </form>
                  )}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
