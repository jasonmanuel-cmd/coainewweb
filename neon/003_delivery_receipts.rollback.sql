-- PREPARED ONLY. Roll back only an unused installation. Never discard live deduplication history.
begin;
do $$ begin
  if exists(select 1 from coai_hq.delivery_receipts) then
    raise exception 'Receipt history exists; retain table and use reviewed recovery plan';
  end if;
end $$;
drop table coai_hq.delivery_receipts;
delete from coai_hq.schema_migrations where version='003_delivery_receipts';
commit;
