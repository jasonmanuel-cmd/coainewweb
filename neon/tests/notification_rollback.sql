\set ON_ERROR_STOP on
do $$ begin
  if to_regclass('coai_hq.notification_journal') is not null or to_regclass('coai_hq.notification_attempts') is not null then raise exception 'journal tables survived rollback'; end if;
  if not exists(select 1 from coai_hq.leads where submission_key='rollback-survivor' and notes='Preserve owner note') then raise exception 'rollback damaged CRM'; end if;
  if exists(select 1 from coai_hq.schema_migrations where version='002_notification_journal') then raise exception 'migration marker survived'; end if;
end $$;
select 'notification rollback assertions passed' as result;
