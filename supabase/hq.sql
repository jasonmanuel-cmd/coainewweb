-- HQ CRM setup. Apply to the existing COAI project after billing/restoration.
-- Separate from legacy leads; never grants anonymous/authenticated table access.
begin;
create table if not exists public.coai_crm_leads (
  id uuid primary key default gen_random_uuid(),
  submission_key text not null unique,
  first_name text not null, business_name text not null,
  email text not null, phone text not null default '', business_website text not null default '',
  source text not null check (source in ('intake','contact','audit','waitlist')),
  intent text not null check (intent in ('build','scorecard','contact','audit','waitlist')),
  industry text not null default '',
  sms_consent text not null default 'no' check (sms_consent in ('yes','no')),
  consent_version text not null default 'request-only-v1',
  stage text not null default 'new' check (stage in ('new','contacted','qualified','proposal','won','lost','archived')),
  notes text not null default '' check (length(notes) <= 10000),
  follow_up_on date,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  search_text text generated always as (lower(first_name || ' ' || business_name || ' ' || email || ' ' || phone)) stored
);
alter table public.coai_crm_leads enable row level security;
revoke all on public.coai_crm_leads from public, anon, authenticated;
grant select, insert, update on public.coai_crm_leads to service_role;
create index if not exists coai_crm_leads_created_idx on public.coai_crm_leads(created_at desc, id desc);
create index if not exists coai_crm_leads_follow_up_idx on public.coai_crm_leads(follow_up_on) where follow_up_on is not null;
create or replace function public.coai_crm_touch_updated_at() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = clock_timestamp(); return new; end;
$$;
revoke all on function public.coai_crm_touch_updated_at() from public, anon, authenticated;
grant execute on function public.coai_crm_touch_updated_at() to service_role;
drop trigger if exists coai_crm_updated_at on public.coai_crm_leads;
create trigger coai_crm_updated_at before update on public.coai_crm_leads
for each row execute function public.coai_crm_touch_updated_at();
create table if not exists public.coai_crm_daily (
  day date not null, page text not null check (page in ('/','/demo','/pricing','/intake','/contact')),
  views bigint not null default 0, primary key(day,page)
);
alter table public.coai_crm_daily enable row level security;
revoke all on public.coai_crm_daily from public, anon, authenticated;
grant select, insert, update on public.coai_crm_daily to service_role;
create or replace function public.coai_crm_count_view(requested_page text) returns void
language sql security invoker set search_path = '' as $$
  insert into public.coai_crm_daily(day,page,views) values ((now() at time zone 'UTC')::date, requested_page, 1)
  on conflict(day,page) do update set views = public.coai_crm_daily.views + 1;
$$;
revoke all on function public.coai_crm_count_view(text) from public, anon, authenticated;
grant execute on function public.coai_crm_count_view(text) to service_role;
commit;
