import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";
import { primaryAction } from "@/content/site";

type Item = { slug: string; name: string; short: string; image?: ImageKey };

/**
 * Service cards: the first (the core service) spans two columns; the grid ends with a
 * consultation card. Services without a real photograph get a designed panel rather than
 * a borrowed picture.
 */
export function ServiceCards({ items }: { items: Item[] }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
      {items.map((s, i) => (
        <StaggerItem key={s.slug} className={i === 0 ? "sm:col-span-2" : ""}>
          <Link
            href={`/services/${s.slug}`}
            className={`group card-lift relative isolate flex h-[380px] flex-col justify-end overflow-hidden rounded-[24px] p-6 text-white md:h-[420px] md:p-8 ${
              s.image ? "bg-ink" : "bg-navy-deep"
            }`}
          >
            {s.image ? (
              <>
                <span className="photo-frame absolute inset-0 -z-10 bg-ink">
                  <Photo name={s.image} sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"} />
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/0" aria-hidden="true" />
              </>
            ) : (
              <span className="absolute inset-0 -z-10" aria-hidden="true">
                <span className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-navy blur-3xl transition-transform duration-700 group-hover:scale-125" />
                <span className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:40px_40px]" />
              </span>
            )}
            <span className="display block text-[1.6rem] leading-tight md:text-[1.9rem]">{s.name}</span>
            <span className="mt-2 block max-w-md text-[0.95rem] leading-relaxed text-white/75">{s.short}</span>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-[600]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-1 group-hover:bg-red group-hover:text-white">
                <Arrow />
              </span>
              Learn more
            </span>
          </Link>
        </StaggerItem>
      ))}
      <StaggerItem>
        <Link
          href={primaryAction.href}
          className="group card-lift flex h-[380px] flex-col justify-between rounded-[24px] border border-line bg-sand p-6 md:h-[420px] md:p-8"
        >
          <span className="eyebrow">Not sure where to start?</span>
          <span>
            <span className="display block text-[1.6rem] leading-tight md:text-[1.9rem]">
              We assess the site first, then recommend the services it needs.
            </span>
            <span className="btn btn-primary mt-6">
              {primaryAction.label}
              <Arrow />
            </span>
          </span>
        </Link>
      </StaggerItem>
    </Stagger>
  );
}
