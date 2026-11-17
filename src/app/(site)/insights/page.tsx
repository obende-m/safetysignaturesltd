import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CloseCTA, formatDate, PageHero } from "@/components/sections/Blocks";
import { Arrow } from "@/components/ui/Buttons";
import { getArticles } from "@/lib/data/content";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/insights",
  title: "Security insights",
  description:
    "Weekly Security Tonic: practical security advice for homes, offices, estates and events in Nigeria from the Safety Signatures team.",
});

export default async function InsightsPage() {
  const insights = await getArticles("insight");
  const [lead, ...rest] = insights;

  return (
    <>
      <PageHero
        eyebrow="Weekly Security Tonic"
        title="Security advice for homes, offices, estates and events"
        lead="Short, practical notes from our team on keeping people and property safe in Nigeria. Each one is written for the person who has to act on it."
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          {!lead ? (
            <p className="border-t border-line pt-8 text-lg text-mute">New articles will appear here as they are published.</p>
          ) : (
            <>
              <Reveal>
                <Link href={`/insights/${lead.slug}`} className="group grid gap-8 rounded-[24px] bg-ink p-8 text-paper md:p-14 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <p className="font-mono text-xs text-mute-dark">
                      {lead.category} · {formatDate(lead.publishedAt, lead.dateLabel)}
                      {lead.readingMinutes ? ` · ${lead.readingMinutes} min read` : ""}
                    </p>
                    <h2 className="display t-2 mt-6 max-w-[20ch] transition-colors">{lead.title}</h2>
                    <p className="lead mt-6 max-w-[56ch] text-mute-dark">{lead.excerpt}</p>
                  </div>
                  <div className="flex items-end lg:col-span-4 lg:justify-end">
                    <span className="btn btn-primary">
                      Read the article
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 && (
                <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
                  {rest.map((a, i) => (
                    <Reveal as="li" key={a.slug} delay={i * 0.06}>
                      <Link href={`/insights/${a.slug}`} className="group card-lift block border-t border-ink pt-6">
                        <p className="font-mono text-xs text-mute">
                          {a.category} · {formatDate(a.publishedAt, a.dateLabel)}
                        </p>
                        <h2 className="display mt-4 text-[1.9rem] leading-tight transition-colors group-hover:text-navy">{a.title}</h2>
                        <p className="mt-3 leading-relaxed text-mute">{a.excerpt}</p>
                        <span className="mt-5 inline-flex items-center gap-2 font-[560] text-navy">
                          <span className="link-draw">Read the article</span>
                          <Arrow />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      <CloseCTA />
    </>
  );
}
