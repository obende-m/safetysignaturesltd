/**
 * Seed content for the `articles` table.
 *
 * - kind "media": coverage published by other outlets, linked to the original source.
 * - kind "insight": original Safety Signatures security advice ("Weekly Security Tonic").
 *
 * When Supabase is configured the site reads from the database, and this file only seeds it
 * (`npm run db:seed-sql`). Without Supabase (local development) the site falls back to this file.
 */

export type MediaCategory = "regulatory" | "speaking" | "ceo_recognition" | "media_feature" | "commentary";

export const mediaCategoryLabels: Record<MediaCategory, string> = {
  regulatory: "Regulatory visit",
  speaking: "Speaking engagement",
  ceo_recognition: "Recognition of the CEO",
  media_feature: "Media feature",
  commentary: "Commentary",
};

export type Article = {
  slug: string;
  kind: "media" | "insight";
  title: string;
  excerpt: string;
  body?: string | null;
  category?: MediaCategory | string | null;
  publication?: string | null;
  sourceUrl?: string | null;
  publishedAt: string; // ISO date
  dateLabel?: string | null; // when the exact day is unknown
  readingMinutes?: number | null;
};

export const seedMedia: Article[] = [
  {
    slug: "nscdc-pgc-visit-2023",
    kind: "media",
    category: "regulatory",
    title: "ACG PGC visits Safety Signatures in Lagos, harps on professionalism in the private security industry",
    publication: "Northern View",
    publishedAt: "2023-09-05",
    excerpt:
      "The NSCDC's Assistant Commandant General for Private Guard Companies inspected Safety Signatures in Lagos. The report says he commended the company and its Managing Director for professionalism and compliance.",
    sourceUrl:
      "https://www.northernview.ng/2023/09/05/acg-pgc-visits-safety-signatures-in-lagos-harps-on-professionalism-in-the-private-security-industry/",
  },
  {
    slug: "naosnp-conference-2023-people-power",
    kind: "media",
    category: "speaking",
    title: "Cynthia Gregg identifies quest to dominate as cause of proliferation of small arms",
    publication: "People & Power",
    publishedAt: "2023-09-23",
    excerpt:
      "Dr. Cynthia Gregg spoke as a panellist on small arms and light weapons at the NAOSNP National Security Conference at the Civic Centre, Lagos.",
    sourceUrl: "https://peopleandpowermag.com/cynthia-gregg-identifies-quest-to-dominate-as-cause-of-proliferation-of-small-arms/",
  },
  {
    slug: "naosnp-conference-2023-the-niche",
    kind: "media",
    category: "speaking",
    title: "NAOSNP conference: security agencies seek collaboration in tackling proliferation of firearms in Nigeria",
    publication: "The Niche",
    publishedAt: "2023-09-21",
    excerpt:
      "Coverage of the 2023 NAOSNP National Security Conference in Lagos, including the panel on firearms proliferation on which Dr. Gregg spoke.",
    sourceUrl:
      "https://thenicheng.com/naonsp-conference-security-agencies-seek-collaboration-in-tackling-proliferation-of-firearms-in-nigeria/",
  },
  {
    slug: "mirwa-2024",
    kind: "media",
    category: "ceo_recognition",
    title: "Dr. Cynthia Gregg named among Trek Africa's 25 Most Influential and Role Model Women in Africa",
    publication: "Trek Africa",
    publishedAt: "2025-01-09",
    excerpt:
      "Trek Africa recognised Dr. Gregg in its 25 Most Influential and Role Model Women in Africa list at a ceremony at the Oriental Hotel, Lekki, on 30 December 2024.",
    sourceUrl:
      "https://trekafrica.net/security-expert-dr-cynthia-gregg-urges-women-to-participate-in-governance-says-we-are-backbone-of-our-communities-bagged-25-most-influential-role-model-women-in-africas-award/",
  },
  {
    slug: "guardian-female-ceos-2023",
    kind: "media",
    category: "media_feature",
    title: "The Guardian's special focus on fifty impactful female CEOs of 2023",
    publication: "The Guardian (Nigeria)",
    publishedAt: "2024-01-01",
    dateLabel: "2024",
    excerpt: "Dr. Gregg is profiled in The Guardian's feature on female chief executives contributing to Nigeria's economy.",
    sourceUrl:
      "https://guardian.ng/features/the-guardians-special-focus-on-fifty-most-impactful-and-award-winning-female-ceos-that-contributed-to-nigerias-gdp-growth-in-2023/",
  },
  {
    slug: "force-pro-commentary-2023",
    kind: "media",
    category: "commentary",
    title: "Signatures boss Cynthia Gregg lauds Force PRO for swift response to public complaints",
    publication: "Citizens Compass",
    publishedAt: "2023-08-22",
    excerpt: "Dr. Gregg commented on the Nigeria Police Force's handling of public complaints and emergencies.",
    sourceUrl:
      "https://www.citizenscompassngr.com/signatures-boss-cynthia-gregg-lauds-force-pro-for-swift-response-to-public-complaints/",
  },
  {
    slug: "iwd-2025",
    kind: "media",
    category: "commentary",
    title: "IWD 2025: Safety Signatures CEO Cynthia Gregg celebrates Nigerian women's resilience",
    publication: "Tochlight Africa",
    publishedAt: "2025-03-08",
    dateLabel: "March 2025",
    excerpt: "An International Women's Day message from Dr. Gregg on women's participation in governance and public life.",
    sourceUrl:
      "https://thetochlightafrica.com/iwd-2025-safety-signatures-ceo-cynthia-gregg-celebrates-nigerian-womens-resilience-calls-for-greater-involvement-in-governance-we-are-the-backbone-of-our-nation-she-says/",
  },
  {
    slug: "honorary-doctorate-2021",
    kind: "media",
    category: "ceo_recognition",
    title: "Security entrepreneur Cynthia Gregg receives honorary doctorate from Ames Christian University",
    publication: "Trek Africa",
    publishedAt: "2021-09-12",
    excerpt:
      "Ames Christian University, with the International College of Ministry in Ibadan, conferred an honorary Doctor of Ministry degree on Cynthia Gregg on 11 September 2021.",
    sourceUrl:
      "https://trekafrica.net/security-entrepreneur-cynthia-gregg-bags-honorary-ph-d-from-ames-christian-university-says-degree-is-huge-responsibility-to-bless-humanity/",
  },
];

