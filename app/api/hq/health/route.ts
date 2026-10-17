import { requireHqOwner } from "@/lib/crm/auth";
import { redisCommand, usesRedisCrm } from "@/lib/crm/redis-store";
import { privateJson, crmError } from "@/lib/crm/response";
import { PublicError } from "@/lib/public-error";
import { randomUUID } from "node:crypto";
import { isSameSiteRequest } from "@/lib/security/request-guards";
export async function GET() {
  try {
    await requireHqOwner();
    if (!usesRedisCrm()) throw new PublicError("Redis storage is not selected.",503);
    const pong=await redisCommand<string>("PING");
    return privateJson({ok:pong==="PONG",storage:"redis",capture_enabled:process.env.COAI_CRM_ENABLED==="true"});
  } catch(error) {return crmError(error);}
}
export async function POST(request:Request) {
  try {
    if(!isSameSiteRequest(request)) throw new PublicError("Forbidden",403);
    await requireHqOwner();
    const key=`coai:hq:v1:health:${randomUUID()}`; const value=randomUUID();
    try {
      await redisCommand("SET",key,value,"EX",30);
      const read=await redisCommand<string>("GET",key);
      return privateJson({ok:read===value,storage_write_verified:read===value});
    } finally {await redisCommand("DEL",key);}
  } catch(error) {return crmError(error);}
}
