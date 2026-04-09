alter table leads enable row level security;
alter table audits enable row level security;
alter table audit_results enable row level security;
alter table messages enable row level security;
alter table case_studies enable row level security;
alter table services enable row level security;
alter table site_settings enable row level security;

-- Public read for marketing content only
drop policy if exists "public read case studies" on case_studies;
create policy "public read case studies"
on case_studies for select
to anon, authenticated
using (true);

drop policy if exists "public read services" on services;
create policy "public read services"
on services for select
to anon, authenticated
using (true);

drop policy if exists "public read site settings" on site_settings;
create policy "public read site settings"
on site_settings for select
to anon, authenticated
using (true);

-- Lock sensitive ledgers to service role only
drop policy if exists "service role full leads" on leads;
create policy "service role full leads"
on leads for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full audits" on audits;
create policy "service role full audits"
on audits for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full audit_results" on audit_results;
create policy "service role full audit_results"
on audit_results for all
to service_role
using (true)
with check (true);

drop policy if exists "service role full messages" on messages;
create policy "service role full messages"
on messages for all
to service_role
using (true)
with check (true);
