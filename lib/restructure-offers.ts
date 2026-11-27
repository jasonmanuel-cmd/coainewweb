/** Approved public offers. Existing customer agreements are unaffected. */
export const RESTRUCTURE_OFFERS = [
  {
    id: "diagnostic",
    name: "Revenue Diagnostic",
    price: "$500",
    ongoing: "One-time engagement",
    payment: "$200 upfront; $300 at delivery",
    description: "Find where inquiries, follow-up, and customer handoffs break down. Receive a written priority plan before committing to a build.",
    deliverables: ["Current customer journey review", "Documented gaps and opportunities", "Prioritized action plan"]
  },
  {
    id: "revenue-engine",
    name: "Revenue Engine",
    price: "$1,997",
    ongoing: "+ $297/month",
    payment: "Implementation and monthly service terms confirmed in a written scope",
    description: "Build a focused path from first inquiry to owner follow-up, with clear tracking and handoff.",
    deliverables: ["Conversion-focused website or lead path", "Lead capture and follow-up workflow", "Owner handoff and simple reporting"]
  },
  {
    id: "infrastructure",
    name: "Revenue Infrastructure",
    price: "$4,997+",
    ongoing: "+ $597–$997/month",
    payment: "Final scope and recurring fee confirmed in a written proposal",
    description: "Connect the website, lead workflow, customer records, and operating reports for a more complex business.",
    deliverables: ["Multi-step customer workflow", "CRM and data integrations within agreed scope", "Documentation, training, and ongoing management"]
  }
] as const;
