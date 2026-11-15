begin;
create schema if not exists coai_hq;
revoke all on schema coai_hq from public;
create table if not exists coai_hq.leads (
  id uuid primary key default gen_random_uuid(), submission_key text not null unique,
  first_name text not null, business_name text not null, email text not null,
  phone text not null default '', business_website text not null default '',
  source text not null check(source in ('intake','contact','audit','waitlist')),
  intent text not null check(intent in ('build','scorecard','contact','audit','waitlist')),
  industry text not null default '', sms_consent text not null check(sms_consent in ('yes','no')),
  consent_version text not null default 'request-only-v1',
  stage text not null default 'new' check(stage in ('new','contacted','qualified','proposal','won','lost','archived')),
  notes text not null default '' check(length(notes)<=10000), follow_up_on date,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  search_text text generated always as(lower(first_name||' '||business_name||' '||email||' '||phone)) stored
);
alter table coai_hq.leads enable row level security;
revoke all on coai_hq.leads from public;
create index if not exists hq_leads_created on coai_hq.leads(created_at desc,id desc);
create index if not exists hq_leads_stage on coai_hq.leads(stage);
create table if not exists coai_hq.daily (
  day date not null, page text not null check(page in ('/','/demo','/pricing','/intake','/contact')),
  views bigint not null default 0, primary key(day,page)
);
alter table coai_hq.daily enable row level security;
revoke all on coai_hq.daily from public;
create table if not exists coai_hq.health_probe (id uuid primary key, value text not null);
alter table coai_hq.health_probe enable row level security;
revoke all on coai_hq.health_probe from public;
create table if not exists coai_hq.schema_migrations(version text primary key, applied_at timestamptz not null default now());
revoke all on coai_hq.schema_migrations from public;
insert into coai_hq.schema_migrations(version) values('001_hq') on conflict do nothing;
commit;
