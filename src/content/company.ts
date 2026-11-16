/**
 * Company facts.
 *
 * Every item that came from the research dossier but has not been confirmed by the client
 * carries `confirmed: false`. The site only renders confirmed items. To publish one after the
 * client confirms it, set `confirmed: true` here. See CONTENT-STATUS.md for the full list.
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
    value: "Security House, Salami Ogejo Street, off Palace Way, Oko Cole, Oworonshoki, Lagos",
    confirmed: false,
    note: "Website, registry and LinkedIn give three different addresses. Client to confirm the head office.",
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
    { label: "Lagos", value: "08090529833", confirmed: false },
    { label: "Lagos", value: "07067549620", confirmed: false },
    { label: "Abuja", value: "08068921957", confirmed: false },
    { label: "Ondo", value: "08131888806", confirmed: false },
    { label: "Osun", value: "07054801247", confirmed: false },
    { label: "Ogun", value: "07065059884", confirmed: false },
    { label: "Rivers", value: "07035181561", confirmed: false },
    { label: "Edo", value: "09030317607", confirmed: false },
    { label: "Delta", value: "08068206696", confirmed: false },
    { label: "Nationwide", value: "08144363266", confirmed: false },
  ],

  emails: [
    { label: "Enquiries", value: "security@safetysignaturesltd.com", confirmed: false },
    { label: "Alternative", value: "safetysignatures@yahoo.com", confirmed: false },
  ],

  /** International format without +, e.g. "2348012345678". */
  whatsapp: { value: null as string | null, confirmed: false },

  officeHours: { value: null as string | null, confirmed: false },

  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/safety-signatures-limited", confirmed: true },
    { label: "Facebook", href: "https://www.facebook.com/safetysignaturesltd/", confirmed: true },
    { label: "Instagram", href: "https://www.instagram.com/safetysignaturesltd/", confirmed: true },
  ],
} as const;

export const confirmedPhones = () => company.phones.filter((p) => p.confirmed);
export const confirmedEmails = () => company.emails.filter((e) => e.confirmed);
export const confirmedSocials = () => company.socials.filter((s) => s.confirmed);

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://safetysignaturesltd.com.ng").replace(/\/$/, "");

export const mapSearchUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent("Oworonshoki, Lagos, Nigeria")}`;

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
