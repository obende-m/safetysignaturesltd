/**
 * Company facts.
 *
 * Contact details (phones, emails, address, social profiles) are taken from the company's own
 * live website, https://safetysignaturesltd.com.ng/contact/, read on 16 November 2026, which the
 * client named as the authoritative source. Items that site does not publish (registration number,
 * licence, founding year, WhatsApp, office hours) carry `confirmed: false` and are not rendered.
 * See CONTENT-STATUS.md for discrepancies with the research dossier.
 */

export type Confirmable<T> = { value: T; confirmed: boolean; note?: string };

export const company = {
  name: "Safety Signatures Limited",
  shortName: "Safety Signatures",
  tagline: "Reliability Assured",
  brandLine: "Signatures of Safety",

  /** Oworonshoki appears in both the registry address and the company's own website. */
  district: "Oworonshoki, Lagos",

  address: {
    value: "Security House, Salami Ogejo Street, Off Palace Way, Oko Cole, Oworonshoki, Lagos",
    confirmed: true,
    note: "From the live website. The CAC registry mirror (30 Asunmogejo Close) and LinkedIn (Maryland) differ: flagged for the client.",
  } satisfies Confirmable<string>,

  /** CAC registration. Shown only after it is checked against search.cac.gov.ng. */
  rcNumber: { value: "RC 1184462", confirmed: false } satisfies Confirmable<string>,

  /** Founding year is disputed (2005 in media, 11 April 2014 on the registry). Never shown until confirmed. */
  foundingYear: { value: null as number | null, confirmed: false },

  /** NSCDC licence details. Never shown without the certificate. */
  licence: {
    value: null as null | { number: string; category: string; expires: string },
    confirmed: false,
  },

  phones: [
    { label: "Lagos", value: "08090529833", confirmed: true },
    { label: "Lagos", value: "07067549620", confirmed: true },
    { label: "Abuja", value: "08068921957", confirmed: true },
    { label: "Ondo", value: "08131888806", confirmed: true },
    { label: "Osun", value: "07054801247", confirmed: true },
    { label: "Ogun", value: "07065059884", confirmed: true },
    { label: "Rivers", value: "07035181561", confirmed: true },
    { label: "Edo", value: "09030317607", confirmed: true },
    { label: "Delta", value: "08068206696", confirmed: true },
    { label: "Nationwide", value: "08144363266", confirmed: true },
  ],

  emails: [
    { label: "Enquiries", value: "security@safetysignaturesltd.com", confirmed: true },
    { label: "Alternative", value: "safetysignatures@yahoo.com", confirmed: true },
  ],

  /** International format without +, e.g. "2348012345678". */
  whatsapp: { value: null as string | null, confirmed: false },

  officeHours: { value: null as string | null, confirmed: false },

  /** Exactly as linked from the live website's header and footer. */
  socials: [
    { label: "Facebook", href: "https://www.facebook.com/safetysignaturesltd/", confirmed: true },
    { label: "Instagram", href: "https://www.instagram.com/safetysignaturesltd/", confirmed: true },
    { label: "X (Twitter)", href: "https://twitter.com/safetysignature", confirmed: true },
    {
      label: "LinkedIn",
      // The live site links this personal-type profile; the dossier found a company page at
      // linkedin.com/company/safety-signatures-limited. Flagged for the client to choose.
      href: "https://www.linkedin.com/in/safety-signatures-ltd-bbb784177/",
      confirmed: true,
    },
  ],
} as const;

export const confirmedPhones = () => company.phones.filter((p) => p.confirmed);
export const confirmedEmails = () => company.emails.filter((e) => e.confirmed);
export const confirmedSocials = () => company.socials.filter((s) => s.confirmed);

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://safetysignaturesltd.com.ng").replace(/\/$/, "");

export const mapSearchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent("Salami Ogejo Street, Oworonshoki, Lagos, Nigeria")}`;

/** "08090529833" -> "0809 052 9833" for display; links keep the digits as published. */
export const formatPhone = (n: string) => n.replace(/^(\d{4})(\d{3})(\d{4})$/, "$1 $2 $3");
export const telHref = (n: string) => `tel:+234${n.replace(/^0/, "")}`;

/** Phone lines grouped by state, in the order the live website lists them. */
export const phonesByState = () => {
  const map = new Map<string, string[]>();
  for (const p of confirmedPhones()) map.set(p.label, [...(map.get(p.label) ?? []), p.value]);
  return [...map.entries()].map(([state, numbers]) => ({ state, numbers }));
};

export const primaryPhone = () => confirmedPhones()[0];
export const primaryEmail = () => confirmedEmails()[0];

/** Supported, sourced recognition. Each has a public source. */
export const nscdcVisit = {
  date: "5 September 2023",
  isoDate: "2023-09-05",
  summary:
    "The Assistant Commandant General in charge of the NSCDC's Private Guard Companies department inspected Safety Signatures in Lagos and, according to the published report, commended the company and its Managing Director for professionalism and compliance.",
  source: {
    publication: "Northern View",
    title: "ACG PGC visits Safety Signatures in Lagos, harps on professionalism in the private security industry",
    url: "https://www.northernview.ng/2023/09/05/acg-pgc-visits-safety-signatures-in-lagos-harps-on-professionalism-in-the-private-security-industry/",
  },
};
