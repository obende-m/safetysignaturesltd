import { HeroMedia } from "@/components/motion/HeroEnter";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero, SectionHead } from "@/components/sections/Blocks";
import { ExternalArrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/leadership",
  title: "Leadership",
  description:
    "Dr. Cynthia Gregg, Managing Director and CEO of Safety Signatures Limited: career, education, speaking and recognition.",
});

const recognition = [
  {
    year: "2024",
    title: "25 Most Influential and Role Model Women in Africa",
    by: "Trek Africa",
    type: "Media recognition",
    url: "https://trekafrica.net/security-expert-dr-cynthia-gregg-urges-women-to-participate-in-governance-says-we-are-backbone-of-our-communities-bagged-25-most-influential-role-model-women-in-africas-award/",
  },
  {
    year: "2024",
    title: "Profiled among fifty impactful female CEOs of 2023",
    by: "The Guardian (Nigeria)",
    type: "Media feature",
    url: "https://guardian.ng/features/the-guardians-special-focus-on-fifty-most-impactful-and-award-winning-female-ceos-that-contributed-to-nigerias-gdp-growth-in-2023/",
  },
  {
    year: "2021",
    title: "Honorary Doctor of Ministry",
    by: "Ames Christian University with the International College of Ministry, Ibadan",
    type: "Honorary degree",
    url: "https://trekafrica.net/security-entrepreneur-cynthia-gregg-bags-honorary-ph-d-from-ames-christian-university-says-degree-is-huge-responsibility-to-bless-humanity/",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Dr. Cynthia Gregg, Managing Director and CEO"
        lead="Dr. Gregg leads Safety Signatures and is one of its registered directors. She came to private security from journalism and brand management, and speaks on private security and public safety in Nigeria."
        aside={
          <HeroMedia className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] bg-sand">
            <Photo name="ceoPortrait" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroMedia>
        }
      />

      <section className="bg-white py-24 md:py-32">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Biography" title="Career and education" />
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            <Reveal>
              <h3 className="font-mono text-xs text-mute">Career</h3>
              <p className="mt-4 text-[1.1rem] leading-[1.75]">
                Dr. Gregg began her career as a journalist with Voice of Nigeria. She then joined Nigerian Breweries Plc as
                a sales representative and rose to brand manager for Amstel Malta. She later moved into private security
                and built Safety Signatures, where she is Managing Director and Chief Executive.
              </p>
            </Reveal>
            <Reveal>
              <h3 className="font-mono text-xs text-mute">Education</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line text-[1.05rem]">
                <li className="py-4">BA, Theatre Arts and Mass Communication, University of Benin</li>
                <li className="py-4">Advanced Diploma in Security Operations and Management, University of Lagos</li>
              </ul>
            </Reveal>
            <Reveal>
              <h3 className="font-mono text-xs text-mute">Honorary degree</h3>
              <p className="mt-4 text-[1.1rem] leading-[1.75]">
                In September 2021 Ames Christian University, with the International College of Ministry in Ibadan,
                conferred on her an honorary Doctor of Ministry degree. It is an honorary award in ministry and is separate
                from her professional security training.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="photo-frame relative aspect-[3/2] rounded-[28px] lg:col-span-7">
            <Photo name="conference" sizes="(min-width: 1024px) 58vw, 100vw" />
          </ImageReveal>
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Speaking"
              title="Speaking on private security"
              lead="In September 2023 Dr. Gregg was a panellist on small arms and light weapons at the National Security Conference of the National Association of Online Security News Publishers (NAOSNP), at the Civic Centre in Lagos."
            />
            <Reveal delay={0.1} className="mt-8">
              <a
                href="https://peopleandpowermag.com/cynthia-gregg-identifies-quest-to-dominate-as-cause-of-proliferation-of-small-arms/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy"
              >
                <span className="link-draw">Read the People &amp; Power report</span>
                <ExternalArrow />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Recognition"
            title="Recognition received by Dr. Gregg"
            lead="These honours were given to Dr. Gregg personally, not to the company. Each links to the published report."
          />
          <ul className="mt-14 border-t border-ink/15">
            {recognition.map((r) => (
              <li key={r.title} className="border-b border-ink/15">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                  <span className="font-mono text-sm text-mute md:col-span-2">{r.year}</span>
                  <span className="md:col-span-7">
                    <span className="display block text-[1.6rem] leading-tight transition-colors group-hover:text-navy">{r.title}</span>
                    <span className="mt-1.5 block text-mute">{r.by}</span>
                  </span>
                  <span className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
                    <span className="rounded-full border border-ink/15 px-3 py-1 text-xs">{r.type}</span>
                    <ExternalArrow className="text-navy" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
