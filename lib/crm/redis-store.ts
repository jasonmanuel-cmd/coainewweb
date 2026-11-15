import { PublicError } from "@/lib/public-error";
import type { CrmLead } from "./types";
const PREFIX = "coai:hq:v1:";
export const usesRedisCrm = () => process.env.CRM_STORAGE === "redis";
export async function redisCommand<T>(...command: unknown[]): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL; const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new PublicError("HQ storage is not configured.", 503);
  const response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(command), cache: "no-store", signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new PublicError("HQ storage is unavailable.", 503);
  const body = await response.json(); if (body.error) throw new PublicError("HQ storage is unavailable.", 503);
  return body.result as T;
}
export async function storeRedisLead(lead: CrmLead, submissionKey: string) {
  const script = `local existing=redis.call('HGET',KEYS[2],ARGV[1]); if existing then return existing end; redis.call('HSET',KEYS[1],ARGV[2],ARGV[3]); redis.call('HSET',KEYS[2],ARGV[1],ARGV[2]); return ARGV[2]`;
  return redisCommand<string>("EVAL", script, 2, `${PREFIX}leads`, `${PREFIX}dedupe`, submissionKey, lead.id, JSON.stringify(lead));
}
export async function listRedisLeads() {
  const rows = await redisCommand<string[]>("HGETALL", `${PREFIX}leads`);
  const leads: CrmLead[] = [];
  for (let i=1; i<rows.length; i+=2) leads.push(JSON.parse(rows[i]));
  return leads.sort((a,b) => b.created_at.localeCompare(a.created_at) || b.id.localeCompare(a.id));
}
export async function updateRedisLead(id: string, expected: string, fields: { stage: string; notes: string; follow_up_on: string | null }) {
  const script = `local raw=redis.call('HGET',KEYS[1],ARGV[1]); if not raw then return 0 end; local row=cjson.decode(raw); if row.updated_at~=ARGV[2] then return 0 end; local changes=cjson.decode(ARGV[3]); row.stage=changes.stage; row.notes=changes.notes; row.follow_up_on=changes.follow_up_on; row.updated_at=ARGV[4]; redis.call('HSET',KEYS[1],ARGV[1],cjson.encode(row)); return 1`;
  return redisCommand<number>("EVAL", script, 1, `${PREFIX}leads`, id, expected, JSON.stringify(fields), new Date().toISOString());
}
export async function recordRedisView(page: string) {
  const key = `${PREFIX}views:${new Date().toISOString().slice(0,10)}`;
  await redisCommand("HINCRBY", key, page, 1); await redisCommand("EXPIRE", key, 90*86400);
}
export async function redisActivity() {
  const commands = Array.from({ length: 30 }, (_, i) => ["HGETALL", `${PREFIX}views:${new Date(Date.now()-i*86400000).toISOString().slice(0,10)}`]);
  const output: Array<{day:string;page:string;views:number}> = [];
  // Bounded daily queries; no visitor identities or lead contents in these counters.
  await Promise.all(commands.map(async (command,i) => { const rows = await redisCommand<string[]>(...command); for(let j=0;j<rows.length;j+=2) output.push({day:new Date(Date.now()-i*86400000).toISOString().slice(0,10),page:rows[j],views:Number(rows[j+1])}); }));
  return output;
}
