import Link from "next/link";
import { HeroMedia } from "@/components/motion/HeroEnter";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero, SectionHead } from "@/components/sections/Blocks";
import { Photo } from "@/components/ui/Photo";
import { company } from "@/content/company";
import { approachSteps, values, welfare } from "@/content/standards";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/about",
  title: "About us",
  description:
    "Safety Signatures Limited is a Lagos private guard company. Our mission, vision and values, how we work, and how we train and look after our officers.",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A private guard company that starts with its people"
        lead={
          <>
            {company.name} provides guarding, protection, event security, equipment and consultancy from its head office
            in {company.district}. We recruit, train and supervise our own officers, and match them to each site after
            assessing it.
          </>
        }
        aside={
          <HeroMedia className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-sand">
            <Photo name="guardsLineUp" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroMedia>
        }
      />

      {/* Mission and vision */}
      <section className="band on-dark bg-ink text-paper">
        <div className="wrap grid gap-16 py-24 md:py-32 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow">Our vision</p>
            <h2 className="sr-only">Vision and mission</h2>
            <p className="display mt-8 text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15]">
              To be a globally recognised provider of security services, with a distinctly experienced range of
              expertise.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Our mission</p>
            <p className="display mt-8 text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.15]">
              To protect our clients&apos; people and property with trained officers backed by the right technology, and
              to keep the sites we guard free of crime and theft.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Values"
            title="Four values our officers work by"
            lead="Our mission asks officers to serve with diligence, respect, intelligence and effectiveness. This is what each one means on a post."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="bg-paper p-8">
                <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-10 text-[1.9rem]">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-mute">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Operational philosophy */}
      <section className="band bg-sand py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[24px] lg:col-span-6 lg:aspect-auto lg:min-h-[560px]">
            <Photo name="vehicleSearch" sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="How we work"
              title="Security planned from the site, not from a template"
              lead="No two sites are exposed in the same way, so no two deployments are the same. Every one follows the same four steps."
            />
            <ol className="mt-10 border-t border-line">
              {approachSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.05} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-5">
                  <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-[600]">{s.title}</span>
                    <span className="mt-1 block leading-relaxed text-mute">{s.body}</span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* People and welfare */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Our people"
              title="Officers who are trained, looked after and kept"
              lead="A guard who is well trained, fairly treated and proud of the uniform does a better job. We invest in our officers for that reason."
            />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/training-standards" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">See our training and standards</span>
                <span aria-hidden="true">â†’</span>
              </Link>
            </Reveal>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {welfare.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 0.05} className="border-t border-ink/15 py-6">
                <h3 className="font-[600]">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-mute">{w.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership pointer */}
      <section className="band bg-sand py-24 md:py-28">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-center">
          <ImageReveal className="photo-frame relative aspect-square max-w-[320px] rounded-full md:col-span-4">
            <Photo name="ceoPortrait" sizes="320px" />
          </ImageReveal>
          <div className="md:col-span-8">
            <SectionHead
              eyebrow="Leadership"
              title="Led by Dr. Cynthia Gregg"
              lead="Managing Director and CEO, and one of the company's directors. She came to private security from journalism and brand management."
            />
            <Reveal delay={0.1} className="mt-8">
              <Link href="/leadership" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">Read her profile</span>
                <span aria-hidden="true">â†’</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
