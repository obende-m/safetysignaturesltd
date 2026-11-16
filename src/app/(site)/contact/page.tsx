import Link from "next/link";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ExternalArrow } from "@/components/ui/Buttons";
import { company, confirmedEmails, confirmedSocials, formatPhone, mapSearchUrl, phonesByState, telHref } from "@/content/company";
import { serviceOptions } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  path: "/contact",
  title: "Request a consultation",
  description:
    "Request a security consultation from Safety Signatures in Lagos. Tell us about your site, event or protection need and we will arrange an assessment.",
});

const steps = [
  { title: "We read your request", body: "A member of our team reviews what you have told us." },
  { title: "We contact you", body: "We call or email to understand the site, the hours and your concerns." },
  { title: "We assess the site", body: "We visit and assess the location before recommending anything." },
  { title: "We send a proposal", body: "The officers, tiers, equipment and plan the post needs." },
];

export default function ContactPage() {
  const phones = phonesByState();
  const emails = confirmedEmails();
  const socials = confirmedSocials();
  const whatsapp = company.whatsapp.confirmed ? company.whatsapp.value : null;
  const hours = company.officeHours.confirmed ? company.officeHours.value : null;

  return (
    <section className="pt-[var(--nav-h)]">
      <div className="wrap grid gap-14 pb-24 pt-14 md:pb-32 md:pt-20 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-12">
        <div className="order-1 lg:col-span-5 lg:row-start-1">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.85rem] text-mute">
              <Link href="/" className="inline-flex min-h-10 items-center font-[550] text-ink/70 transition-colors hover:text-navy">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <span className="eyebrow">Contact</span>
            </nav>
            <h1 className="display t-1 mt-6 max-w-[14ch]">Request a security consultation</h1>
            <p className="lead mt-7 max-w-[46ch] text-mute">
              Tell us about the site, event or person you need protected. We will get back to you to arrange an
              assessment.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="mt-12 border-t border-line">
              {steps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-4">
                  <span className="font-mono text-sm text-red">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-[600]">{s.title}</span>
                    <span className="mt-0.5 block text-[0.95rem] text-mute">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <div className="order-3 lg:col-span-5 lg:row-start-2">
          <Reveal delay={0.15}>
            <dl className="space-y-6">
              <div>
                <dt className="font-mono text-xs text-mute">Head office</dt>
                <dd className="mt-1.5">
                  <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[1.05rem]">
                    <span className="link-draw">{company.address.confirmed ? company.address.value : company.district}</span>
                    <ExternalArrow />
                  </a>
                </dd>
              </div>
              {hours && (
                <div>
                  <dt className="font-mono text-xs text-mute">Office hours</dt>
                  <dd className="mt-1.5 text-[1.05rem]">{hours}</dd>
                </div>
              )}
              {phones.length > 0 && (
                <div id="phone-lines" className="scroll-mt-[calc(var(--nav-h)+16px)]">
                  <dt className="font-mono text-xs text-mute">Phone lines</dt>
                  <dd className="mt-2">
                    <ul className="border-t border-line">
                      {phones.map((g) => (
                        <li key={g.state} className="grid grid-cols-[7.5rem_1fr] items-baseline gap-x-4 border-b border-line py-2">
                          <span className="text-[0.95rem] text-mute">{g.state}</span>
                          <span className="flex flex-wrap gap-x-4">
                            {g.numbers.map((n) => (
                              <a key={n} href={telHref(n)} className="link-draw inline-flex min-h-10 items-center text-[1.05rem]">
                                {formatPhone(n)}
                              </a>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {whatsapp && (
                <div>
                  <dt className="font-mono text-xs text-mute">WhatsApp</dt>
                  <dd className="mt-1.5">
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-draw text-[1.05rem]">
                      Message us on WhatsApp
                    </a>
                  </dd>
                </div>
              )}
              {emails.length > 0 && (
                <div>
                  <dt className="font-mono text-xs text-mute">Email</dt>
                  <dd className="mt-1.5 grid gap-1 text-[1.05rem]">
                    {emails.map((e) => (
                      <a key={e.value} href={`mailto:${e.value}`} className="link-draw w-fit">
                        {e.value}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
              {socials.length > 0 && (
                <div>
                  <dt className="font-mono text-xs text-mute">Social media</dt>
                  <dd className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[1.05rem]">
                    {socials.map((s) => (
                      <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1">
                        <span className="link-draw">{s.label}</span>
                        <ExternalArrow />
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        <Reveal className="order-2 lg:col-span-7 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-start" delay={0.05}>
          <div className="rounded-[24px] border border-line bg-white p-6 sm:p-8 md:p-12">
            <h2 className="display text-[1.9rem] leading-tight">Your consultation request</h2>
            <p className="mt-2 text-mute">All fields are required unless marked optional.</p>
            <div className="mt-10">
              <Suspense fallback={<div className="min-h-[720px]" aria-busy="true" />}>
                <EnquiryForm services={serviceOptions} />
              </Suspense>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
