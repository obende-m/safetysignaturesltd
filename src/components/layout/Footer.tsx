import Link from "next/link";
import { company, confirmedEmails, confirmedSocials, formatPhone, mapSearchUrl, phonesByState, telHref } from "@/content/company";
import { footerNav, primaryAction } from "@/content/site";
import { creditedImages } from "@/content/images";
import { Logo } from "@/components/ui/Logo";
import { Arrow } from "@/components/ui/Buttons";
import { MailIcon, PhoneIcon, PinIcon, SocialIcon } from "@/components/ui/Icons";

export function Footer() {
  const lagos = phonesByState().find((g) => g.state === "Lagos");
  const nationwide = phonesByState().find((g) => g.state === "Nationwide");
  const emails = confirmedEmails();
  const socials = confirmedSocials();

  return (
    <footer className="on-dark relative isolate mt-2 overflow-hidden bg-navy-deep text-white md:mt-3">
      <div className="pointer-events-none absolute -right-40 -top-56 -z-10 h-[520px] w-[520px] rounded-full bg-navy blur-[120px]" aria-hidden="true" />
      <div className="h-[3px] bg-gradient-to-r from-red via-red to-navy" aria-hidden="true" />

      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo chip width={140} />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/70">
            Private guarding, protection and security consultancy from Lagos. <span className="text-white">{company.tagline}.</span>
          </p>

          <ul className="mt-8 grid gap-3 text-[0.95rem]">
            <li className="flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-red" />
              <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="link-draw max-w-xs leading-relaxed text-white/85">
                {company.address.confirmed ? company.address.value : company.district}
              </a>
            </li>
            {[lagos, nationwide]
              .filter((g) => g !== undefined)
              .map((g) => (
                <li key={g.state} className="flex gap-3">
                  <PhoneIcon className="mt-2.5 h-5 w-5 shrink-0 text-red" />
                  <span className="flex flex-wrap items-center gap-x-3">
                    <span className="text-white/55">{g.state}</span>
                    {g.numbers.map((n) => (
                      <a key={n} href={telHref(n)} className="link-draw inline-flex min-h-10 items-center text-white/90">
                        {formatPhone(n)}
                      </a>
                    ))}
                  </span>
                </li>
              ))}
            {emails.length > 0 && (
              <li className="flex gap-3">
                <MailIcon className="mt-2.5 h-5 w-5 shrink-0 text-red" />
                <span className="grid">
                  {emails.map((e) => (
                    <a key={e.value} href={`mailto:${e.value}`} className="link-draw inline-flex min-h-10 w-fit items-center break-all text-white/90">
                      {e.value}
                    </a>
                  ))}
                </span>
              </li>
            )}
          </ul>
          <Link href="/contact#phone-lines" className="mt-5 inline-flex min-h-10 items-center gap-2 font-[600] text-white">
            <span className="link-draw">See phone lines for every state</span>
            <Arrow />
          </Link>
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="text-xs font-[600] uppercase tracking-[0.12em] text-white/50">{col.title}</h2>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-[0.95rem] text-white/80 transition-colors hover:text-white">
                    <span className="link-draw">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-2">
          <h2 className="text-xs font-[600] uppercase tracking-[0.12em] text-white/50">Follow</h2>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-red hover:bg-red"
                  >
                    <SocialIcon name={s.label} className="h-[18px] w-[18px]" />
                    <span className="sr-only">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <Link href={primaryAction.href} className="btn btn-primary mt-8 w-full !px-4 text-[0.88rem]">
            Get in touch
            <Arrow />
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-6 text-[0.8rem] text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {company.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="link-draw inline-flex min-h-10 items-center hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-draw inline-flex min-h-10 items-center hover:text-white">
                Website terms
              </Link>
            </li>
            {creditedImages.length > 0 && (
              <li>
                <Link href="/terms#photo-credits" className="link-draw inline-flex min-h-10 items-center hover:text-white">
                  Some service photographs via Wikimedia Commons
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
