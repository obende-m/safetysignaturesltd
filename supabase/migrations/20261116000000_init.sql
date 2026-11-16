-- Safety Signatures website: initial schema.
-- Public forms write through the server with the service-role key after validation, so the
-- anonymous role has no insert rights at all. Staff access is controlled by public.profiles.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Staff profiles and role helpers
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'One row per staff user allowed into /admin. admin: everything; editor: content, enquiries and applications, no deletes.';

create or replace function public.staff_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select role from public.profiles where id = (select auth.uid());
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()));
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin');
$$;

revoke all on function public.staff_role() from public, anon;
revoke all on function public.is_staff() from public, anon;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.staff_role() to authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;

create policy "Staff read own profile; admins read all"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()) or (select public.is_admin()));

create policy "Admins manage profiles"
  on public.profiles for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Enquiries (consultation requests from /contact)
-- ---------------------------------------------------------------------------
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  organisation text check (char_length(organisation) <= 160),
  email text not null check (char_length(email) <= 200),
  phone text not null check (char_length(phone) <= 20),
  service text not null check (char_length(service) <= 80),
  location text not null check (char_length(location) <= 160),
  message text not null check (char_length(message) between 20 and 4000),
  source_page text,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  staff_notes text,
  ip_hash text,
  user_agent text
);

create index enquiries_created_at_idx on public.enquiries (created_at desc);
create index enquiries_ip_hash_idx on public.enquiries (ip_hash, created_at desc);
create trigger enquiries_touch before update on public.enquiries
  for each row execute function public.touch_updated_at();

alter table public.enquiries enable row level security;

create policy "Staff read enquiries" on public.enquiries
  for select to authenticated using ((select public.is_staff()));
create policy "Staff update enquiries" on public.enquiries
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy "Admins delete enquiries" on public.enquiries
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Vacancies
-- ---------------------------------------------------------------------------
create table public.vacancies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null check (char_length(title) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  location text not null,
  employment_type text not null default 'Full time',
  summary text not null,
  requirements text,
  closing_date date,
  published boolean not null default false
);

create trigger vacancies_touch before update on public.vacancies
  for each row execute function public.touch_updated_at();

alter table public.vacancies enable row level security;

create policy "Anyone reads published vacancies" on public.vacancies
  for select to anon, authenticated using (published or (select public.is_staff()));
create policy "Staff write vacancies" on public.vacancies
  for insert to authenticated with check ((select public.is_staff()));
create policy "Staff update vacancies" on public.vacancies
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy "Admins delete vacancies" on public.vacancies
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Job applications (private)
-- ---------------------------------------------------------------------------
create table public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  vacancy_id uuid references public.vacancies (id) on delete set null,
  position text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  state_of_residence text not null,
  qualification text not null,
  experience_years smallint not null check (experience_years between 0 and 50),
  previous_service boolean not null default false,
  cover_note text check (char_length(cover_note) <= 3000),
  cv_path text not null,
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  staff_notes text,
  ip_hash text,
  user_agent text
);

create index applications_created_at_idx on public.applications (created_at desc);
create index applications_ip_hash_idx on public.applications (ip_hash, created_at desc);
create trigger applications_touch before update on public.applications
  for each row execute function public.touch_updated_at();

alter table public.applications enable row level security;

create policy "Staff read applications" on public.applications
  for select to authenticated using ((select public.is_staff()));
create policy "Staff update applications" on public.applications
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy "Admins delete applications" on public.applications
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Articles: press coverage ("media") and Security Insights ("insight")
-- ---------------------------------------------------------------------------
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kind text not null check (kind in ('media', 'insight')),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 3 and 240),
  excerpt text not null check (char_length(excerpt) <= 600),
  body text,
  category text,
  publication text,
  source_url text check (source_url is null or source_url ~ '^https://'),
  published_at date not null default current_date,
  date_label text,
  reading_minutes smallint,
  status text not null default 'draft' check (status in ('draft', 'published')),
  constraint media_has_source check (kind <> 'media' or (publication is not null and source_url is not null)),
  constraint insight_has_body check (kind <> 'insight' or body is not null)
);

create index articles_kind_published_idx on public.articles (kind, status, published_at desc);
create trigger articles_touch before update on public.articles
  for each row execute function public.touch_updated_at();

alter table public.articles enable row level security;

create policy "Anyone reads published articles" on public.articles
  for select to anon, authenticated using (status = 'published' or (select public.is_staff()));
create policy "Staff write articles" on public.articles
  for insert to authenticated with check ((select public.is_staff()));
create policy "Staff update articles" on public.articles
  for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy "Admins delete articles" on public.articles
  for delete to authenticated using ((select public.is_admin()));

-- ---------------------------------------------------------------------------
-- Private storage for CVs. Nothing is public; staff download through short-lived signed URLs.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'applications',
  'applications',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do nothing;

create policy "Staff read CVs" on storage.objects
  for select to authenticated
  using (bucket_id = 'applications' and (select public.is_staff()));

-- ---------------------------------------------------------------------------
-- Retention: enquiries are kept 24 months and applications 12 months (see the privacy notice).
-- Schedule with pg_cron, e.g.:
--   select cron.schedule('purge-expired-records', '0 3 * * *', $$select public.purge_expired_records()$$);
-- CV files for purged applications are removed by the storage cleanup in the same function.
-- ---------------------------------------------------------------------------
create or replace function public.purge_expired_records()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  expired_paths text[];
begin
  delete from public.enquiries where created_at < now() - interval '24 months';

  select array_agg(cv_path) into expired_paths
  from public.applications where created_at < now() - interval '12 months';

  delete from public.applications where created_at < now() - interval '12 months';

  if expired_paths is not null then
    begin
      delete from storage.objects where bucket_id = 'applications' and name = any (expired_paths);
    exception when others then
      -- Newer Supabase projects block direct deletes from storage.objects. In that case the
      -- files are removed with `npm run retention:files` (scripts/purge-cv-files.mjs), which uses the Storage API.
      raise notice 'CV files not removed by SQL: %', sqlerrm;
    end;
  end if;
end;
$$;

revoke all on function public.purge_expired_records() from public, anon, authenticated;
