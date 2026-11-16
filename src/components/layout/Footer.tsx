import Link from "next/link";
import { company, confirmedEmails, confirmedSocials, formatPhone, mapSearchUrl, phonesByState, telHref } from "@/content/company";
import { footerNav } from "@/content/site";
import { creditedImages } from "@/content/images";
import { Logo } from "@/components/ui/Logo";
import { ExternalArrow } from "@/components/ui/Buttons";

export function Footer() {
  const lagos = phonesByState().find((g) => g.state === "Lagos");
  const nationwide = phonesByState().find((g) => g.state === "Nationwide");
  const emails = confirmedEmails();
  const socials = confirmedSocials();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mute">
            Private guarding, protection and security consultancy from Lagos. {company.tagline}.
          </p>
          <dl className="mt-8 space-y-5 text-[0.95rem]">
            <div>
              <dt className="font-mono text-xs text-mute">Head office</dt>
              <dd className="mt-1.5 max-w-xs leading-relaxed">
                <a href={mapSearchUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
                  {company.address.confirmed ? company.address.value : company.district}
                </a>
              </dd>
            </div>
            {[lagos, nationwide].filter((g) => g !== undefined).map((g) => (
              <div key={g.state}>
                <dt className="font-mono text-xs text-mute">{g.state}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-4">
                  {g.numbers.map((n) => (
                    <a key={n} href={telHref(n)} className="link-draw inline-flex min-h-10 items-center">
                      {formatPhone(n)}
                    </a>
                  ))}
                </dd>
              </div>
            ))}
            {emails.length > 0 && (
              <div>
                <dt className="font-mono text-xs text-mute">Email</dt>
                <dd className="mt-1 grid">
                  {emails.map((e) => (
                    <a key={e.value} href={`mailto:${e.value}`} className="link-draw inline-flex min-h-10 w-fit items-center">
                      {e.value}
                    </a>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          <Link href="/contact#phone-lines" className="mt-4 inline-flex min-h-10 items-center font-[560] text-navy">
            <span className="link-draw">See phone lines for every state</span>
          </Link>
        </div>

        {footerNav.map((col) => (
          <nav key={col.title} aria-label={col.title} className="md:col-span-2">
            <h2 className="font-mono text-xs text-mute">{col.title}</h2>
            <ul className="mt-5 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center text-[0.95rem] text-ink/85 transition-colors hover:text-navy">
                    <span className="link-draw">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {socials.length > 0 && (
          <nav aria-label="Social media" className="md:col-span-2">
            <h2 className="font-mono text-xs text-mute">Follow</h2>
            <ul className="mt-5 space-y-1">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center gap-1.5 text-[0.95rem] text-ink/85 transition-colors hover:text-navy"
                  >
                    <span className="link-draw">{s.label}</span>
                    <ExternalArrow />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-4 py-6 text-[0.8rem] text-mute md:flex-row md:items-center md:justify-between">
          <p>© {company.name}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="link-draw inline-flex min-h-10 items-center">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-draw inline-flex min-h-10 items-center">
                Website terms
              </Link>
            </li>
            {creditedImages.length > 0 && (
              <li>
                <Link href="/terms#photo-credits" className="link-draw inline-flex min-h-10 items-center">
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
