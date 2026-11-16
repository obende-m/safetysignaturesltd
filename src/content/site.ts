import { publishedServices } from "./services";

export const primaryAction = { label: "Request a consultation", href: "/contact" } as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: publishedServices.map((s) => ({ label: s.name, href: `/services/${s.slug}`, description: s.short })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Training", href: "/training-standards" },
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "About us", href: "/about", description: "Who we are, what we stand for and how we work." },
      { label: "Leadership", href: "/leadership", description: "Dr. Cynthia Gregg, Managing Director and CEO." },
      { label: "Why Safety Signatures", href: "/why-safety-signatures", description: "What sets our guarding apart." },
      { label: "News and recognition", href: "/news", description: "Press coverage, visits and recognition." },
      { label: "Security insights", href: "/insights", description: "Practical security advice from our team." },
    ],
  },
  { label: "Careers", href: "/careers" },
];

export const footerNav = [
  {
    title: "Services",
    links: publishedServices.map((s) => ({ label: s.name, href: `/services/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Why Safety Signatures", href: "/why-safety-signatures" },
      { label: "Training and standards", href: "/training-standards" },
      { label: "Industries we serve", href: "/industries" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "News and recognition", href: "/news" },
      { label: "Security insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const industries = [
  {
    name: "Corporate organisations",
    need: "Head offices and branches need controlled receptions, staff and visitor passes, and officers who represent the company well at the front desk.",
    services: ["manned-guarding", "executive-protection", "risk-assessment-consultancy"],
  },
  {
    name: "Commercial properties",
    need: "Shopping centres, office buildings and mixed-use sites need gates, car parks and loading bays watched around the clock.",
    services: ["manned-guarding", "security-equipment-technology", "k9-dog-services"],
  },
  {
    name: "Residential estates",
    need: "Estates need visitor logs, vehicle checks, patrols and gate routines that residents and officers keep every day.",
    services: ["manned-guarding", "k9-dog-services", "security-equipment-technology"],
  },
  {
    name: "Schools and institutions",
    need: "Schools need safe drop-off and pick-up, controlled visitors and officers who are calm and patient around children.",
    services: ["manned-guarding", "event-security", "risk-assessment-consultancy"],
  },
  {
    name: "Churches and religious organisations",
    need: "Services and programmes bring large crowds at set times, with car parks, entrances and offerings to protect.",
    services: ["event-security", "manned-guarding"],
  },
  {
    name: "Event organisers",
    need: "Weddings, launches, AGMs and conferences need guest checks, screening, perimeter control and crowd management for a day.",
    services: ["event-security", "executive-protection", "secure-mobility"],
  },
  {
    name: "Hotels and hospitality",
    need: "Hotels need discreet officers at entrances and car parks, and protection for guests who need it.",
    services: ["manned-guarding", "executive-protection", "security-equipment-technology"],
  },
  {
    name: "Executives and private clients",
    need: "Senior people and their families need protection, secure drivers and a home that is guarded properly.",
    services: ["executive-protection", "secure-mobility", "manned-guarding"],
  },
] as const;

export const serviceOptions = [
  ...publishedServices.map((s) => s.name),
  "Not sure yet",
] as const;
