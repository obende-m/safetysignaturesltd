import Link from "next/link";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero, SectionHead, TierLadder } from "@/components/sections/Blocks";
import { Arrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { inSentence, publishedServices } from "@/content/services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/services",
  title: "Security services",
  description:
    "Manned guarding, K9 services, secure mobility, executive protection, event security, security equipment and consultancy from Safety Signatures in Lagos.",
});

export default function ServicesPage() {
  const [core, ...rest] = publishedServices;
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Security services built around a trained guard force"
        lead="Manned guarding is the core of the business. Every other service extends the same officers, training and supervision to a new need: people on the move, events, dogs, equipment or advice."
      />

      {/* Core service, presented large */}
      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <Link href={`/services/${core.slug}`} className="group grid overflow-hidden rounded-[24px] bg-ink text-paper lg:grid-cols-12">
            <ImageReveal className="photo-frame relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
              {core.image && <Photo name={core.image} sizes="(min-width: 1024px) 58vw, 100vw" />}
            </ImageReveal>
            <div className="flex flex-col p-8 md:p-12 lg:col-span-5">
              <p className="font-mono text-xs text-mute-dark">01 Â· Core service</p>
              <h2 className="display t-2 mt-6">{core.name}</h2>
              <p className="mt-5 leading-relaxed text-mute-dark">{core.intro}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-10 font-[560]">
                <span className="link-draw">See manned guarding</span>
                <Arrow />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="band bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="More services" title="Services that extend the guard force" />
          <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 0.06}>
                <Link href={`/services/${s.slug}`} className="group card-lift flex h-full flex-col">
                  <div className="photo-frame relative aspect-[4/3] rounded-[22px]">
                    {s.image ? (
                      <Photo name={s.image} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" />
                    ) : (
                      <div className="flex h-full flex-col justify-end bg-navy-deep p-7 text-paper">
                        <span className="display text-[2.4rem] leading-none text-paper/90">{String(i + 2).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                  <p className="mt-6 font-mono text-xs text-mute">{String(i + 2).padStart(2, "0")}</p>
                  <h3 className="display mt-2 text-[1.75rem] leading-tight transition-colors group-hover:text-navy">{s.name}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-[560] text-navy">
                    <span className="link-draw">See {inSentence(s.name)}</span>
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band on-dark bg-navy-deep text-paper">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            dark
            eyebrow="Guard tiers"
            title="Three tiers of officer for every service"
            lead="Whichever service you need, the officers come from one of three tiers, chosen by the duties of the post."
          />
          <div className="mt-14">
            <TierLadder />
          </div>
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
