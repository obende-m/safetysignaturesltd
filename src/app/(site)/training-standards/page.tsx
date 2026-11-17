import Link from "next/link";
import { HeroMedia } from "@/components/motion/HeroEnter";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero, SectionHead } from "@/components/sections/Blocks";
import { Photo } from "@/components/ui/Photo";
import { curriculum, curriculumModuleTotal, tiers, welfare } from "@/content/standards";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/training-standards",
  title: "Training and standards",
  description:
    "How Safety Signatures trains its security officers: a 26-module curriculum covering ethics, minimum force, access control, crowd control, first aid, crisis management and report writing.",
});

const listed = curriculum.reduce((n, t) => n + t.modules.length, 0);

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Training and standards"
        title="Training every officer to a written curriculum"
        lead={`Our officers train to a ${curriculumModuleTotal}-module curriculum before and during deployment. It covers the law and conduct of guarding, prevention and control, emergencies, and the records that make a post accountable.`}
        aside={
          <HeroMedia className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-sand">
            <Photo name="guardsParade" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroMedia>
        }
      />

      <section className="band on-dark bg-ink text-paper">
        <div className="wrap py-24 md:py-32">
          <SectionHead
            dark
            eyebrow="Curriculum"
            title="What our officers are trained in"
            lead={`${listed} of the ${curriculumModuleTotal} modules, grouped by what they prepare an officer for.`}
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-line-dark md:grid-cols-2">
            {curriculum.map((group, gi) => (
              <Reveal key={group.theme} delay={gi * 0.06} className="bg-ink-soft p-8 md:p-10">
                <h3 className="display text-[1.9rem] leading-tight">{group.theme}</h3>
                <ul className="mt-8 border-t border-line-dark">
                  {group.modules.map((m) => (
                    <li key={m} className="flex items-baseline gap-4 border-b border-line-dark py-4 text-[1.05rem] text-paper/90">
                      <span className="h-px w-4 shrink-0 translate-y-[-4px] bg-red" aria-hidden="true" />
                      {m}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Training by tier"
              title="One curriculum for three tiers of officer"
              lead="Platinum, Diamond and Standard officers come to us from different backgrounds. All of them train to the same curriculum, so a post keeps the same standard whichever tier staffs it."
            />
            <ul className="mt-10 border-t border-line">
              {tiers.map((t) => (
                <Reveal as="li" key={t.name} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <span className="font-[600]">{t.name}</span>
                  <span className="leading-relaxed text-mute">
                    {t.role}. {t.drawnFrom}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[24px] lg:col-span-6 lg:aspect-auto">
            <Photo name="guardsHandshake" sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      <section className="band bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Development and welfare"
            title="How we develop and keep good officers"
            lead="Outstanding officers are sponsored into a security institute. Every officer has access to the welfare commitments below."
          />
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-5">
            {welfare.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.05} className="border-t border-ink py-6">
                <h3 className="font-[600]">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-mute">{w.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-12">
            <Link href="/services/risk-assessment-consultancy" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
              <span className="link-draw">See training for your own security staff</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
