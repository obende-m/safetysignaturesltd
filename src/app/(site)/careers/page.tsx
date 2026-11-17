import { HeroMedia } from "@/components/motion/HeroEnter";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, PageHero, SectionHead } from "@/components/sections/Blocks";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { Photo } from "@/components/ui/Photo";
import { curriculumModuleTotal, tiers, welfare } from "@/content/standards";
import { getVacancies } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/careers",
  title: "Careers",
  description:
    "Join the Safety Signatures guard force in Lagos. Training to a 26-module curriculum, annual leave, staff loans, merit awards and sponsored institute membership.",
});

export default async function CareersPage() {
  const vacancies = await getVacancies();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join the Safety Signatures guard force"
        lead="We recruit security officers, supervisors and drivers who are disciplined, honest and good with people, then train them to our own curriculum and look after them while they serve."
        aside={
          <HeroMedia className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-sand">
            <Photo name="guardsFormation" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroMedia>
        }
      >
        <div className="mt-9">
          <a href="#apply" className="btn btn-primary">
            Send an application
          </a>
        </div>
      </PageHero>

      {/* Welfare */}
      <section className="band on-dark bg-ink text-paper">
        <div className="wrap py-24 md:py-32">
          <SectionHead dark eyebrow="Welfare" title="What we offer our officers" lead="Commitments every officer can count on once they join." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] bg-line-dark sm:grid-cols-2 lg:grid-cols-5">
            {welfare.map((w) => (
              <li key={w.title} className="bg-ink-soft p-7">
                <h3 className="display text-[1.5rem]">{w.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-mute-dark">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roles and training */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="Roles and training"
              title="Three tiers of officer, one curriculum"
              lead={`Officers join one of three tiers according to their education and experience. Every officer trains to our ${curriculumModuleTotal}-module curriculum, and outstanding officers are sponsored into a security institute.`}
            />
          </div>
          <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
            {tiers.map((t) => (
              <Reveal as="li" key={t.name} className="border-b border-line py-6">
                <h3 className="display text-[1.6rem]">{t.name}</h3>
                <p className="mt-2 leading-relaxed text-mute">
                  {t.role}. {t.drawnFrom}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Vacancies */}
      <section className="band bg-sand py-24 md:py-32">
        <div className="wrap">
          <SectionHead eyebrow="Vacancies" title="Open positions" />
          {vacancies.length === 0 ? (
            <Reveal className="mt-10 max-w-2xl border-t border-line pt-8">
              <p className="text-lg leading-relaxed text-ink/85">
                There are no advertised vacancies at the moment. We still welcome general applications from security
                officers, supervisors and drivers, and keep them on file for upcoming deployments.
              </p>
            </Reveal>
          ) : (
            <ul className="mt-12 border-t border-line">
              {vacancies.map((v) => (
                <li key={v.id} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-5">
                    <h3 className="display text-[1.8rem] leading-tight">{v.title}</h3>
                    <p className="mt-2 font-mono text-xs text-mute">
                      {v.location} · {v.employmentType}
                      {v.closingDate ? ` · Closes ${formatDate(v.closingDate)}` : ""}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="leading-relaxed text-ink/85">{v.summary}</p>
                    {v.requirements && <p className="mt-3 whitespace-pre-line leading-relaxed text-mute">{v.requirements}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Application */}
      <section id="apply" className="scroll-mt-[var(--nav-h)] py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHead
              eyebrow="Apply"
              title="Send your application"
              lead="Tell us about yourself and attach your CV. Your application is stored privately and seen only by our recruitment team."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm vacancies={vacancies.map((v) => ({ id: v.id, title: v.title }))} />
          </div>
        </div>
      </section>
    </>
  );
}
