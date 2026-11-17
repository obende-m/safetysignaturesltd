import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CloseCTA, MediaList, PageHero, SectionHead } from "@/components/sections/Blocks";
import { ExternalArrow } from "@/components/ui/Buttons";
import { Photo } from "@/components/ui/Photo";
import { nscdcVisit } from "@/content/company";
import type { MediaCategory } from "@/content/articles";
import type { ImageKey } from "@/content/images";
import { getArticles } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/news",
  title: "News, media and recognition",
  description:
    "Press coverage of Safety Signatures and its CEO, Dr. Cynthia Gregg: the 2023 NSCDC visit, conference appearances, media features and recognition, each linked to the original report.",
});

const groups: { categories: MediaCategory[]; eyebrow: string; title: string; lead: string; image?: ImageKey }[] = [
  {
    categories: ["speaking"],
    eyebrow: "Speaking engagements",
    title: "Conference appearances by Dr. Gregg",
    lead: "Panels and conferences where our Managing Director has spoken on private security and public safety.",
    image: "conference",
  },
  {
    categories: ["ceo_recognition"],
    eyebrow: "Recognition of the CEO",
    title: "Recognition received by Dr. Gregg",
    lead: "Honours given to Dr. Cynthia Gregg personally. They are not awards to the company.",
    image: "certificate",
  },
  {
    categories: ["media_feature", "commentary"],
    eyebrow: "Features and commentary",
    title: "Features and commentary in the press",
    lead: "Profiles of Dr. Gregg and her published comments on security and public life.",
  },
];

export default async function NewsPage() {
  const media = await getArticles("media");

  return (
    <>
      <PageHero
        eyebrow="News and recognition"
        title="Safety Signatures in the news"
        lead="Coverage of the company and of our Managing Director, grouped by kind so it is clear what each item is. Every entry links to the original publication."
      />

      {/* Regulatory visit, featured */}
      <section className="pb-24 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-14">
          <ImageReveal className="photo-frame relative aspect-[4/3] rounded-[24px] lg:col-span-7">
            <Photo name="nscdcTeam" sizes="(min-width: 1024px) 58vw, 100vw" priority />
          </ImageReveal>
          <div className="lg:col-span-5">
            <SectionHead eyebrow={`Regulatory visit · ${nscdcVisit.date}`} title="NSCDC Private Guard Companies department visit" lead={nscdcVisit.summary} />
            <Reveal delay={0.1} className="mt-8">
              <a href={nscdcVisit.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-[560] text-navy">
                <span className="link-draw">Read the {nscdcVisit.source.publication} report</span>
                <ExternalArrow />
              </a>
              <p className="mt-8 border-t border-line pt-6 text-[0.95rem] leading-relaxed text-mute">
                This was a regulatory inspection with a reported commendation. It is not a formal award.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {groups.map((g, gi) => {
        const items = media.filter((m) => g.categories.includes(m.category as MediaCategory));
        if (items.length === 0) return null;
        return (
          <section key={g.title} className={`py-24 md:py-32 ${gi % 2 === 0 ? "bg-white" : ""}`}>
            <div className="wrap">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <SectionHead className="lg:col-span-7" eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
                {g.image && (
                  <ImageReveal className="photo-frame relative aspect-[3/2] rounded-[22px] lg:col-span-4 lg:col-start-9">
                    <Photo name={g.image} sizes="(min-width: 1024px) 30vw, 100vw" />
                  </ImageReveal>
                )}
              </div>
              <div className="mt-12">
                <MediaList items={items} />
              </div>
            </div>
          </section>
        );
      })}

      <CloseCTA />
    </>
  );
}
