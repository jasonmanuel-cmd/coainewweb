export const LAUNCH_OFFERS = [
 { id: "diagnostic", pkg: "", stage: "01 / Diagnose", name: "Digital Diagnostic & Repair", price: "$500", billing: "$200 diagnostic · $300 agreed repairs", description: "Find the gaps between being discovered and receiving a qualified inquiry.", includes: ["Website-to-quote and mobile journey test","Local visibility and listing consistency review","Competitor comparison and prioritized findings","Agreed priority repairs and documented retest"], cta: "Start my diagnostic" },
 { id: "revenue-engine", pkg: "2", stage: "02 / Implement", name: "COAI Revenue Engine", price: "$1,997", billing: "+ $297/month management", description: "Connect your website, lead capture and follow-up so inquiries have a clear path to your team.", includes: ["Scoped website modernization and search foundations","Centralized lead capture and CRM integration","Missed-call recovery and approved follow-up workflows","Monitoring, reporting and defined monthly maintenance"], cta: "Discuss my revenue engine" },
 { id: "infrastructure", pkg: "3", stage: "03 / Optimize", name: "Intelligent Business Infrastructure", price: "$4,997+", billing: "+ $597–$997/month management", description: "Connect more complex business systems around your team's operational needs.", includes: ["Revenue Engine capabilities","AI receptionist and appointment routing where appropriate","Scoped business workflows and integrations","Operational reporting and defined optimization"], cta: "Request a consultation" }
] as const;

export const LAUNCH_FAQS = [
 ["Can I start with just the diagnostic?", "Yes. The diagnostic is $200. If you choose the agreed repair scope, the remaining $300 is due on completion. Additional work is quoted separately."],
 ["Do I have to replace my website?", "No. We assess your existing site and tools first. We reuse working infrastructure wherever practical."],
 ["What is included in monthly management?", "The written scope defines monitoring, reporting, support hours and usage limits. Third-party charges and additional work are disclosed before you commit."],
 ["Will this guarantee more sales?", "No. We test and document the systems we implement. Results depend on demand, customer behavior, your offer and your team's follow-up."],
 ["Who owns the systems and data?", "Your business data and account access remain yours. The agreement specifies ownership of deliverables, third-party licenses, reusable COAI technology and the handoff process."],
 ["How do calls and texts work?", "We agree on the communication workflow, consent and opt-out requirements before activation. Carrier approval and third-party availability may affect timing."]
] as const;
