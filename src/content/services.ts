import type { ImageKey } from "./images";

export type Service = {
  slug: string;
  name: string;
  /** One line used in lists and cards. */
  short: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** Second paragraph: how the service is planned or delivered. */
  approach: string;
  audience: string[];
  capabilities: { title: string; body: string }[];
  image?: ImageKey;
  related: string[];
  /**
   * false keeps the page out of navigation, sitemap and routing until the client confirms
   * the service is still offered.
   */
  published: boolean;
  seo: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "manned-guarding",
    name: "Manned Guarding",
    short: "Uniformed security officers for offices, estates, sites and homes, deployed in three tiers.",
    intro:
      "Manned guarding is the core of our work. We place trained, uniformed officers on gates, receptions, patrol routes and control points, and we supervise them on the post.",
    approach:
      "Each deployment starts with a vulnerability assessment of the site. We then choose officers from the Platinum, Diamond or Standard tier to match the duties, and brief them on the site's routines, visitors and risks before the first shift.",
    audience: [
      "Corporate offices and commercial buildings",
      "Residential estates and private homes",
      "Construction, industrial and storage sites",
      "Schools, churches and institutions",
    ],
    capabilities: [
      { title: "Controls access at gates and receptions", body: "Visitor checks, sign-in logs, ID confirmation and staff passes, run to the site's own rules." },
      { title: "Checks vehicles in and out", body: "Boot and cabin checks at entry points, with records of plates, drivers and times." },
      { title: "Patrols the perimeter", body: "Set patrol routes and times, with lights, fences, doors and locks checked on every round." },
      { title: "Keeps inventory and asset logs", body: "Records of goods, keys and equipment moving through the site." },
      { title: "Reports every incident", body: "Written occurrence reports so the client sees what happened, when and what was done." },
      { title: "Puts a commander on larger posts", body: "A Guard Force Commander from the Platinum tier leads the officers on bigger deployments." },
    ],
    image: "guardsLineUp",
    related: ["risk-assessment-consultancy", "security-equipment-technology", "event-security"],
    published: true,
    seo: {
      title: "Manned guarding in Lagos",
      description:
        "Trained, uniformed security officers for offices, estates, sites and homes, deployed in Platinum, Diamond and Standard tiers after a site assessment.",
    },
  },
  {
    slug: "k9-dog-services",
    name: "K9 and Guard Dog Services",
    short: "Trained guard dogs and handlers for sites that need a stronger deterrent.",
    intro:
      "We train, supply and handle guard dogs, and we deploy dog handlers to client sites. We also sell trained dogs and arrange veterinary care for them.",
    approach:
      "A dog team suits large compounds, yards and sites with long perimeters or night-time exposure. We agree with the client where the dog patrols, when, and how it is housed and cared for on site.",
    audience: [
      "Warehouses, yards and depots",
      "Estates and large private compounds",
      "Sites with long perimeters or night-time risk",
    ],
    capabilities: [
      { title: "Trains guard dogs", body: "Training for guarding and patrol work, with the handler and the dog trained together." },
      { title: "Supplies trained dogs", body: "Sale of trained guard dogs to organisations and individuals." },
      { title: "Deploys dog handlers", body: "Handlers placed on site to patrol with the dog and work alongside the guard team." },
      { title: "Arranges veterinary care", body: "Health checks and veterinary services for the dogs we supply and handle." },
    ],
    image: "k9",
    related: ["manned-guarding", "risk-assessment-consultancy"],
    published: true,
    seo: {
      title: "Guard dog and K9 services",
      description: "Guard dog training, supply, handling and deployment for warehouses, estates and large compounds in Lagos.",
    },
  },
  {
    slug: "secure-mobility",
    name: "Secure Mobility",
    short: "Security-trained drivers and transport for executives, visiting delegates and staff.",
    intro:
      "We arrange secure transport for executives, families and visiting delegates, provide drivers, and manage staff bus services for organisations.",
    approach:
      "Our drivers are trained in defensive and evasive driving. Routes, pick-up points and timings are planned before each movement and, where needed, coordinated with a protection officer.",
    audience: [
      "Executives and their families",
      "Visiting delegates and guests",
      "Organisations running staff buses",
    ],
    capabilities: [
      { title: "Provides security drivers", body: "Drivers trained in defensive and evasive driving, assigned to a person or a vehicle." },
      { title: "Plans airport and visitor transport", body: "Arrivals, departures and movements between hotel, office and venue." },
      { title: "Manages staff buses", body: "Routes, schedules and drivers for staff transport." },
    ],
    image: "chauffeur",
    related: ["executive-protection", "event-security"],
    published: true,
    seo: {
      title: "Secure drivers and executive transport",
      description: "Security-trained drivers, airport and visitor transport, and staff bus management for organisations in Lagos.",
    },
  },
  {
    slug: "executive-protection",
    name: "Executive Protection",
    short: "Close protection officers for executives, public figures and visiting guests.",
    intro:
      "We provide corporate and executive protection details: officers who stay with a person through their working day, their travel and their public appearances.",
    approach:
      "Protection is planned around the person's schedule. Before each engagement we check venues and routes, agree how the detail works with drivers and event staff, and brief every officer on the plan.",
    audience: ["Senior executives", "Public figures and their families", "Visiting guests and delegations"],
    capabilities: [
      { title: "Assigns close protection officers", body: "Officers who accompany the person and manage the space around them." },
      { title: "Checks venues and routes", body: "Visits ahead of time to plan entrances, exits and waiting areas." },
      { title: "Works with drivers and event teams", body: "One plan shared with the secure driver and any event security on duty." },
    ],
    related: ["secure-mobility", "event-security", "risk-assessment-consultancy"],
    published: true,
    seo: {
      title: "Executive protection",
      description: "Corporate and executive protection officers for senior executives, public figures and visiting guests, planned around each schedule.",
    },
  },
  {
    slug: "event-security",
    name: "Event Security",
    short: "Access control, guest checks and crowd management for events of every size.",
    intro:
      "We secure weddings, AGMs, product launches, trade fairs, convocations, conferences, church programmes and exhibitions. We also escort travel, airport runs and school sports.",
    approach:
      "We plan an event with the organiser: entrances, guest lists, screening, where the crowd will gather and how it leaves. Officers are briefed on the programme before the gates open.",
    audience: [
      "Event organisers and venues",
      "Churches and religious organisations",
      "Schools, colleges and universities",
      "Companies holding AGMs, launches and conferences",
    ],
    capabilities: [
      { title: "Checks guest lists and IDs", body: "Names, invitations and identification confirmed at the door." },
      { title: "Runs entrances and screening", body: "Controlled entry points, bag checks and metal detection where the event needs it." },
      { title: "Secures the perimeter", body: "Officers on the boundary, car parks and service entrances." },
      { title: "Manages crowds", body: "Steady flow in and out, clear exits and calm handling of busy moments." },
      { title: "Escorts travel and school sports", body: "Escorts for travel, airport runs and school sporting events." },
    ],
    image: "detectors",
    related: ["manned-guarding", "executive-protection", "secure-mobility"],
    published: true,
    seo: {
      title: "Event security in Lagos",
      description: "Guest list and ID checks, screening, perimeter security and crowd management for weddings, AGMs, conferences, church and school events.",
    },
  },
  {
    slug: "security-equipment-technology",
    name: "Security Equipment and Technology",
    short: "Supply and installation of CCTV, detectors, radios, alarms and physical barriers.",
    intro:
      "We supply security equipment and install CCTV, so the officers on a site have the tools the post needs.",
    approach:
      "Equipment is recommended after we have seen the site. We match cameras, detection, communication and barriers to the risks found in the assessment rather than selling a fixed kit.",
    audience: ["Corporate offices and banks", "Residential estates", "Warehouses and industrial sites", "Schools and event venues"],
    capabilities: [
      { title: "Supplies and installs CCTV", body: "Cameras placed to cover entrances, perimeters and key areas." },
      { title: "Supplies metal detectors", body: "Hand-held detectors for entrances and events." },
      { title: "Supplies vehicle inspection equipment", body: "Equipment for checking vehicles at gates." },
      { title: "Supplies radios", body: "Two-way radios so officers stay in contact across a site." },
      { title: "Supplies alarms", body: "Smoke and fire alarms, and anti-robbery alarm devices." },
      { title: "Supplies physical barriers", body: "Security doors and concertina wire for perimeters." },
    ],
    image: "cctv",
    related: ["risk-assessment-consultancy", "manned-guarding"],
    published: true,
    seo: {
      title: "Security equipment and CCTV installation",
      description: "CCTV supply and installation, metal detectors, radios, alarms, security doors and perimeter barriers, matched to each site.",
    },
  },
  {
    slug: "recruitment-management",
    name: "Recruitment and Management Services",
    short: "Staff recruitment, interviews, training and management consultancy for organisations.",
    intro:
      "We recruit and interview staff for organisations, and provide employee training and management consultancy.",
    approach:
      "We agree the role, the standard and the checks with the client, then run the search, the interviews and the onboarding training.",
    audience: ["Corporate organisations", "Growing businesses"],
    capabilities: [
      { title: "Recruits and interviews staff", body: "Shortlisting and interviews to the client's brief." },
      { title: "Trains employees", body: "Training and human capital development for new and existing staff." },
      { title: "Advises on management", body: "Management consultancy on staffing and structure." },
    ],
    related: ["risk-assessment-consultancy"],
    // Hidden until the client confirms this service is still offered (brief section 5D.7).
    published: false,
    seo: {
      title: "Recruitment and management services",
      description: "Staff recruitment, interviews, employee training and management consultancy.",
    },
  },
  {
    slug: "risk-assessment-consultancy",
    name: "Risk Assessment and Security Consultancy",
    short: "Security surveys, vulnerability assessments, advice and training for organisations.",
    intro:
      "We survey sites, assess security needs and weak points, and advise on the people, procedures and equipment that close them. We also train in-house security teams.",
    approach:
      "A consultancy engagement usually starts with a walk of the site and a talk with the people who run it. The output is a plain written view of the risks and what to do about each one, in order.",
    audience: ["Organisations reviewing their security", "Property and facility managers", "Schools and institutions", "Event organisers planning large gatherings"],
    capabilities: [
      { title: "Surveys sites", body: "A walk of the site covering entrances, perimeters, lighting, staffing and routines." },
      { title: "Assesses vulnerabilities and needs", body: "Where the site is exposed, and what it needs in people, procedures and equipment." },
      { title: "Advises on security", body: "Written recommendations in order of priority." },
      { title: "Trains security staff", body: "Training for in-house guards and the staff who supervise them." },
      { title: "Sources equipment", body: "Help choosing and buying the equipment the assessment calls for." },
    ],
    related: ["manned-guarding", "security-equipment-technology"],
    published: true,
    seo: {
      title: "Security risk assessment and consultancy",
      description: "Site security surveys, vulnerability and needs assessments, written advice and training for security teams in Lagos.",
    },
  },
];

export const publishedServices = services.filter((s) => s.published);
export const getService = (slug: string) => publishedServices.find((s) => s.slug === slug);
