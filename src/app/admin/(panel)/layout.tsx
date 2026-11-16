import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { requireStaff } from "@/lib/admin/auth";
import { signOut } from "@/lib/admin/actions";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/articles", label: "News and insights" },
  { href: "/admin/vacancies", label: "Vacancies" },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="p-10 text-mute">Loading…</div>}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}

async function Shell({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();
  return (
    <div className="grid min-h-svh lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-line bg-white px-6 py-6 lg:border-b-0 lg:border-r lg:py-8">
        <Logo />
        <nav aria-label="Admin" className="mt-8">
          <ul className="flex flex-wrap gap-1 lg:flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="flex min-h-11 items-center rounded-xl px-3 text-[0.95rem] font-[520] hover:bg-sand">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="flex min-h-11 items-center rounded-xl px-3 text-[0.95rem] text-mute hover:bg-sand">
                View website
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mt-8 border-t border-line pt-6 text-sm">
          <p className="font-[560]">{staff.name ?? staff.email}</p>
          <p className="text-mute">{staff.role === "admin" ? "Administrator" : "Editor"}</p>
          <form action={signOut} className="mt-3">
            <button type="submit" className="min-h-11 text-navy underline underline-offset-2">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main id="main" className="min-w-0 px-5 py-8 md:px-10 md:py-12">
        {children}
      </main>
    </div>
  );
}
