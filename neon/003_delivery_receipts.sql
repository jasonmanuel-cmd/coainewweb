-- PREPARED ONLY. Independent of 002; no trigger, dispatcher, or production flag changes.
begin;
create table coai_hq.delivery_receipts (
  id uuid primary key,
  lead_id uuid not null unique references coai_hq.leads(id) on delete restrict,
  fingerprint text not null check(fingerprint ~ '^[0-9a-f]{64}$'),
  state text not null default 'pending' check(state in ('pending','accepted','unknown','ready')),
  attempts integer not null default 1 check(attempts between 1 and 2),
  reconciliation_ref text check(length(reconciliation_ref) between 1 and 200),
  created_at timestamptz not null default clock_timestamp(),
  finished_at timestamptz,
  check(state<>'ready' or (attempts=1 and reconciliation_ref is not null)),
  check((state='pending' and finished_at is null) or state='ready' or (state in ('accepted','unknown') and finished_at is not null))
);
alter table coai_hq.delivery_receipts enable row level security;
revoke all on coai_hq.delivery_receipts from public;
insert into coai_hq.schema_migrations(version) values('003_delivery_receipts');
commit;
