# Content status and questions for the client

Last updated: 16 November 2026.

Sources: the client's live website (https://safetysignaturesltd.com.ng/, read 16 November 2026, used as the authoritative source for contact details), the research dossier (`Safety-Signatures-Research-Dossier.md`) and the supplied photographs.

**Rule used throughout:** nothing unverified is presented as fact. Items the client still has to confirm are either left off the site or worded as the company's own description of its services.

## 1. Contact details (from the live website)

Published on the new site exactly as the live contact page gives them:

| Item | Value | Where it appears |
|---|---|---|
| Address | Security House, Salami Ogejo Street, Off Palace Way, Oko Cole, Oworonshoki, Lagos | Footer, contact page, structured data |
| Lagos | 0809 052 9833, 0706 754 9620 | Header (wide screens), mobile menu, footer, closing band, contact page |
| Abuja | 0806 892 1957 (the live site also lists 0809 052 9833 here) | Contact page |
| Ondo / Osun / Ogun | 0813 188 8806 / 0705 480 1247 / 0706 505 9884 | Contact page |
| Rivers / Edo / Delta | 0703 518 1561 / 0903 031 7607 / 0806 820 6696 | Contact page |
| Nationwide | 0814 436 3266 | Footer, contact page |
| Email | security@safetysignaturesltd.com, safetysignatures@yahoo.com | Footer, closing band, contact page, form error messages |
| Facebook | facebook.com/safetysignaturesltd | Footer, contact page |
| Instagram | instagram.com/safetysignaturesltd | Footer, contact page |
| X (Twitter) | twitter.com/safetysignature | Footer, contact page |
| LinkedIn | linkedin.com/in/safety-signatures-ltd-bbb784177 | Footer, contact page |

### Discrepancies to resolve

1. **Address.** The live site gives Salami Ogejo Street, Oworonshoki (used). The CAC registry mirror gives *30 Asunmogejo Close, off Palace Way, Oworonshoki*; LinkedIn gives *1 Olabisi Close, Mende, Maryland*; a directory gives *4 Adeojo St, Ikeja*. **Which is the current head office, and are there branch offices to list?**
2. **LinkedIn.** The live site links a *personal-type* profile. A *company page* also exists (linkedin.com/company/safety-signatures-limited, 38 followers). **Which should the site link to?** We recommend the company page.
3. **Abuja line.** The live site lists 0809 052 9833 under both Lagos and Abuja. Confirm this is intended.
4. **Email domain.** Emails use `safetysignaturesltd.com` while the website is `safetysignaturesltd.com.ng`. Confirm both domains are owned and which is the canonical website address (`NEXT_PUBLIC_SITE_URL`).
5. **Phone numbers last changed March 2020** on the live site. Please confirm every line still works.
6. **Leftover link.** The live site's "Follow Me!" link points to an unrelated studio's Instagram (moldavitedesign). It is not used.

### Not published (not on the live site)

- WhatsApp business number: add it in `src/content/company.ts` (`whatsapp`) and a "Message us on WhatsApp" link appears on the contact page.
- Office hours: add in `officeHours`.

## 2. Corporate facts held back

| Item | Status | Needed from the client |
|---|---|---|
| Founding year | Hidden. Media say 2005; the registry says 11 April 2014 (RC 1184462). No "since" line or years counter anywhere. | Which is right, and was there an earlier entity? |
| CAC number RC 1184462 | Hidden (`rcNumber.confirmed: false`). | Confirm on search.cac.gov.ng, then set to `true`. |
| NSCDC licence | Not shown; no badge. | Certificate, licence number, category and expiry, and permission to display it. |
| Staff, client and site numbers | None shown. The old site's "7,860 clients / 9,720 guards" counters were theme placeholders and have been dropped. | Real figures, if you want any shown. |
| Clients, case studies, testimonials | None shown. | Client names or logos with written permission; 3–5 case studies; testimonials. |
| Corporate history / milestones | Section omitted from About. | Confirmed dates and milestones. |
| ISO, ASIS and institute memberships | Not claimed. | Certificates, if any. |

