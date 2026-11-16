import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, ExternalArrow } from "@/components/ui/Buttons";
import { primaryAction } from "@/content/site";
import { tiers } from "@/content/standards";
import { mediaCategoryLabels, type Article, type MediaCategory } from "@/content/articles";
import { company, formatPhone, mapSearchUrl, primaryEmail, primaryPhone, telHref } from "@/content/company";

export function SectionHead({
  eyebrow,
  title,
  lead,
  className = "",
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className={className}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`display t-2 mt-5 max-w-[18ch] ${dark ? "text-paper" : ""}`}>{title}</h2>
      {lead && <p className={`lead mt-6 max-w-[56ch] ${dark ? "text-mute-dark" : "text-mute"}`}>{lead}</p>}
    </Reveal>
  );
}

export function formatDate(iso: string, label?: string | null) {
  if (label) return label;
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** The three guard tiers. Used on the homepage, Manned Guarding and Why Safety Signatures. */
export function TierLadder({ dark = true }: { dark?: boolean }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[28px] bg-line-dark/70 md:grid-cols-3">
      {tiers.map((t, i) => (
        <li key={t.name} className={`flex flex-col p-7 md:p-9 ${dark ? "bg-ink-soft" : "bg-white"}`}>
          <Reveal delay={i * 0.08}>
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#d9dde6]" : i === 1 ? "bg-[#8fb3e6]" : "bg-red"}`}
                aria-hidden="true"
              />
              <span className={`font-mono text-xs ${dark ? "text-mute-dark" : "text-mute"}`}>Tier {i + 1}</span>
            </div>
            <h3 className={`display mt-6 text-[2rem] leading-tight md:text-[2.3rem] ${dark ? "text-paper" : ""}`}>{t.name}</h3>
            <p className={`mt-2 font-[560] ${dark ? "text-paper/90" : ""}`}>{t.role}</p>
            <p className={`mt-4 text-[0.97rem] leading-relaxed ${dark ? "text-mute-dark" : "text-mute"}`}>{t.drawnFrom}</p>
          </Reveal>
          <div className={`mt-8 border-t pt-6 ${dark ? "border-line-dark" : "border-line"}`}>
            <p className={`font-mono text-xs ${dark ? "text-mute-dark" : "text-mute"}`}>Typical duties</p>
            <ul className={`mt-3 space-y-2 ${dark ? "text-paper/90" : ""}`}>
              {t.duties.map((d) => (
                <li key={d} className="flex items-baseline gap-3">
                  <span className="h-px w-3 shrink-0 translate-y-[-3px] bg-red" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <p className={`mt-auto pt-8 text-[0.95rem] leading-relaxed ${dark ? "text-paper/80" : "text-ink/80"}`}>
            <span className={`font-mono text-xs ${dark ? "text-mute-dark" : "text-mute"}`}>Suits </span>
            {t.suits}
          </p>
        </li>
      ))}
    </ol>
  );
}

/** Editorial list of press coverage, each linking to the original article. */
export function MediaList({ items }: { items: Article[] }) {
  return (
    <ul className="border-t border-line">
      {items.map((m) => (
        <li key={m.slug} className="border-b border-line">
          <a
            href={m.sourceUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-x-8 gap-y-2 py-7 md:grid-cols-12 md:items-baseline"
          >
            <span className="font-mono text-xs text-mute md:col-span-3">
              {formatDate(m.publishedAt, m.dateLabel)}
              <span className="mt-1 block text-ink/70">{m.publication}</span>
            </span>
            <span className="md:col-span-7">
              <span className="block text-[1.15rem] font-[560] leading-snug transition-colors group-hover:text-navy md:text-[1.25rem]">
                {m.title}
              </span>
              <span className="mt-2 block text-[0.95rem] leading-relaxed text-mute">{m.excerpt}</span>
            </span>
            <span className="flex items-center justify-between gap-3 md:col-span-2 md:flex-col md:items-end">
              {m.category && (
                <span className="rounded-full border border-line px-3 py-1 text-xs text-ink/80">
                  {mediaCategoryLabels[m.category as MediaCategory] ?? m.category}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-[550] text-navy">
                Read on {m.publication?.replace(/ \(.*\)/, "")}
                <ExternalArrow />
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Closing band shared by most pages. */
export function CloseCTA({
  title = "Tell us about the site you need protected",
  body = "Describe the location, the hours and what worries you. We will arrange a site assessment and recommend the officers and equipment the post needs.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink text-paper">
      <div className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow">{company.tagline}</p>
          <h2 className="display t-1 mt-6 max-w-[16ch]">{title}</h2>
          <p className="lead mt-8 max-w-[52ch] text-mute-dark">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
          </div>
        </Reveal>
        <Reveal className="self-end lg:col-span-4" delay={0.1}>
          <dl className="space-y-6 border-t border-line-dark pt-6 text-[0.97rem]">
            <div>
              <dt className="font-mono text-xs text-mute-dark">Head office</dt>
              <dd className="mt-1.5">
                <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
                  {company.district}
                </a>
              </dd>
            </div>
            {primaryPhone() && (
              <div>
                <dt className="font-mono text-xs text-mute-dark">Call Lagos</dt>
                <dd className="mt-1.5">
                  <a href={telHref(primaryPhone()!.value)} className="link-draw">
                    {formatPhone(primaryPhone()!.value)}
                  </a>
                </dd>
              </div>
            )}
            {primaryEmail() && (
              <div>
                <dt className="font-mono text-xs text-mute-dark">Email</dt>
                <dd className="mt-1.5 break-all">
                  <a href={`mailto:${primaryEmail()!.value}`} className="link-draw">
                    {primaryEmail()!.value}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="font-mono text-xs text-mute-dark">Recruitment</dt>
              <dd className="mt-1.5">
                <Link href="/careers" className="link-draw">
                  Apply to join the guard force
                </Link>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Inner-page hero: eyebrow, title and lead on the left, optional picture or aside on the right. */
export function PageHero({
  eyebrow,
  title,
  lead,
  aside,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="pt-[var(--nav-h)]">
      <div className="wrap grid gap-10 pb-16 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-14">
        <div className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display t-1 mt-6 max-w-[17ch] text-balance">{title}</h1>
            <div className="lead mt-7 max-w-[58ch] text-mute">{lead}</div>
            {children}
          </Reveal>
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
