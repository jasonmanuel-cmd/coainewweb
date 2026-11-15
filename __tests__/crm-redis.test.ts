import { afterEach, expect, it, vi } from "vitest";
vi.mock("@/lib/supabase/client", () => ({getSupabaseAdmin:()=>null}));
import { captureCrmLead } from "@/lib/crm/capture";
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals();});
it("stores a validated real-form payload atomically in Redis without passwords or CAPTCHA tokens",async()=>{
  vi.stubEnv("CRM_STORAGE","redis");vi.stubEnv("COAI_CRM_ENABLED","true");vi.stubEnv("UPSTASH_REDIS_REST_URL","https://unit-test.example");vi.stubEnv("UPSTASH_REDIS_REST_TOKEN","unit-test-token");
  const network=vi.fn(async()=>new Response(JSON.stringify({result:"saved"}),{status:200}));vi.stubGlobal("fetch",network);
  await captureCrmLead("intake",{first_name:"Unit Test",business_name:"Unit Business",email:"unit@example.com",phone:"6615550100",turnstileToken:"never-store-this",package_interest:"2"});
  const command=JSON.parse((network.mock.calls[0] as unknown as [string,RequestInit])[1].body as string);
  expect(command[0]).toBe("EVAL"); expect(command[3]).toBe("coai:hq:v1:leads");
  const row=JSON.parse(command[7]);expect(row.intent).toBe("build");expect(row.sms_consent).toBe("no");expect(row.stage).toBe("new");expect(JSON.stringify(command)).not.toContain("never-store-this");
});
