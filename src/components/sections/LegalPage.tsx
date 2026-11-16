import type { ReactNode } from "react";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="pt-[var(--nav-h)]">
      <div className="wrap pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-[720px]">
          <p className="eyebrow">Legal</p>
          <h1 className="display t-1 mt-6">{title}</h1>
          <p className="mt-6 border-y border-line py-4 font-mono text-xs text-mute">Last updated {updated}</p>
          <div className="prose-ss mt-10">{children}</div>
        </div>
      </div>
    </article>
  );
}
