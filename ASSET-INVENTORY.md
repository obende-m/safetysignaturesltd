# Asset inventory

All files supplied in `SSimages` were inspected on 16 November 2026. Files used on the site are copied into `public/images/` under descriptive names, re-saved at most 2000 px wide (the logo is untouched). Next.js serves them as AVIF/WebP at the sizes each layout needs.

**Important: the ten `Gemini_Generated_Image_*` files.** These are AI-processed (enhanced or upscaled) versions of real company photographs. Several match the original 2018 photos exactly, and the rest show real events. They are used because they are much sharper than the originals. **Please confirm they are faithful to the original photographs** (faces, uniforms, insignia). If any were altered beyond sharpening, send the originals and we will swap them.

## Logo and brand

| Supplied file | Site file | Notes |
|---|---|---|
| `01-LOGOS-AND-BRAND/safety_logo.png` (198×88) | `brand/safety-signatures-logo.png` | Used unaltered, never wider than its native size. Also letterboxed on white for the browser icon. **Vector logo needed.** |

Brand colours sampled from the logo: red **#DA251D**, navy **#183884**. The site palette is built from these two plus warm neutrals (`src/app/globals.css`).

## Company photographs (Safety Signatures people and premises)

| Supplied file | Site file | What it shows | Used on |
|---|---|---|---|
| `Gemini…r99jps…` (enhanced crop of `guards-formation-slide01.png`) | `operations/guards-formation.jpg` | Uniformed officers walking in formation, a woman in a navy suit at the centre | Home hero, careers hero, share image |
| `Gemini…abqhqc…` (enhanced `guards-group-handshake.jpg`) | `operations/guards-handshake.jpg` | Officers gathered while two shake hands | Home, training, Company menu panel |
| `Gemini…2ong86…` (enhanced `vehicle-search-gate.png`) | `operations/vehicle-search.jpg` | Officers checking a car boot at a gate | Home (approach), about, industries, services index |
| `Gemini…mwp7fv…` (enhanced `guards-building-slide03.png`) | `operations/guards-line-up.jpg` | Officers standing at attention outside a building | Manned guarding, about, services hub, Services menu panel |
| `03-…/guards-parade-slide02.png` | `operations/guards-parade.jpg` | Officers on a parade ground | Home (careers band), training |
| `Gemini…ajo235…` | `visits/nscdc-visit-team.jpg` | Two NSCDC officers with staff in red "SECURITY" shirts, in an office | News, why page |
| `Gemini…zf6s1o…` | `visits/nscdc-visit-officers.jpg` | Two NSCDC officers with a member of staff in an office with award plaques | Home (credibility) |
| `Gemini…tep0lj…` | `visits/nscdc-visit-meeting.jpg` | An NSCDC officer in conversation in the same office | Not used yet |

**Please confirm:** that the three office photographs are from the NSCDC visit of 5 September 2023 (they are placed beside that story but not captioned as such), and who the woman in red is. No person in any photograph is named on the site.

## Events and recognition (supplied, third-party events)

| Supplied file | Site file | What it shows | Used on |
|---|---|---|---|
| `Gemini…sumie0…` | `events/security-conference.jpg` | Speakers from the police, army and private security at a "National … Security" event | Leadership (speaking), news. **Confirm this is the NAOSNP 2023 conference.** |
| `Gemini…nsk8xb…` (duplicate: `…3veeb1…`) | `recognition/certificate-of-recognition.jpg` | A certificate of recognition naming Dr. Cynthia Gregg being presented at an awards event | News (CEO recognition). **Confirm which award.** |
| `02-LEADERSHIP/ceo-portrait-2021.jpg` | `leadership/cynthia-gregg-portrait.jpg` | Dr. Gregg in academic dress (2021 ceremony) | Home, about, leadership |
| `02-LEADERSHIP/ceo-honorary-doctorate-presentation-2021.jpg` | `leadership/honorary-doctorate-ceremony.jpg` | Ceremony stage, 2021 | Not used yet |
| `02-LEADERSHIP/ceo-ceremony-2021.jpg` | — | Photo of the honorary degree certificate | Not used (personal document) |
| `02-LEADERSHIP/ceo-with-awardees-2021.jpg` | — | Dr. Gregg with other graduands | Not used (low resolution) |

## Stand-in photographs (do not show the company)

Used only where no real photograph exists, and never presented as company work:

| Site file | Source and licence | Used for |
|---|---|---|
| `services/k9-shepherd.jpg` | Wikimedia Commons, Yama Zsuzsanna Márkus, CC0 | K9 service |
| `services/cctv-cameras.jpg` | Wikimedia Commons, Fourhazzy, CC0 | Equipment and technology service |
| `services/walk-through-detectors.jpg` | Wikimedia Commons, PQ77wd, CC BY-SA 4.0 (credited on /terms) | Event security service |
| `services/chauffeur-door.jpg` | `04-SERVICES/STOCK-chauffeur-2.jpg`, published on the old site, **licence unknown** | Secure mobility. Small (400×250); replace with a real photograph. |
| `services/access-card.jpg` | `04-SERVICES/THIRDPARTY-id.jpg`, **licence unknown** | Not used |

## Supplied but not used

| File | Reason |
|---|---|
| `03-…/guards-group-crop.jpg`, `guards-group-handshake.jpg`, `guards-formation-slide01.png`, `guards-building-slide03.png`, `vehicle-search-gate.png` | Lower-quality originals of the enhanced versions used |
| `04-SERVICES/dog-with-group-uncertain.jpg` | The dog appears composited onto a real photo; it would misrepresent a K9 deployment |
| `04-SERVICES/STOCK-*` (about, bodyguard, consultation, special-event, staff-recruitment, security-key, equipment, car-check, dog) | Text graphics, clip art or low-resolution banners; the equipment collage shows a composited "Safety Signatures" vest |
| `04-SERVICES/THIRDPARTY-school.jpg` | Shows a US security officer; would suggest a company officer |
| `04-SERVICES/THIRDPARTY-digital-work.jpg` | Not relevant |

## Photographs to commission

1. Vector logo (AI, SVG or PDF).
2. Current guard force in uniform: on post at a gate, at a reception, on patrol (landscape, at least 2400 px wide).
3. A real K9 team, a secure driver with vehicle, protection officers, an event deployment, equipment in use (CCTV install, detectors).
4. Training sessions and the training facility.
5. The head office exterior and reception.
6. Original NSCDC visit photographs (5 September 2023).
7. A professional headshot of Dr. Gregg in business dress, plus the senior team if they are to appear.
