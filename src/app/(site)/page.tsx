import Link from "next/link";
import { HeroLine, HeroMedia, HeroText } from "@/components/motion/HeroEnter";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { WordHighlight } from "@/components/motion/WordHighlight";
import { CloseCTA, MediaList, SectionHead, TierLadder } from "@/components/sections/Blocks";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { ButtonLink, ExternalArrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { company, nscdcVisit } from "@/content/company";
import { publishedServices } from "@/content/services";
import { primaryAction } from "@/content/site";
import { approachSteps } from "@/content/standards";
import { getArticles } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

const numberWord = (n: number) => ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"][n] ?? String(n);

export const metadata = {
  ...pageMeta({
    path: "/",
    title: "Security guards and protection in Lagos",
    description:
      "Safety Signatures Limited provides trained security guards in three tiers, executive protection, event security, K9 services and security consultancy for organisations in Lagos.",
  }),
  title: { absolute: `${company.name} | Security guards and protection in Lagos` },
};

export default async function HomePage() {
  const media = await getArticles("media");
  const featuredMedia = media.filter((m) => m.slug !== "nscdc-pgc-visit-2023").slice(0, 4);

  return (
    <>
      {/* 1. Hero */}
      <section className="pt-[var(--nav-h)]">
        <div className="wrap grid min-h-[calc(100svh-var(--nav-h))] gap-8 pb-6 pt-8 md:pb-8 lg:grid-cols-12 lg:gap-12 lg:pt-10">
          <HeroText className="flex flex-col lg:col-span-7 lg:py-4">
            <HeroLine>
              <p className="eyebrow">Private security company · {company.district}</p>
            </HeroLine>
            <HeroLine>
              <h1 className="display t-hero mt-6 max-w-[15ch] text-balance">Security guards and protection for organisations in Lagos</h1>
            </HeroLine>
            <HeroLine>
              <p className="lead mt-7 max-w-[50ch] text-mute">
                Trained, uniformed officers in three tiers, matched to each site after a vulnerability assessment. Add
                K9 teams, secure drivers, event security and equipment where the post needs them.
              </p>
            </HeroLine>
            <HeroLine className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
              <ButtonLink href="/services" variant="outline">
                See our services
              </ButtonLink>
            </HeroLine>
            <HeroLine className="mt-auto pt-8">
              <a
                href={nscdcVisit.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex max-w-[52ch] items-start gap-4 border-t border-line pt-5"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden="true" />
                <span className="text-[0.95rem] leading-relaxed text-ink/85">
                  Commended for professionalism and compliance during an inspection by the NSCDC Private Guard Companies
                  department, {nscdcVisit.date}.{" "}
                  <span className="inline-flex items-center gap-1 whitespace-nowrap font-[550] text-navy">
                    <span className="link-draw">Read the report</span>
                    <ExternalArrow />
                  </span>
                </span>
              </a>
            </HeroLine>
          </HeroText>

          <HeroMedia className="relative min-h-[52svh] overflow-hidden rounded-[28px] bg-sand lg:col-span-5 lg:min-h-0">
            <Photo name="guardsFormation" sizes="(min-width: 1024px) 42vw, 100vw" priority quality={90} />
          </HeroMedia>
        </div>
      </section>

      {/* 2. Who we are */}
      <section className="bg-white py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Who we are"
              title="A Lagos security company built on trained, well-led people"
              lead="Safety Signatures provides private guarding and related security services to businesses, estates, schools, churches, events and individuals. Our work starts with people: how we recruit them, train them, look after them and supervise them on the post."
            />
            <Reveal delay={0.1} className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2">
              <div>
                <h3 className="font-[600]">Assessment before deployment</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-mute">
                  Every site is assessed for weak points before officers are placed on it.
                </p>
              </div>
              <div>
                <h3 className="font-[600]">Officers who are looked after</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-mute">
                  Annual leave, staff loans and merit awards keep good officers with us.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <Link href="/about" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">Read about the company</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <ImageReveal className="photo-frame relative aspect-[4/5] rounded-[28px] lg:col-span-6 lg:aspect-auto lg:min-h-[640px]">
            <Photo name="guardsHandshake" sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      {/* 3. Signatures of Safety: the page's scroll moment */}
      <section className="on-dark bg-ink text-paper">
        <div className="wrap py-28 md:py-40">
          <p className="eyebrow">{company.brandLine}</p>
          <h2 className="sr-only">Our guard force standard</h2>
          <WordHighlight
            className="display mt-10 max-w-[22ch] text-[clamp(2.1rem,5vw,4.6rem)] leading-[1.08]"
            text="Every officer we deploy is an ambassador of Safety Signatures. The standard they keep on each post is what we call our signatures of safety."
          />
          <p className="mt-12 max-w-[48ch] text-mute-dark">
            Our guard force is trained to serve with diligence, respect and patriotism, and to leave the same standard
            behind on every beat they are assigned.
          </p>
        </div>
      </section>

      {/* 4. Services */}
      <section className="py-24 md:py-32" id="services">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12">
            <SectionHead
              className="lg:col-span-7"
              eyebrow="Services"
              title={`${numberWord(publishedServices.length)} services around one guard force`}
              lead="Manned guarding is the core of the business. The other services extend it to people on the move, events, dogs, equipment and advice."
            />
          </div>
          <div className="mt-14">
            <ServiceIndex
              items={publishedServices.map((s) => ({ slug: s.slug, name: s.name, short: s.short, image: s.image }))}
              fallback="vehicleSearch"
            />
          </div>
        </div>
      </section>

      {/* 5. Guard tiers */}
      <section className="on-dark bg-navy-deep text-paper">
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHead
              dark
              className="lg:col-span-7"
              eyebrow="Guard tiers"
              title="Three guard tiers, matched to the post"
              lead="The duties of a post decide which officers it gets. A head office reception needs different people from a warehouse gate."
            />
            <Reveal className="lg:col-span-5 lg:justify-self-end">
              <ButtonLink href="/services/manned-guarding" variant="outline">
                See manned guarding
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <TierLadder />
          </div>
        </div>
      </section>

      {/* 6. Credibility */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[28px] lg:col-span-7">
            <Photo name="nscdcOfficers" sizes="(min-width: 1024px) 58vw, 100vw" />
          </ImageReveal>
          <div className="flex flex-col lg:col-span-5">
            <SectionHead
              eyebrow={`Regulatory visit · ${nscdcVisit.date}`}
              title="Inspected and commended by the NSCDC"
              lead={nscdcVisit.summary}
            />
            <Reveal delay={0.1} className="mt-8">
              <a
                href={nscdcVisit.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy"
              >
                <span className="link-draw">Read the {nscdcVisit.source.publication} report</span>
                <ExternalArrow />
              </a>
            </Reveal>
            <Reveal delay={0.15} className="mt-auto pt-8">
              <p className="border-t border-line pt-6 text-[0.95rem] leading-relaxed text-mute">
                The NSCDC licenses and supervises private guard companies in Nigeria under the Private Guard Companies
                Act.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Approach */}
      <section className="bg-white py-24 md:py-32">
        <div className="wrap">
          <SectionHead
            eyebrow="Our approach"
            title="How we set up a security post"
            lead="Four steps, in the same order, for every new site."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[28px] lg:col-span-5 lg:aspect-auto">
              <Photo name="vehicleSearch" sizes="(min-width: 1024px) 40vw, 100vw" />
            </ImageReveal>
            <ol className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
              {approachSteps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.06} className="border-t border-ink pt-6">
                  <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display mt-4 text-[1.65rem] leading-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-mute">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
          <Reveal className="mt-14">
            <Link href="/training-standards" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
              <span className="link-draw">See our training and standards</span>
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 8. Leadership */}
      <section className="bg-sand py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <ImageReveal className="photo-frame relative aspect-[3/4] max-h-[720px] rounded-[28px] lg:col-span-5">
            <Photo name="ceoPortrait" sizes="(min-width: 1024px) 40vw, 100vw" />
          </ImageReveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <SectionHead
              eyebrow="Leadership"
              title="Led by Dr. Cynthia Gregg, Managing Director and CEO"
              lead="Dr. Gregg came to private security from journalism and brand management. She leads the company and speaks on private security and public safety in Nigeria."
            />
            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                <li className="flex gap-6 py-4">
                  <span className="w-16 shrink-0 font-mono text-sm text-mute">2023</span>
                  <span>Panellist on small arms and light weapons, NAOSNP National Security Conference, Lagos</span>
                </li>
                <li className="flex gap-6 py-4">
                  <span className="w-16 shrink-0 font-mono text-sm text-mute">2024</span>
                  <span>Named among Trek Africa&apos;s 25 Most Influential and Role Model Women in Africa</span>
                </li>
              </ul>
              <Link href="/leadership" className="mt-8 inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">Read her profile</span>
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 9. Media */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <SectionHead
              className="lg:col-span-8"
              eyebrow="News and recognition"
              title="Safety Signatures in the press"
              lead="Coverage of our leadership and our work, linked to the original articles."
            />
            <Reveal className="lg:col-span-4 lg:justify-self-end">
              <ButtonLink href="/news" variant="outline">
                See all coverage
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14">
            <MediaList items={featuredMedia} />
          </div>
        </div>
      </section>

      {/* 10. Careers */}
      <section className="on-dark relative isolate overflow-hidden text-paper">
        <div className="absolute inset-0 -z-10">
          <Photo name="guardsParade" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        </div>
        <div className="wrap py-28 md:py-40">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Careers</p>
            <h2 className="display t-2 mt-5">Careers in the Safety Signatures guard force</h2>
            <p className="lead mt-6 text-paper/80">
              We train every officer to our own curriculum, sponsor outstanding officers into a security institute, and
              offer annual leave, staff loans and merit awards.
            </p>
            <div className="mt-10">
              <ButtonLink href="/careers">See vacancies and apply</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. Close */}
      <CloseCTA />
    </>
  );
}
