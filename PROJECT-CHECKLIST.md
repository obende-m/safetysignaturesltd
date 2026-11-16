# Project checklist

Status as of 16 November 2026.

## Stage 1: Research and setup

- [x] Research dossier read; contact details checked against the live site (https://safetysignaturesltd.com.ng/contact/)
- [x] Logo inspected; brand colours sampled (red #DA251D, navy #183884)
- [x] All 37 supplied photographs inspected and inventoried ([ASSET-INVENTORY.md](ASSET-INVENTORY.md))
- [x] Missing information listed ([CONTENT-STATUS.md](CONTENT-STATUS.md))
- [x] Next.js 16 + TypeScript + Tailwind 4 + Supabase + Motion project created

## Stage 2: Creative direction

- [x] Colour system from the logo with warm neutrals; light pages, navy and ink bands for emphasis
- [x] Type: Fraunces (headings), Geist (body), Geist Mono (labels)
- [x] One content edge (`.wrap`), 12-column grid, one button pair, one radius scale
- [x] Image treatment: real photographs in rounded frames, cropped by focal point, never upscaled past their resolution
- [x] Motion: hero entrance, clip-reveals on photographs, heading rises, one scroll-linked statement on the homepage, page transitions, hover and press feedback, menu transitions; all respect reduced-motion

## Stage 3: Homepage

- [x] Hero, introduction, "Signatures of Safety" statement, services index with photo preview, guard tiers, NSCDC visit, approach, leadership, press, careers, enquiry close, footer
- [x] No invented figures or counters

## Stage 4: Pages

- [x] Services hub and 7 service pages (Recruitment and Management built but hidden until confirmed)
- [x] About, Leadership, Why Safety Signatures, Training and Standards, Industries
- [x] News and recognition (categorised: regulatory, speaking, CEO recognition, features and commentary)
- [x] Security Insights index and article pages (3 original launch articles)
- [x] Careers with vacancies and application form
- [x] Contact with consultation form, address, state phone lines, emails and social profiles
- [x] Privacy notice and website terms (drafts for legal review), branded 404

## Stage 5: Functionality

- [x] Consultation form: server-side validation, honeypot, time trap, per-IP rate limit, saved to Supabase
- [x] Application form: validation, CV upload (5 MB, PDF/DOC/DOCX checked by file signature) to a private bucket
- [x] Admin: Supabase Auth sign-in, admin and editor roles, enquiries, applications (signed CV links), articles, vacancies
- [x] Database migration with Row Level Security, storage policy and retention function
- [x] Content cached with tags; admin edits refresh the public pages immediately

## Stage 6: Testing (what was actually run)

- [x] `tsc --noEmit`: no errors
- [x] `eslint`: no errors or warnings
- [x] `next build`: succeeds, 39 routes generated
- [x] Every public route returns 200; unknown and unpublished service pages return 404; `/admin` redirects to sign-in
- [x] Security headers present (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy)
- [x] Form smoke test in headless Chrome (`npm run test:forms`), dev and production builds: **5/5 pass**
- [x] Copy lint on 12 pages: 0 FAIL (WARNs kept: eyebrow labels and step numbers are part of the design)
- [x] Screenshots reviewed at 1440 px (all pages) and 390 px (home, contact)
- [x] Performance (production homepage): layout shift 0.000, LCP about 0.9 s on CPU, 740 KB total transfer
- [x] Against the live Supabase project (production build, local server), 16 November 2026:
  - form test **6/6**: an enquiry and an application with a real PDF CV are saved; rows and the stored file checked directly in the database;
  - admin test **10/10**: wrong password refused, sign-in, enquiries and applications listed, CV opens through a 60-second signed link (and is refused without a session), an article saves, test records deleted from the admin (rows and CV files confirmed gone), sign-out closes the admin.
  - Bugs found and fixed: missing table grants (new migration `20261116000001_grants.sql`), public read policies that visitors could not evaluate, an empty article list being cached after a database error, and admin session checks running during prerender.
- [ ] Tablet widths (768, 1024) and other pages at 390 px reviewed by screenshot
- [ ] Manual check in Safari (iOS) and Firefox

## Stage 7: Deployment preparation

- [x] `.env.example` and setup steps ([README.md](README.md))
- [x] Create the Supabase project, run the migrations and seed, create the first admin
- [ ] Turn off "Allow new users to sign up" (Authentication → Sign In / Providers)
- [ ] Rotate the secret key and database password (they were shared in a chat), then update `.env.local` and Vercel
- [ ] Add environment variables in Vercel and deploy
- [ ] Point the domain at Vercel; set `NEXT_PUBLIC_SITE_URL`
- [ ] Post-deploy check: test enquiry, test application, CV download, delete test records

**The site is not deployed.**
