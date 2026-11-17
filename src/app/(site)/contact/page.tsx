import Link from "next/link";
import { Suspense } from "react";
import { HeroLine, HeroText } from "@/components/motion/HeroEnter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SectionHead } from "@/components/sections/Blocks";
import { ExternalArrow } from "@/components/ui/Buttons";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon, SocialIcon } from "@/components/ui/Icons";
import {
  company,
  confirmedEmails,
  confirmedSocials,
  formatPhone,
  mapSearchUrl,
  phonesByState,
  primaryEmail,
  primaryPhone,
  telHref,
} from "@/content/company";
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
  const address = company.address.confirmed ? company.address.value : company.district;
  const call = primaryPhone();
  const mail = primaryEmail();

  const quick = [
    call && { icon: <PhoneIcon />, label: "Call Lagos", value: formatPhone(call.value), href: telHref(call.value) },
    mail && { icon: <MailIcon />, label: "Email us", value: mail.value, href: `mailto:${mail.value}` },
    { icon: <PinIcon />, label: "Head office", value: company.district, href: mapSearchUrl, external: true },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string; external?: boolean }[];

  return (
    <>
      {/* Hero */}
      <section className="px-2 pt-[var(--nav-h)] md:px-3">
        <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-navy-deep text-white">
          <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-navy blur-[110px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-52 left-10 -z-10 h-[360px] w-[360px] rounded-full bg-red/30 blur-[120px]" aria-hidden="true" />
          <div className="grid-lines pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="wrap grid gap-10 pb-14 pt-10 md:pb-16 md:pt-14 lg:grid-cols-12 lg:items-end">
            <HeroText className="lg:col-span-7" delay={0.05}>
              <HeroLine>
                <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.85rem] text-white/60">
                  <Link href="/" className="inline-flex min-h-10 items-center font-[550] text-white/80 transition-colors hover:text-white">
                    Home
                  </Link>
                  <span aria-hidden="true">/</span>
                  <span className="eyebrow">Contact</span>
                </nav>
              </HeroLine>
              <HeroLine>
                <h1 className="display t-1 mt-5 max-w-[15ch] text-balance">Request a security consultation</h1>
              </HeroLine>
              <HeroLine>
                <p className="lead mt-6 max-w-[50ch] text-white/75">
                  Tell us about the site, event or person you need protected. We will get back to you to arrange an
                  assessment.
                </p>
              </HeroLine>
            </HeroText>
            <Stagger className="grid gap-3 lg:col-span-5" gap={0.08}>
              {quick.map((q) => (
                <StaggerItem key={q.label}>
                  <a
                    href={q.href}
                    {...(q.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-[18px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.12]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red text-white transition-transform duration-500 group-hover:scale-110">
                      {q.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-[600] uppercase tracking-[0.1em] text-white/60">{q.label}</span>
                      <span className="block truncate font-[600]">{q.value}</span>
                    </span>
                    <ExternalArrow className="ml-auto shrink-0 opacity-60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Form and process */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <SectionHead eyebrow="What happens next" title="From request to a guarded post" />
            <Stagger as="ol" className="relative mt-10 grid gap-3" gap={0.1}>
              {steps.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="flex gap-4 rounded-[18px] border border-line bg-sand p-5">
                  <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[0.95rem] text-white">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-[650] tracking-[-0.01em]">{s.title}</span>
                    <span className="mt-1 block text-[0.95rem] leading-relaxed text-mute">{s.body}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            {hours && (
              <Reveal className="mt-6">
                <p className="flex items-center gap-3 rounded-[18px] bg-navy-deep p-5 text-white">
                  <ClockIcon className="text-red" />
                  <span>
                    <span className="block text-xs font-[600] uppercase tracking-[0.1em] text-white/60">Office hours</span>
                    {hours}
                  </span>
                </p>
              </Reveal>
            )}
          </div>

          <Reveal className="order-1 lg:order-2 lg:col-span-7" delay={0.05}>
            <div className="rounded-[24px] border border-line bg-white p-6 shadow-[0_30px_60px_-40px_rgba(15,35,88,0.35)] sm:p-8 md:p-12">
              <span className="block h-1 w-10 rounded-full bg-red" aria-hidden="true" />
              <h2 className="display mt-6 text-[1.9rem] leading-tight">Your consultation request</h2>
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

      {/* Phone lines by state */}
      {phones.length > 0 && (
        <section id="phone-lines" className="band scroll-mt-[calc(var(--nav-h)+16px)] bg-sand py-20 md:py-28">
          <div className="wrap">
            <SectionHead
              split
              eyebrow="Phone lines"
              title="Call the line for your state"
              lead="Each line below is listed on our official website. Tap a number to call it from your phone."
            />
            <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
              {phones.map((g) => {
                const featured = g.state === "Lagos" || g.state === "Nationwide";
                const red = g.state === "Nationwide";
                return (
                  <StaggerItem
                    key={g.state}
                    className={`card-lift flex flex-col rounded-[22px] p-6 ${
                      red ? "bg-red text-white" : featured ? "bg-navy-deep text-white" : "border border-line bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="display text-[1.35rem]">{g.state}</span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${
                          featured ? "bg-white/15 text-white" : "bg-red/10 text-red"
                        }`}
                      >
                        <PhoneIcon className="h-[18px] w-[18px]" />
                      </span>
                    </div>
                    {g.state === "Lagos" && <p className="mt-1 text-sm text-white/70">Head office</p>}
                    {g.state === "Nationwide" && <p className="mt-1 text-sm text-white/80">For any state</p>}
                    <div className="mt-5 grid gap-2">
                      {g.numbers.map((n) => (
                        <a
                          key={n}
                          href={telHref(n)}
                          className={`flex min-h-12 items-center justify-between rounded-full px-5 font-[600] tabular-nums tracking-[0.01em] transition-colors duration-300 ${
                            featured
                              ? "bg-white/12 hover:bg-white hover:text-ink"
                              : "bg-sand text-ink hover:bg-navy hover:text-white"
                          }`}
                        >
                          {formatPhone(n)}
                          <span className="text-xs font-[600] uppercase tracking-[0.1em] opacity-70">Call</span>
                        </a>
                      ))}
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Email, social and address */}
      <section className="py-20 md:py-28">
        <div className="wrap grid gap-4 lg:grid-cols-3">
          {emails.length > 0 && (
            <Reveal className="card-lift rounded-[24px] border border-line bg-white p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
                <MailIcon />
              </span>
              <h2 className="display mt-6 text-[1.5rem]">Email</h2>
              <div className="mt-4 grid gap-2">
                {emails.map((e) => (
                  <a key={e.value} href={`mailto:${e.value}`} className="link-draw w-fit break-all font-[550] text-navy">
                    {e.value}
                  </a>
                ))}
              </div>
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="link-draw mt-4 inline-block font-[550] text-navy">
                  Message us on WhatsApp
                </a>
              )}
            </Reveal>
          )}
          {socials.length > 0 && (
            <Reveal delay={0.08} className="card-lift rounded-[24px] bg-navy-deep p-7 text-white">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red text-white">
                <SocialIcon name="share" />
              </span>
              <h2 className="display mt-6 text-[1.5rem]">Follow us</h2>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 items-center gap-2.5 rounded-full bg-white/10 px-4 text-sm font-[600] transition-colors duration-300 hover:bg-white hover:text-ink"
                    >
                      <SocialIcon name={s.label} className="h-[18px] w-[18px] shrink-0" />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.16} className="card-lift flex flex-col rounded-[24px] border border-line bg-white p-7">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red text-white">
              <PinIcon />
            </span>
            <h2 className="display mt-6 text-[1.5rem]">Head office</h2>
            <p className="mt-4 leading-relaxed text-ink/85">{address}</p>
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 pt-6 font-[600] text-navy"
            >
              <span className="link-draw">Open in a map</span>
              <ExternalArrow />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
