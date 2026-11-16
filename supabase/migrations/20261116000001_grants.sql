-- Table privileges for the API roles, and public read policies that work for visitors.
--
-- Newer Supabase projects no longer grant the API roles access to new tables automatically,
-- so each role gets only what it needs. Row Level Security (see the init migration) still
-- decides which rows each role can see or change.

-- Server-side only (forms, CV cleanup). Bypasses RLS; key never leaves the server.
grant select, insert, update, delete
  on public.profiles, public.enquiries, public.applications, public.articles, public.vacancies
  to service_role;

-- Visitors: read published content only (RLS limits this to published rows).
grant select on public.articles, public.vacancies to anon;

-- Signed-in staff (RLS limits this to staff, and deletes to admins).
grant select, insert, update, delete on public.articles, public.vacancies, public.profiles to authenticated;
grant select, update, delete on public.enquiries, public.applications to authenticated;

-- Visitors cannot call is_staff(), so the public read policies are split: visitors see published
-- rows only; signed-in users see published rows, and staff also see drafts.
drop policy if exists "Anyone reads published articles" on public.articles;
drop policy if exists "Visitors read published articles" on public.articles;
drop policy if exists "Signed-in read published articles; staff read all" on public.articles;
create policy "Visitors read published articles" on public.articles
  for select to anon using (status = 'published');
create policy "Signed-in read published articles; staff read all" on public.articles
  for select to authenticated using (status = 'published' or (select public.is_staff()));

drop policy if exists "Anyone reads published vacancies" on public.vacancies;
drop policy if exists "Visitors read published vacancies" on public.vacancies;
drop policy if exists "Signed-in read published vacancies; staff read all" on public.vacancies;
create policy "Visitors read published vacancies" on public.vacancies
  for select to anon using (published);
create policy "Signed-in read published vacancies; staff read all" on public.vacancies
  for select to authenticated using (published or (select public.is_staff()));