export const seedInsights: Article[] = [
  {
    slug: "ember-months-security-checklist",
    kind: "insight",
    category: "Seasonal",
    title: "An ember months security checklist for homes and offices",
    publishedAt: "2026-11-02",
    readingMinutes: 4,
    excerpt:
      "From September to December, movement, cash and visitors all increase. Seven checks to run before the festive season starts.",
    body: `From September to December, Lagos gets busier. More people travel, more cash changes hands, more deliveries arrive and more temporary workers come and go. Each of those is a gap someone can use. These are the checks we run with clients before the season starts.

## 1. Count the keys

Write down who holds a key to every gate, door and store. Collect keys from people who no longer need them, and change locks where a key cannot be accounted for.

## 2. Brief the officers on the season

Visitor numbers rise and routines change. Tell the officers on post which deliveries to expect, which staff will be on leave and who may collect on their behalf.

## 3. Check the lights

Walk the site after dark. Replace failed bulbs, cut back trees that block lamps and make sure the gate, the car park and the back of the building are lit.

## 4. Vet temporary workers

Seasonal staff, decorators and caterers should be named, expected and signed in. Nobody should be waved through because they arrived with someone familiar.

## 5. Plan cash movements

Vary the times and routes of bank runs, keep cash on site to a minimum and never discuss amounts or timings where they can be overheard.

## 6. Agree travel plans

If you or your family will travel, tell your security provider when the house will be empty, who has access and how to reach you.

## 7. Test the alarms

Test smoke and fire alarms, check the CCTV is recording and confirm that the officers know who to call and in what order.

None of these checks needs new equipment. Most of them need half an hour and a list. If you would like us to run the walk-through with you, request a consultation.`,
  },
  {
    slug: "before-your-event-gates-open",
    kind: "insight",
    category: "Events",
    title: "What to settle before your event's gates open",
    publishedAt: "2026-10-12",
    readingMinutes: 4,
    excerpt:
      "Most event security problems are decided before the first guest arrives. Six things to agree with your security team in advance.",
    body: `Weddings, AGMs, launches and church programmes share one pattern: the problems that spoil them are usually settled, or not settled, before the first guest arrives. Six things to agree with your security team in advance.

## The guest list and who owns it

Decide who holds the final list, how late changes reach the door and what happens when someone is not on it. One named person on the organiser's side should be able to make that call.

## The number of entrances

Every open entrance needs officers. Fewer, well-run entrances are better than many loosely watched ones. Close and secure the rest.

## Screening

Decide in advance whether bags will be checked and whether metal detection is needed, and tell guests in the invitation. Surprise screening at the gate causes queues and arguments.

## The vehicle plan

Where do guests park, where do VIPs drop off and where do suppliers unload? Each needs its own route and an officer who knows it.

## The crowd's busiest moments

Arrival, the main programme, meals and departure each move the crowd differently. Plan where officers stand at each stage, and keep exits clear the whole time.

## The briefing

Every officer should know the programme, the layout, the names of the organiser's contacts and the emergency plan before the gates open. A ten-minute briefing prevents most of the confusion that follows.

If you are planning an event, request a consultation and we will work through the plan with you.`,
  },
  {
    slug: "habits-that-make-an-estate-gate-harder-to-pass",
    kind: "insight",
    category: "Residential",
    title: "Five habits that make an estate gate harder to pass",
    publishedAt: "2026-09-21",
    readingMinutes: 3,
    excerpt:
      "An estate gate is only as strong as the routine behind it. Five habits that residents and officers can keep every day.",
    body: `An estate gate is only as strong as the routine behind it. Walls and barriers help, but most intrusions come through the front gate, on foot or by car, with a story that sounds right. These five habits make that harder.

## Log every visitor

Name, the house they are visiting, the time in and the time out. A log that is kept every time is a deterrent in itself, and a record when something goes wrong.

## Call ahead

Residents should tell the gate when they expect a visitor. When a visitor is not expected, the officer calls the resident before the visitor goes in.

## Check vehicles both ways

Look into vehicles leaving as well as entering. Goods leave estates in boots far more often than they arrive.

## Hold deliveries at the gate

Couriers and food deliveries can be collected at the gate rather than delivered to the door. Fewer strangers walk the estate's streets.

## Hand over properly

At every change of shift, the outgoing officer should brief the incoming one on who is inside, what is expected and anything unusual. Most gaps open at handover.

These habits cost nothing. They need residents and officers to keep them every day. If your estate would like a review of its gate routine, request a consultation.`,
  },
];
