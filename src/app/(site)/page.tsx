import { HeroBackdrop, HeroLine, HeroRule, HeroText } from "@/components/motion/HeroEnter";
import { ImageReveal, Parallax, Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { WordHighlight } from "@/components/motion/WordHighlight";
import { CloseCTA, MediaList, SectionHead, TierLadder } from "@/components/sections/Blocks";
import { Marquee } from "@/components/sections/Marquee";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ButtonLink, ExternalArrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { ShieldIcon } from "@/components/ui/Icons";
import { company, nscdcVisit } from "@/content/company";
import { publishedServices } from "@/content/services";
import { primaryAction } from "@/content/site";
import { approachSteps, tiers } from "@/content/standards";
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

  const heroFacts = [
    { title: `${numberWord(tiers.length)} guard tiers`, body: tiers.map((t) => t.name.replace(" Squad", "")).join(", ") },
    { title: `${numberWord(publishedServices.length)} services`, body: "Built around one trained guard force" },
    { title: "Site assessment", body: "Before every deployment" },
    { title: "NSCDC inspection", body: `Commended, ${nscdcVisit.date.replace(/^\d+ /, "")}`, href: nscdcVisit.source.url },
  ];

  return (
    <>
      {/* 1. Hero: full-bleed photograph, headline over it, key facts along the bottom */}
      <section className="pt-[var(--nav-h)]">
        <div className="on-dark relative isolate flex min-h-[calc(100svh-var(--nav-h))] flex-col overflow-hidden bg-ink text-white">
          <HeroBackdrop className="absolute inset-0 -z-20">
            <Photo name="guardsFormation" sizes="100vw" priority quality={90} />
          </HeroBackdrop>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/65 to-ink/5" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" aria-hidden="true" />

          <div className="wrap flex flex-1 flex-col justify-end pb-6 pt-28 md:pb-8">
            <HeroText className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
              <div className="lg:col-span-7">
                <HeroLine>
                  <p className="eyebrow">Private security company · {company.district}</p>
                </HeroLine>
                <HeroLine>
                  <h1 className="display t-hero mt-6 max-w-[15ch] text-balance">Security guards and protection for organisations in Lagos</h1>
                </HeroLine>
              </div>
              <div className="lg:col-span-5 lg:pl-8">
                <HeroLine>
                  <p className="lead text-white/80">
                    Trained, uniformed officers in three tiers, matched to each site after a vulnerability assessment.
                  </p>
                </HeroLine>
                <HeroLine className="mt-7 flex flex-wrap gap-3">
                  <ButtonLink href={primaryAction.href}>{primaryAction.label}</ButtonLink>
                  <ButtonLink href="/services" variant="outline">
                    Our services
                  </ButtonLink>
                </HeroLine>
              </div>
            </HeroText>

            <HeroRule className="mt-12 h-px bg-white/20" />
            <HeroText delay={0.9} className="grid grid-cols-2 gap-x-6 gap-y-5 pt-6 lg:grid-cols-4">
              {heroFacts.map((f) => (
                <HeroLine key={f.title}>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener noreferrer" className="group block">
                      <span className="flex items-center gap-1.5 font-[600] tracking-[-0.01em]">
                        {f.title}
                        <ExternalArrow className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-1 block text-sm text-white/65">{f.body}</span>
                    </a>
                  ) : (
                    <>
                      <span className="block font-[600] tracking-[-0.01em]">{f.title}</span>
                      <span className="mt-1 block text-sm text-white/65">{f.body}</span>
                    </>
                  )}
                </HeroLine>
              ))}
            </HeroText>
          </div>
        </div>
      </section>

      {/* 2. Service strip */}
      <section aria-label="Our services" className="px-2 pt-2 md:px-3 md:pt-3">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-red to-red-deep py-7 text-white md:py-9">
          <Marquee items={publishedServices.map((s) => s.name)} dot="bg-white/80" />
        </div>
      </section>

      {/* 3. Who we are */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Who we are"
              title="A Lagos security company built on trained, well-led people"
              lead="Safety Signatures provides private guarding and related security services to businesses, estates, schools, churches, events and individuals. Our work starts with people: how we recruit them, train them, look after them and supervise them on the post."
            />
            <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Assessment before deployment", b: "Every site is assessed for weak points before officers are placed on it.", c: "bg-navy-deep", i: "bg-red" },
                { t: "Officers who are looked after", b: "Annual leave, staff loans and merit awards keep good officers with us.", c: "bg-red", i: "bg-navy-deep" },
              ].map((f) => (
                <StaggerItem key={f.t} className={`card-lift rounded-[20px] p-6 text-white ${f.c}`}>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${f.i}`}>
                    <ShieldIcon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-[650] tracking-[-0.015em]">{f.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">{f.b}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.15} className="mt-10">
              <ButtonLink href="/about" variant="outline">
                About the company
              </ButtonLink>
            </Reveal>
          </div>
          <ImageReveal className="photo-frame relative aspect-[4/5] rounded-[24px] lg:col-span-6 lg:aspect-[5/6]">
            <Photo name="guardsHandshake" sizes="(min-width: 1024px) 50vw, 100vw" />
          </ImageReveal>
        </div>
      </section>

      {/* 4. Signatures of Safety: the page's scroll moment */}
      <section className="px-2 md:px-3">
        <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-ink text-paper">
          <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[460px] w-[460px] rounded-full bg-navy/60 blur-[120px]" aria-hidden="true" />
          <div className="wrap py-24 md:py-36">
            <p className="eyebrow">{company.brandLine}</p>
            <h2 className="sr-only">Our guard force standard</h2>
            <WordHighlight
              className="display mt-10 max-w-[22ch] text-[clamp(2rem,4.6vw,4.2rem)] leading-[1.08]"
              text="Every officer we deploy is an ambassador of Safety Signatures. The standard they keep on each post is what we call our signatures of safety."
            />
            <Reveal className="mt-12">
              <p className="max-w-[48ch] text-mute-dark">
                Our guard force is trained to serve with diligence, respect and patriotism, and to leave the same standard
                behind on every beat they are assigned.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <section className="py-24 md:py-32" id="services">
        <div className="wrap">
          <SectionHead
            split
            eyebrow="Services"
            title={`${numberWord(publishedServices.length)} services around one guard force`}
            lead="Manned guarding is the core of the business. The other services extend it to people on the move, events, dogs, equipment and advice."
          />
          <div className="mt-14">
            <ServiceCards items={publishedServices.map((s) => ({ slug: s.slug, name: s.name, short: s.short, image: s.image }))} />
          </div>
        </div>
      </section>

      {/* 6. Guard tiers */}
      <section className="px-2 md:px-3">
        <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-navy-deep text-paper">
          <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-navy blur-[120px]" aria-hidden="true" />
          <div className="wrap py-24 md:py-32">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <SectionHead
                dark
                className="lg:col-span-8"
                eyebrow="Guard tiers"
                title="Three guard tiers, matched to the post"
                lead="The duties of a post decide which officers it gets. A head office reception needs different people from a warehouse gate."
              />
              <Reveal className="lg:col-span-4 lg:justify-self-end">
                <ButtonLink href="/services/manned-guarding" variant="outline">
                  See manned guarding
                </ButtonLink>
              </Reveal>
            </div>
            <div className="mt-14">
              <TierLadder />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Credibility */}
      <section className="py-24 md:py-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[24px] lg:col-span-7">
            <Photo name="nscdcOfficers" sizes="(min-width: 1024px) 58vw, 100vw" />
          </ImageReveal>
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow={`Regulatory visit · ${nscdcVisit.date}`}
              title="Inspected and commended by the NSCDC"
              lead={nscdcVisit.summary}
            />
            <Reveal delay={0.1} className="mt-8">
              <a href={nscdcVisit.source.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Read the {nscdcVisit.source.publication} report
                <ExternalArrow />
              </a>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <p className="rounded-[20px] bg-sand p-5 text-[0.95rem] leading-relaxed text-mute">
                The NSCDC licenses and supervises private guard companies in Nigeria under the Private Guard Companies Act.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Approach */}
      <section className="band on-dark bg-navy-deep py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-navy blur-[120px]" aria-hidden="true" />
        <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
        <div className="wrap">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHead dark eyebrow="Our approach" title="How we set up a security post" lead="Four steps, in the same order, for every new site." />
              <Reveal className="mt-8">
                <ButtonLink href="/training-standards" variant="outline">
                  Our training and standards
                </ButtonLink>
              </Reveal>
            </div>
            <ImageReveal className="photo-frame relative aspect-[16/10] rounded-[24px] lg:col-span-7">
              <Photo name="vehicleSearch" sizes="(min-width: 1024px) 55vw, 100vw" />
            </ImageReveal>
          </div>
          <Stagger as="ol" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.1}>
            {approachSteps.map((s, i) => (
              <StaggerItem
                as="li"
                key={s.title}
                className="card-lift group flex flex-col rounded-[24px] border border-white/10 bg-white/[0.05] p-7 hover:border-white/25 hover:bg-white/[0.09]"
              >
                <span className="display flex h-12 w-12 items-center justify-center rounded-full bg-red text-[1.05rem] text-white transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-8 text-[1.45rem] leading-tight">{s.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-white/70">{s.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 9. Leadership */}
      <section className="mt-2 px-2 md:mt-3 md:px-3">
        <div className="rounded-[28px] bg-sand">
          <div className="wrap grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16">
            <ImageReveal className="photo-frame relative aspect-[3/4] max-h-[680px] rounded-[24px] lg:col-span-5">
              <Photo name="ceoPortrait" sizes="(min-width: 1024px) 40vw, 100vw" />
            </ImageReveal>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHead
                eyebrow="Leadership"
                title="Led by Dr. Cynthia Gregg, Managing Director and CEO"
                lead="Dr. Gregg came to private security from journalism and brand management. She leads the company and speaks on private security and public safety in Nigeria."
              />
              <Stagger as="ul" className="mt-10 grid gap-3">
                {[
                  { y: "2023", t: "Panellist on small arms and light weapons, NAOSNP National Security Conference, Lagos" },
                  { y: "2024", t: "Named among Trek Africa's 25 Most Influential and Role Model Women in Africa" },
                ].map((r) => (
                  <StaggerItem as="li" key={r.y} className="flex gap-5 rounded-[18px] bg-white p-5">
                    <span className="font-mono w-12 shrink-0 pt-0.5 text-xs text-red">{r.y}</span>
                    <span className="text-[0.97rem] leading-relaxed">{r.t}</span>
                  </StaggerItem>
                ))}
              </Stagger>
              <Reveal className="mt-8">
                <ButtonLink href="/leadership" variant="outline">
                  Read her profile
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Media */}
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

      {/* 11. Careers */}
      <section className="px-2 pb-2 md:px-3 md:pb-3">
        <div className="on-dark relative isolate overflow-hidden rounded-[28px] text-paper">
          <Parallax className="absolute inset-0 -z-10">
            <Photo name="guardsParade" sizes="100vw" />
          </Parallax>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden="true" />
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
        </div>
      </section>

      {/* 12. Close */}
      <CloseCTA />
    </>
  );
}
