-- ISOLATED DATABASE ONLY, after 001 and 003. All synthetic rows roll back.
\set ON_ERROR_STOP on
begin;
do $$
declare lead uuid := gen_random_uuid(); receipt uuid := gen_random_uuid(); n integer;
begin
  insert into coai_hq.leads(id,submission_key,first_name,business_name,email,source,intent,sms_consent)
    values(lead,'synthetic-delivery-test-'||lead,'Synthetic','Synthetic','test@example.invalid','waitlist','waitlist','no');
  insert into coai_hq.delivery_receipts(id,lead_id,fingerprint) values(receipt,lead,repeat('a',64));
  insert into coai_hq.delivery_receipts(id,lead_id,fingerprint) values(gen_random_uuid(),lead,repeat('a',64)) on conflict(lead_id) do nothing;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Duplicate claim granted'; end if;
  update coai_hq.delivery_receipts set state='accepted',finished_at=clock_timestamp() where id=receipt and state='pending';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'Finalization missing'; end if;
  update coai_hq.delivery_receipts set state='unknown',finished_at=clock_timestamp() where id=receipt and state='pending';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Accepted receipt overwritten'; end if;
  -- Synthetic fixture: exercise separately authorized manual recovery after proven nonacceptance.
  update coai_hq.delivery_receipts set state='unknown' where id=receipt;
  update coai_hq.delivery_receipts set state='ready',reconciliation_ref='synthetic-incident'
    where id=receipt and state='unknown' and attempts=1;
  update coai_hq.delivery_receipts set state='pending',attempts=attempts+1,finished_at=null
    where id=receipt and state='ready' and attempts=1 and reconciliation_ref is not null;
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'Armed retry claim missing'; end if;
  update coai_hq.delivery_receipts set state='accepted',finished_at=clock_timestamp()
    where id=receipt and state='pending' and attempts=1;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Stale first attempt finalized retry'; end if;
  update coai_hq.delivery_receipts set state='pending',attempts=attempts+1,finished_at=null
    where id=receipt and state='ready' and attempts=1 and reconciliation_ref is not null;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Retry claim duplicated'; end if;
  update coai_hq.delivery_receipts set state='unknown',finished_at=clock_timestamp() where id=receipt;
  update coai_hq.delivery_receipts set state='ready',reconciliation_ref='synthetic-incident-2'
    where id=receipt and state='unknown' and attempts=1;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'Third attempt armed'; end if;
  begin
    delete from coai_hq.leads where id=lead;
    raise exception 'Lead deletion unexpectedly allowed';
  exception when foreign_key_violation then null;
  end;
end $$;
rollback;
