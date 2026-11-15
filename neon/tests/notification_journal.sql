-- Synthetic fixtures only; run on a disposable local database after 001 and 002.
\set ON_ERROR_STOP on
begin;
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent)
values('unit-key','Synthetic','Local Fixture','unit@example.com','intake','build','no');
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent)
values('unit-key','Synthetic','Local Fixture','unit@example.com','intake','build','no') on conflict(submission_key) do nothing;
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent)
values('legacy-unit','Synthetic','Legacy Fixture','unit@example.com','waitlist','waitlist','no');
do $$ begin
  if (select count(*) from coai_hq.leads)<>2 then raise exception 'dedupe failed'; end if;
  if (select count(*) from coai_hq.notification_journal)<>1 then raise exception 'atomic intent/dedupe/source filter failed'; end if;
  if exists(select 1 from coai_hq.notification_attempts) then raise exception 'invented attempt'; end if;
end $$;
savepoint interrupted;
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent)
values('rolled-back','Synthetic','Rollback Fixture','unit@example.com','contact','contact','no');
rollback to interrupted;
do $$ begin
  if (select count(*) from coai_hq.notification_journal)<>1 then raise exception 'intent not transactional'; end if;
end $$;
with journal as (
  insert into coai_hq.notification_journal(lead_id)
    select id from coai_hq.leads where submission_key='unit-key' and source in ('intake','contact')
    on conflict(lead_id) do update set lead_id=excluded.lead_id returning lead_id
) insert into coai_hq.notification_attempts(id,lead_id)
  select '00000000-0000-4000-8000-000000000001'::uuid,lead_id from journal;
update coai_hq.notification_attempts set outcome='accepted',finished_at=clock_timestamp()
where id='00000000-0000-4000-8000-000000000001' and outcome='pending';
with journal as (
  insert into coai_hq.notification_journal(lead_id)
    select id from coai_hq.leads where submission_key='unit-key' and source in ('intake','contact')
    on conflict(lead_id) do update set lead_id=excluded.lead_id returning lead_id
) insert into coai_hq.notification_attempts(id,lead_id)
  select '00000000-0000-4000-8000-000000000002'::uuid,lead_id from journal;
update coai_hq.notification_attempts set outcome='unconfirmed',finished_at=clock_timestamp()
where id='00000000-0000-4000-8000-000000000002' and outcome='pending';
-- A late failure must never overwrite previously recorded acceptance for an attempt.
update coai_hq.notification_attempts set outcome='unconfirmed'
where id='00000000-0000-4000-8000-000000000001' and outcome='pending';
do $$ declare state text; begin
  select case when count(*) filter(where outcome='accepted')>0 then 'accepted'
    when count(*) filter(where outcome='unconfirmed')>0 then 'unconfirmed' else 'pending' end
    into state from coai_hq.notification_attempts;
  if state<>'accepted' then raise exception 'accepted attempt downgraded'; end if;
  if (select count(*) from coai_hq.notification_attempts)<>2 then raise exception 'retry attempt tracking failed'; end if;
end $$;
create role coai_unit_anon;
do $$ begin
  if has_schema_privilege('coai_unit_anon','coai_hq','USAGE') or
     has_table_privilege('coai_unit_anon','coai_hq.notification_journal','SELECT') or
     has_table_privilege('coai_unit_anon','coai_hq.notification_attempts','INSERT') or
     has_function_privilege('coai_unit_anon','coai_hq.record_notification_intent()','EXECUTE') then raise exception 'public access leaked'; end if;
  if exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='coai_hq' and c.relname in ('notification_journal','notification_attempts') and not c.relrowsecurity) then raise exception 'RLS missing'; end if;
end $$;
-- Full-inbox ordering and filters: 55 recent undated inquiries must not bury an old due inquiry.
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent)
select 'bulk-'||n,'Synthetic','Local Fixture','unit@example.com','waitlist','waitlist','no' from generate_series(1,55) n;
update coai_hq.leads set follow_up_on='2020-01-01',notes='Owner note' where submission_key='unit-key';
do $$ declare found_key text; begin
  select submission_key into found_key from coai_hq.leads
    where stage not in ('won','lost','archived') and follow_up_on<='2026-11-01'
    order by follow_up_on,created_at desc,id desc limit 50;
  if found_key<>'unit-key' then raise exception 'due queue failed'; end if;
end $$;
-- Cascading deletion leaves no detached delivery metadata.
delete from coai_hq.leads where submission_key='unit-key';
do $$ begin
  if exists(select 1 from coai_hq.notification_journal) or exists(select 1 from coai_hq.notification_attempts) then raise exception 'cascade failed'; end if;
end $$;
rollback;
-- Retain one synthetic row to prove migration rollback preserves the CRM.
insert into coai_hq.leads(submission_key,first_name,business_name,email,source,intent,sms_consent,notes)
values('rollback-survivor','Synthetic','Local Fixture','unit@example.com','contact','contact','no','Preserve owner note');
select 'notification SQL assertions passed' as result;
