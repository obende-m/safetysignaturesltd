import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { HeroLine, HeroMedia, HeroText } from "@/components/motion/HeroEnter";
import { Reveal } from "@/components/motion/Reveal";
import { CloseCTA, SectionHead, TierLadder } from "@/components/sections/Blocks";
import { Arrow, ButtonLink } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { getService, inSentence, publishedServices } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return publishedServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({ path: `/services/${service.slug}`, title: service.seo.title, description: service.seo.description });
}

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-[80svh] pt-[var(--nav-h)]" aria-busy="true" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const index = publishedServices.findIndex((s) => s.slug === service.slug);
  const related = service.related.map((r) => publishedServices.find((s) => s.slug === r)).filter((s) => s !== undefined);
  const enquireHref = `/contact?service=${encodeURIComponent(service.name)}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-[var(--nav-h)]">
        <div className="wrap grid gap-10 pb-16 pt-10 md:pb-24 md:pt-16 lg:grid-cols-12 lg:gap-14">
          <HeroText className="flex flex-col lg:col-span-7">
            <HeroLine>
              <nav aria-label="Breadcrumb" className="font-mono text-xs text-mute">
                <Link href="/services" className="link-draw inline-flex min-h-10 items-center">
                  Services
                </Link>
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </nav>
            </HeroLine>
            <HeroLine>
              <h1 className="display t-1 mt-4 max-w-[16ch] text-balance">{service.name}</h1>
            </HeroLine>
            <HeroLine>
              <p className="lead mt-7 max-w-[54ch] text-mute">{service.intro}</p>
            </HeroLine>
            <HeroLine className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={enquireHref}>Request a consultation</ButtonLink>
            </HeroLine>
          </HeroText>

          <div className="lg:col-span-5">
            {service.image ? (
              <HeroMedia className="relative aspect-[4/5] max-h-[620px] w-full overflow-hidden rounded-[28px] bg-sand">
                <Photo name={service.image} sizes="(min-width: 1024px) 40vw, 100vw" priority />
              </HeroMedia>
            ) : (
              <Reveal className="flex h-full flex-col justify-between rounded-[28px] bg-ink p-8 text-paper md:p-10">
                <p className="font-mono text-xs text-mute-dark">Who it is for</p>
                <ul className="mt-10 space-y-4">
                  {service.audience.map((a) => (
                    <li key={a} className="display border-t border-line-dark pt-4 text-[1.5rem] leading-snug">
                      {a}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* How we deliver it */}
      <section className="bg-white py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHead eyebrow="How we deliver it" title={`How we plan ${inSentence(service.name)}`} lead={service.approach} />
          </div>
          {service.image && (
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
              <p className="font-mono text-xs text-mute">Who it is for</p>
              <ul className="mt-5 border-t border-line">
                {service.audience.map((a) => (
                  <li key={a} className="flex items-baseline gap-4 border-b border-line py-4 text-[1.05rem]">
                    <span className="h-px w-4 shrink-0 translate-y-[-4px] bg-red" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="What is included" title={`What our ${inSentence(service.name)} covers`} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <li key={c.title} className="bg-paper p-7 md:p-9">
                <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-[1.15rem] font-[600] leading-snug">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {service.slug === "manned-guarding" && (
        <section className="on-dark bg-navy-deep text-paper">
          <div className="wrap py-24 md:py-32">
            <SectionHead
              dark
              eyebrow="Guard tiers"
              title="Platinum, Diamond and Standard officers"
              lead="Each post is staffed from the tier that fits its duties, and a Platinum officer can lead it as Guard Force Commander."
            />
            <div className="mt-14">
              <TierLadder />
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-24 md:py-28">
          <div className="wrap">
            <SectionHead eyebrow="Related services" title="Services often combined with this one" />
            <ul className="mt-12 border-t border-line">
              {related.map((r) => (
                <li key={r.slug} className="border-b border-line">
                  <Link href={`/services/${r.slug}`} className="group flex items-center justify-between gap-6 py-7">
                    <span>
                      <span className="display block text-[1.7rem] leading-tight transition-transform duration-500 group-hover:translate-x-1.5">
                        {r.name}
                      </span>
                      <span className="mt-2 block text-mute">{r.short}</span>
                    </span>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CloseCTA
        title={`Request a consultation for ${inSentence(service.name)}`}
        body="Tell us about the site, the event or the person to be protected. We will assess what is needed and propose the officers, equipment and plan."
      />
    </>
  );
}
