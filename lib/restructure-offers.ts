/** Approved public offers. Existing customer agreements are unaffected. */
export const RESTRUCTURE_OFFERS = [
  {
    id: "diagnostic",
    name: "COAI Digital Diagnostic & Repair",
    price: "$500",
    ongoing: "One-time engagement",
    payment: "$200 diagnostic-only option; $200 upfront and $300 after agreed repairs for the full $500 offer",
    timing: "Target 7–14 days, subject to scope and access",
    cta: "Start Your Diagnostic",
    href: "/start?intent=diagnostic",
    description: "Identify digital leaks and complete the priority repairs defined in the written scope, with a final report.",
    deliverables: ["Website, technical, mobile, and conversion audit", "Google Business Profile and listing consistency review", "SEO, GEO, and AEO discoverability analysis", "Lead capture and customer journey testing", "Prioritized findings, agreed priority repairs, and final verification report"]
  },
  {
    id: "revenue-engine",
    name: "COAI Revenue Engine",
    price: "$1,997",
    ongoing: "+ $297/month",
    payment: "Proposed 50% upfront and 50% on agreed completion and acceptance; monthly management is separate",
    timing: "Target 5–10 business days, subject to scope and access",
    cta: "Build My Revenue Engine",
    href: "/start?intent=revenue-engine",
    description: "Build a repeatable path from discoverability and first inquiry through recovery, follow-up, and ongoing management.",
    deliverables: ["Conversion-focused website or modernization", "Centralized lead capture, CRM integration, and inquiry routing", "Missed-call recovery and automated customer follow-up", "Local SEO, GEO/AEO, and structured-data foundations", "Hosting, monitoring, reporting, and defined maintenance"]
  },
  {
    id: "infrastructure",
    name: "COAI Intelligent Business Infrastructure",
    price: "$4,997+",
    ongoing: "+ $597–$997/month",
    payment: "Final scope and recurring fee confirmed in a written proposal",
    timing: "Target 10–20 business days, subject to complexity and access",
    cta: "Request an Infrastructure Consultation",
    href: "/start?intent=infrastructure",
    description: "Extend the core revenue system for established businesses with more complex customer workflows and defined monthly optimization.",
    deliverables: ["Revenue Engine capabilities", "AI receptionist and appointment routing", "Custom workflows, automation, and software integration", "Advanced reporting, attribution, and operational dashboards", "Defined monthly optimization"]
  }
] as const;
