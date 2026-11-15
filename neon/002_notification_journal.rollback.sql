-- PREPARED ONLY. Export journal/attempts securely before dropping their history.
-- Disable COAI_NOTIFICATION_JOURNAL_ENABLED and roll back application code first.
begin;
drop trigger if exists coai_notification_intent on coai_hq.leads;
drop function if exists coai_hq.record_notification_intent();
drop table if exists coai_hq.notification_attempts;
drop table if exists coai_hq.notification_journal;
delete from coai_hq.schema_migrations where version='002_notification_journal';
commit;
