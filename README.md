# Safety Signatures Limited website

The website of Safety Signatures Limited, a private guard company in Oworonshoki, Lagos.

- **Stack:** Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS 4, Supabase (Postgres, Auth, Storage), Motion for animation. Hosted on Vercel.
- **Public site:** home, services (hub + 7 service pages), industries, training and standards, about, leadership, why Safety Signatures, news and recognition, security insights, careers, contact, privacy, terms.
- **Forms:** consultation requests and job applications (with CV upload) are validated on the server and saved to Supabase. There is no fake success message: without a database the forms report that they could not send.
- **Admin (`/admin`):** staff sign in to manage enquiries, applications (private CV downloads), press coverage, Security Insights articles and vacancies.

Related documents:

| File | What it covers |
|---|---|
| [CONTENT-STATUS.md](CONTENT-STATUS.md) | What content is published, what is held back, and every question for the client |
| [ASSET-INVENTORY.md](ASSET-INVENTORY.md) | Every photograph supplied, what it shows, and where it is used |
| [PROJECT-CHECKLIST.md](PROJECT-CHECKLIST.md) | Build progress, tests run, and what is left |

## Run it locally

Requires Node 22 or later.

```bash
npm install
cp .env.example .env.local   # fill in the values, or leave Supabase blank to browse the site only
npm run dev                  # http://localhost:3000
```

Without Supabase variables the public site runs on the content in `src/content/`, the forms say they cannot send, and `/admin` explains that the database is not connected.

Useful scripts:

| Command | Does |
|---|---|
| `npm run build` | Production build (also type-checks) |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm run test:forms -- http://localhost:3000` | Browser smoke test of both forms (needs Chrome) |
| `npm run db:seed-sql` | Regenerates `supabase/seed.sql` from `src/content/articles.ts` |
| `npm run retention:files` | Lists CV files with no application row; add `-- --delete` to remove them |

## Set up Supabase

1. Create a Supabase project. A region close to Nigeria (for example `eu-west`) keeps latency down.
2. In **SQL Editor**, run `supabase/migrations/20261116000000_init.sql`, then `supabase/seed.sql`.
   (Or with the Supabase CLI: `supabase link` then `supabase db push`, then run the seed.)
   This creates the tables, Row Level Security policies, the private `applications` storage bucket and the retention function.
3. **Authentication → Providers → Email:** keep email sign-in on. Turn **off** "Allow new users to sign up": staff accounts are created by an administrator only.
4. Create the first staff user in **Authentication → Users → Add user** (email and password), then give them the admin role in the SQL editor:

   ```sql
   insert into public.profiles (id, full_name, role)
   select id, 'Full Name', 'admin' from auth.users where email = 'person@safetysignaturesltd.com';
   ```

   Use `'editor'` for staff who should manage content, enquiries and applications but not delete anything.
5. **Data retention:** enable the `pg_cron` extension and schedule the purge described in the privacy notice:

   ```sql
   select cron.schedule('purge-expired-records', '0 3 * * *', $$select public.purge_expired_records()$$);
   ```

   Run `npm run retention:files -- --delete` monthly (or from a scheduled job) to remove CV files whose application has been purged.
6. Copy the project URL, the publishable key and the secret key into `.env.local` and into Vercel.

## Deploy to Vercel

1. Push the repository to GitHub and import it in Vercel (framework preset: Next.js; no build settings to change).
2. Add the environment variables from `.env.example` for **Production** and **Preview**.
3. Deploy, then point the domain (`safetysignaturesltd.com.ng`) at Vercel and set `NEXT_PUBLIC_SITE_URL` to match.
4. After the first deploy: submit a test consultation request and a test application, check both appear in `/admin`, open the CV, then delete the test records.

## Where things live

```
src/
  app/(site)/        public pages (shared header, footer, page transition)
  app/admin/         sign-in and the protected admin panel
  app/admin/cv/[id]  signed, expiring CV download for staff
  components/        layout, motion, sections, forms, admin UI
  content/           company facts, services, tiers, curriculum, articles seed, images
  lib/forms/         validation schemas, spam guard, public form actions
  lib/admin/         staff auth checks and admin actions
  lib/data/          cached reads of articles and vacancies
  lib/supabase/      browser-safe, session and service-role clients
  proxy.ts           refreshes admin sessions and redirects signed-out visitors
supabase/            migration and seed
scripts/             seed generator, CV retention, form smoke test
```

### Editing content

- **News, press coverage, Security Insights, vacancies:** use `/admin`. Changes appear on the site straight away.
- **Company facts, services, tiers, curriculum, industries:** edit `src/content/*.ts` and redeploy. Contact details are in `src/content/company.ts`; only items with `confirmed: true` are shown.

### Security notes

- The service-role key is only imported by `src/lib/supabase/admin.ts` (marked `server-only`).
- Public forms check a honeypot field, a minimum fill time and a per-IP rate limit (a salted hash, never the raw IP), then validate every field with zod.
- CVs are checked by size (5 MB), declared type and file signature before upload, stored in a private bucket, and opened by staff through signed URLs that expire after 60 seconds.
- Row Level Security enforces staff access in the database; admin pages and actions check the staff role on the server as well.
- `/admin` is excluded in `robots.txt` and sent with `X-Robots-Tag: noindex`.
