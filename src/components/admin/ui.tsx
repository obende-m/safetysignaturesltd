import Link from "next/link";
import type { ReactNode } from "react";

export function AdminHeader({ title, lead, action }: { title: string; lead?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
      <div>
        <h1 className="display text-[2.4rem] leading-tight">{title}</h1>
        {lead && <p className="mt-2 max-w-2xl text-mute">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const tone: Record<string, string> = {
    new: "bg-red/10 text-red-deep",
    in_progress: "bg-navy/10 text-navy",
    reviewing: "bg-navy/10 text-navy",
    shortlisted: "bg-[#1f7a4d]/10 text-[#1f7a4d]",
    hired: "bg-[#1f7a4d]/10 text-[#1f7a4d]",
    published: "bg-[#1f7a4d]/10 text-[#1f7a4d]",
    closed: "bg-ink/10 text-ink/70",
    rejected: "bg-ink/10 text-ink/70",
    draft: "bg-ink/10 text-ink/70",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-[560] ${tone[status] ?? "bg-ink/10"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export function FilterTabs({ base, current, options }: { base: string; current: string; options: { value: string; label: string }[] }) {
  return (
    <nav aria-label="Filter" className="mt-6 flex flex-wrap gap-2">
      {options.map((o) => (
        <Link
          key={o.value}
          href={o.value ? `${base}?status=${o.value}` : base}
          aria-current={current === o.value ? "page" : undefined}
          className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm ${
            current === o.value ? "border-ink bg-ink text-paper" : "border-line bg-white hover:border-ink"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </nav>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="mt-10 rounded-2xl border border-dashed border-line bg-white p-8 text-center text-mute">{children}</p>;
}

export const dateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

export function DangerButton({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className="min-h-10 rounded-full border border-red/40 px-4 text-sm text-red-deep hover:bg-red hover:text-white">
      {children}
    </button>
  );
}
