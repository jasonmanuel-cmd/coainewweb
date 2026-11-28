/** Approved public offers. Existing customer agreements are unaffected. */
export const RESTRUCTURE_OFFERS = [
  {
    id: "diagnostic",
    name: "Digital Diagnostic & Repair",
    price: "$500",
    ongoing: "One-time engagement",
    payment: "$200 upfront; $300 upon completion of agreed work",
    description: "Identify digital leaks and complete the priority repairs defined in the written scope, with a final report.",
    deliverables: ["Website functionality and conversion audit", "Business listing consistency review", "SEO and AI discoverability analysis", "Lead capture and customer journey testing", "Defined priority repairs and final report"]
  },
  {
    id: "revenue-engine",
    name: "COAI Revenue Engine",
    price: "$1,997",
    ongoing: "+ $297/month",
    payment: "Implementation and monthly service terms confirmed in a written scope",
    description: "Build a repeatable path from discoverability and first inquiry through recovery, follow-up, and ongoing management.",
    deliverables: ["Conversion-focused website or website upgrade", "Lead capture and centralized CRM", "Missed-call recovery and automated customer follow-up", "Local search and structured-data foundation", "Hosting, monitoring, and defined maintenance responsibilities"]
  },
  {
    id: "infrastructure",
    name: "Intelligent Business Infrastructure",
    price: "$4,997+",
    ongoing: "+ $597–$997/month",
    payment: "Final scope and recurring fee confirmed in a written proposal",
    description: "Extend the core revenue system for established businesses with more complex customer workflows and defined monthly optimization.",
    deliverables: ["Core revenue infrastructure", "AI receptionist and appointment routing", "Custom business workflow integration", "Advanced reporting and customer attribution", "Defined monthly optimization services"]
  }
] as const;
