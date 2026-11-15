import {afterEach,expect,it,vi} from "vitest";
const query=vi.hoisted(()=>vi.fn(async (_strings:TemplateStringsArray,..._values:unknown[])=>[]));
vi.mock("@neondatabase/serverless",()=>({neon:()=>query}));
import {storeNeonLead,updateNeonLead,listNeonLeads} from "@/lib/crm/neon-store";
afterEach(()=>{vi.unstubAllEnvs();query.mockClear();});
it("binds submitted values as parameters and preserves consent without adding fixture rows",async()=>{
 vi.stubEnv("DATABASE_URL","postgres://unit-only");
 await storeNeonLead({first_name:"O'Name",business_name:"Unit",email:"unit@example.com",phone:"6615550100",business_website:"none",source:"intake",intent:"build",industry:"Trades",sms_consent:"no",consent_version:"request-only-v1",details:{}},"retry-key");
 expect(query.mock.calls[0][0].join("?")).not.toContain("O'Name");expect(query.mock.calls[0]).toContain("O'Name");expect(query.mock.calls[0]).toContain("no");
 expect(query.mock.calls[0][0].join("")).toContain("on conflict(submission_key) do nothing");
});
it("checks timestamp concurrency and never interpolates search into SQL text",async()=>{
 vi.stubEnv("DATABASE_URL","postgres://unit-only");
 expect(await updateNeonLead("id","2026-10-17T12:00:00Z",{stage:"qualified",notes:"note",follow_up_on:null})).toBe(false);
 expect(query.mock.calls[0]).toContain("2026-10-17T12:00:00Z");
 query.mockResolvedValueOnce([{total:0,leads:[]}] as never);
 const search="%'; drop table coai_hq.leads; --";await listNeonLeads(0,null,search);
 expect(query.mock.calls[1][0].join("")).not.toContain(search);expect(query.mock.calls[1]).toContain(search);
});
