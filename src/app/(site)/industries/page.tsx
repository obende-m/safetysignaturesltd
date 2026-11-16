import Link from "next/link";
import { HeroMedia } from "@/components/motion/HeroEnter";
import { Reveal } from "@/components/motion/Reveal";
import { CloseCTA, PageHero } from "@/components/sections/Blocks";
import { Photo } from "@/components/ui/Photo";
import { publishedServices } from "@/content/services";
import { industries } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/industries",
  title: "Industries we serve",
  description:
    "How Safety Signatures security services apply to corporate offices, commercial property, residential estates, schools, churches, events, hotels and private clients in Lagos.",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Security services for the organisations we protect"
        lead="Each kind of organisation has its own exposure and routines. Here is how our services apply to the most common ones."
        aside={
          <HeroMedia className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-sand">
            <Photo name="vehicleSearch" sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </HeroMedia>
        }
      />

      <section className="bg-white py-24 md:py-32">
        <div className="wrap">
          <h2 className="sr-only">Industries</h2>
          <ul className="border-t border-line">
            {industries.map((ind, i) => (
              <Reveal as="li" key={ind.name} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10">
                <span className="font-mono text-sm text-red md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <div className="md:col-span-5">
                  <h3 className="display text-[1.9rem] leading-tight md:text-[2.2rem]">{ind.name}</h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-[1.05rem] leading-relaxed text-ink/85">{ind.need}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {ind.services.map((slug) => {
                      const s = publishedServices.find((p) => p.slug === slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                          >
                            {s.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CloseCTA
        title="Tell us about your organisation"
        body="Whatever kind of organisation you run, we start with a look at your site and your routines, then recommend the officers and services that fit."
      />
    </>
  );
}
