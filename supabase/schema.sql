create table if not exists leads (
  id text primary key,
  name text,
  email text not null,
  phone text not null,
  company_name text,
  url text not null,
  source text default 'website',
  status text default 'new',
  created_at timestamptz default now()
);

create table if not exists audits (
  id text primary key,
  lead_id text references leads(id) on delete cascade,
  url text not null,
  performance_score int not null,
  schema_score int not null,
  issue_count int not null,
  summary text,
  created_at timestamptz default now()
);

create table if not exists audit_results (
  id text primary key,
  audit_id text references audits(id) on delete cascade,
  raw_json jsonb not null,
  recommendations jsonb not null,
  created_at timestamptz default now()
);

create table if not exists messages (
  id text primary key,
  lead_id text references leads(id) on delete set null,
  channel text not null,
  provider text not null,
  status text not null,
  payload jsonb not null,
  sent_at timestamptz default now()
);

create table if not exists case_studies (
  id text primary key,
  title text not null,
  slug text unique not null,
  summary text not null,
  proof_points jsonb not null,
  created_at timestamptz default now()
);

create table if not exists services (
  id text primary key,
  title text not null,
  slug text unique not null,
  description text not null,
  features jsonb not null,
  order_index int default 0
);

create table if not exists site_settings (
  id text primary key,
  site_name text not null,
  tagline text,
  primary_cta text,
  secondary_cta text,
  brand_colors jsonb
);