## 3. Wording that needs the client's approval

| Page | Content | Why it needs approval |
|---|---|---|
| Services | All seven published service descriptions | Based on the 2018–2019 site. Confirm each service is still offered as described. |
| Recruitment and Management Services | **Built but hidden** (`published: false` in `src/content/services.ts`) | Brief: publish only once confirmed. |
| Security Equipment and Technology | Brand names (Titan, Garrett) removed; batons, cutlass and sling removed; "Weapons" removed from the name | Confirm the equipment list. |
| Executive Protection | "Bouncers" and "worldwide" removed | Confirm. |
| Guard tiers | Platinum / Diamond / Standard described by role and background; **ages and "ASIS certified" left out** | Confirm the tiers are current and what each requires today. |
| Training | 12 of the 26 module names are known (from the old site) and shown as such | Please supply the full list of 26 modules. |
| Training | "All tiers train to the same curriculum" | Confirm. |
| Guard welfare | Annual leave after a year, examination leave, staff loans, merit awards, sponsored institute membership | From the 2019 site. Confirm these are current. |
| Approach | "Vulnerability assessment before deployment"; Platinum officers as Guard Force Commander | From the old site. Confirm. |
| Contact page | Four-step process (read, contact, assess, propose) | Confirm this is how enquiries are handled. |
| Mission / vision | Lightly edited from the old About page | Approve the wording. |
| Security Insights | Three original articles written for launch (ember months checklist; event gates; estate gate habits) | General advice, written new, no third-party text. Approve before launch or unpublish in `/admin`. The old site's unattributed republished articles are not carried over. |
| Privacy notice and website terms | Drafts referencing the Nigeria Data Protection Act 2023, with 24-month (enquiries) and 12-month (applications) retention | **Legal review required before launch.** |

## 4. Leadership

| Item | Status |
|---|---|
| Name and title "Dr. Cynthia Gregg, Managing Director and CEO" | Used. Confirm the preferred name (also seen as Cynthia Akpeji-Gregg) and use of "Dr." |
| Honorary doctorate | Described as an honorary Doctor of Ministry (2021), stated to be separate from her security training. |
| Career (Voice of Nigeria, Nigerian Breweries, Amstel Malta) | Shown; from media profiles. Confirm. |
| Education (UNIBEN BA; UNILAG Advanced Diploma) | Shown; from media and her Facebook. Confirm. |
| Executive MBA, Lagos Business School, fellowships (ISN, NIIS, NIM, NIMN, IIPS, AES), ALPSPN role, LMDC mediator | **Not shown** (unverified). Send certificates to add them. |
| Awards: NAOSNP Expert of the Year, Citizen Leadership Excellence Award 2020, Most Distinguished Woman | **Not shown** (unverified). |
| Guardian "50 female CEOs" feature | Shown as a *media feature*, not an award. Confirm whether it was editorial or sponsored. |
| Other managers | None shown. Send names, roles and photographs to add a team section. |
| Portrait | The only portrait supplied is in academic dress (2021). A professional headshot in business dress is recommended. |

## 5. Recognition: how it is labelled

- **Regulatory visit:** NSCDC Private Guard Companies department inspection, 5 September 2023, described as a *reported commendation*, linked to Northern View, and explicitly "not a formal award".
- **Recognition of the CEO:** MIRWA 2024 and the honorary doctorate, stated to be personal, not company awards.
- **Speaking:** NAOSNP National Security Conference, September 2023.
- **Features and commentary:** The Guardian feature, Citizens Compass, Tochlight Africa.

Several items come from the Trek Africa / NAOSNP media network; they are presented as media recognition, never as "international awards".

## 6. Photographs to request

See [ASSET-INVENTORY.md](ASSET-INVENTORY.md). Most needed: a vector logo; current guard photography; K9, chauffeur, executive protection, events and equipment in real use; the training facility; the office; the original NSCDC visit photographs; a professional CEO headshot.
