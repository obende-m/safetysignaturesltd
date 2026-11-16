import Link from "next/link";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero, SectionHead, TierLadder } from "@/components/sections/Blocks";
import { ExternalArrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { nscdcVisit } from "@/content/company";
import { curriculumModuleTotal } from "@/content/standards";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/why-safety-signatures",
  title: "Why Safety Signatures",
  description:
    "Three guard tiers, a 26-module training curriculum, site assessments before deployment, guard welfare and an NSCDC commendation: what sets Safety Signatures apart.",
});

const reasons = [
  {
    title: "Officers matched to the post",
    body: "Platinum, Diamond and Standard officers mean a reception, an access gate and a patrol route each get the people their duties call for.",
    href: "/services/manned-guarding",
    link: "See the guard tiers",
  },
  {
    title: "Assessment before deployment",
    body: "We assess each client location for weak points before deciding how many officers it needs, where they stand and what equipment helps them.",
    href: "/services/risk-assessment-consultancy",
    link: "See risk assessment",
  },
  {
    title: `A ${curriculumModuleTotal}-module training curriculum`,
    body: "From ethics and minimum force to first aid, crowd control and report writing, officers train to a written curriculum.",
    href: "/training-standards",
    link: "See the curriculum",
  },
  {
    title: "Officers who are looked after",
    body: "Annual leave, examination leave, staff loans, merit awards and sponsored institute membership help us keep good officers.",
    href: "/careers",
    link: "See careers",
  },
  {
    title: "A commander for the post",
    body: "Platinum officers can serve as Guard Force Commander, leading the other officers on a post.",
    href: "/services/manned-guarding",
    link: "See manned guarding",
  },
  {
    title: "One company for related needs",
    body: "Drivers, protection officers, dog teams, event security and equipment come from the same company, under the same standards.",
    href: "/services",
    link: "See all services",
  },
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Safety Signatures"
        title="What you get when you choose Safety Signatures"
        lead="We would rather show how we work than tell you we are the best. These are the practices behind our guarding, with links to the detail."
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <ol className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.title} className="flex flex-col bg-paper p-8 md:p-10">
                <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display mt-8 text-[1.8rem] leading-tight">{r.title}</h2>
                <p className="mt-4 leading-relaxed text-mute">{r.body}</p>
                <Link href={r.href} className="mt-auto inline-flex min-h-11 items-center gap-2 pt-6 font-[560] text-navy">
                  <span className="link-draw">{r.link}</span>
                  <span aria-hidden="true">â†’</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band bg-sand py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={`Regulatory visit Â· ${nscdcVisit.date}`} title="Commended by the regulator" lead={nscdcVisit.summary} />
            <Reveal delay={0.1} className="mt-8">
              <a href={nscdcVisit.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">Read the {nscdcVisit.source.publication} report</span>
                <ExternalArrow />
              </a>
            </Reveal>
          </div>
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[24px] lg:col-span-7">
            <Photo name="nscdcTeam" sizes="(min-width: 1024px) 58vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      <section className="band on-dark bg-navy-deep text-paper">
        <div className="wrap py-24 md:py-32">
          <SectionHead dark eyebrow="Guard tiers" title="Three tiers, chosen by the duties of the post" />
          <div className="mt-14">
            <TierLadder />
          </div>
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
