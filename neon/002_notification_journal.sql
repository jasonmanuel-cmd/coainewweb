-- PREPARED ONLY. Review and test against an isolated database before applying.
begin;
create table coai_hq.notification_journal (
  lead_id uuid primary key references coai_hq.leads(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table coai_hq.notification_attempts (
  id uuid primary key,
  lead_id uuid not null references coai_hq.notification_journal(lead_id) on delete cascade,
  outcome text not null default 'pending' check(outcome in ('pending','accepted','unconfirmed')),
  started_at timestamptz not null default now(), finished_at timestamptz
);
create index notification_attempts_lead on coai_hq.notification_attempts(lead_id);
alter table coai_hq.notification_journal enable row level security;
alter table coai_hq.notification_attempts enable row level security;
revoke all on coai_hq.notification_journal,coai_hq.notification_attempts from public;
-- Same transaction as the lead insert: a crash before delivery leaves visible pending work.
-- SECURITY INVOKER; uses the existing private server database owner connection.
create function coai_hq.record_notification_intent() returns trigger
language plpgsql security invoker set search_path = pg_catalog as $$
begin
  if new.source in ('intake','contact') then
    insert into coai_hq.notification_journal(lead_id) values(new.id) on conflict do nothing;
  end if;
  return new;
end;
$$;
revoke all on function coai_hq.record_notification_intent() from public;
create trigger coai_notification_intent after insert on coai_hq.leads
for each row execute function coai_hq.record_notification_intent();
insert into coai_hq.schema_migrations(version) values('002_notification_journal');
commit;
