import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { HeroLine, HeroText } from "@/components/motion/HeroEnter";
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
  split = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  dark?: boolean;
  /** Title on the left, lead on the right (full-width section heads). */
  split?: boolean;
}) {
  if (split) {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12 ${className}`}>
        <Reveal className="lg:col-span-7">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className={`display t-2 mt-5 max-w-[20ch] text-balance ${dark ? "text-paper" : ""}`}>{title}</h2>
        </Reveal>
        {lead && (
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className={`lead max-w-[52ch] ${dark ? "text-mute-dark" : "text-mute"}`}>{lead}</p>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={className}>
      <Reveal>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className={`display t-2 mt-5 max-w-[20ch] text-balance ${dark ? "text-paper" : ""}`}>{title}</h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.08}>
          <p className={`lead mt-6 max-w-[56ch] ${dark ? "text-mute-dark" : "text-mute"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function formatDate(iso: string, label?: string | null) {
  if (label) return label;
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/** The three guard tiers. Used on the homepage, Manned Guarding and Why Safety Signatures. */
export function TierLadder({ dark = true }: { dark?: boolean }) {
  return (
    <Stagger as="ol" className="grid gap-4 md:grid-cols-3" gap={0.12}>
      {tiers.map((t, i) => (
        <StaggerItem
          as="li"
          key={t.name}
          className={`card-lift flex flex-col rounded-[24px] border p-7 md:p-9 ${
            dark ? "border-white/10 bg-white/[0.04] hover:border-white/20" : "border-line bg-white"
          }`}
        >
          <div>
            <div className="flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-[#d9dde6]" : i === 1 ? "bg-[#8fb3e6]" : "bg-red"}`}
                aria-hidden="true"
              />
              <span className={`font-mono text-xs ${dark ? "text-mute-dark" : "text-mute"}`}>Tier {i + 1}</span>
            </div>
            <h3 className={`display mt-6 text-[1.9rem] leading-tight md:text-[2.15rem] ${dark ? "text-paper" : ""}`}>{t.name}</h3>
            <p className={`mt-2 font-[560] ${dark ? "text-paper/90" : ""}`}>{t.role}</p>
            <p className={`mt-4 text-[0.97rem] leading-relaxed ${dark ? "text-mute-dark" : "text-mute"}`}>{t.drawnFrom}</p>
          </div>
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
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Editorial list of press coverage, each linking to the original article. */
export function MediaList({ items }: { items: Article[] }) {
  return (
    <Stagger as="ul" className="border-t border-line" gap={0.06}>
      {items.map((m) => (
        <StaggerItem as="li" key={m.slug} className="border-b border-line">
          <a
            href={m.sourceUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-x-8 gap-y-2 rounded-2xl py-7 transition-[background-color,padding] duration-500 hover:bg-sand md:grid-cols-12 md:items-baseline md:hover:px-5"
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
        </StaggerItem>
      ))}
    </Stagger>
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
    <section className="px-2 pb-2 md:px-3 md:pb-3">
      <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-ink text-paper">
      <div
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-navy/70 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-[380px] w-[380px] rounded-full bg-red/25 blur-[120px]"
        aria-hidden="true"
      />
      <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow">{company.tagline}</p>
          <h2 className="display t-1 mt-6 max-w-[16ch] text-balance">{title}</h2>
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
    <section className="px-2 pt-[var(--nav-h)] md:px-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-sand">
        <div
          className="pointer-events-none absolute -right-32 -top-48 -z-10 h-[520px] w-[620px] rounded-full bg-[#d9e2f5] blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(rgba(10,19,48,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,19,48,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
          aria-hidden="true"
        />
        <div className="wrap grid gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-14">
          <HeroText className={aside ? "lg:col-span-7" : "lg:col-span-10"} delay={0.05}>
            <HeroLine>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.85rem] text-mute">
                <Link href="/" className="inline-flex min-h-10 items-center font-[550] text-ink/70 transition-colors hover:text-navy">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <span className="eyebrow">{eyebrow}</span>
              </nav>
            </HeroLine>
            <HeroLine>
              <h1 className="display t-1 mt-5 max-w-[17ch] text-balance">{title}</h1>
            </HeroLine>
            <HeroLine>
              <div className="lead mt-6 max-w-[58ch] text-mute">{lead}</div>
            </HeroLine>
            {children && <HeroLine>{children}</HeroLine>}
          </HeroText>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
