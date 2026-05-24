/** Marketing FAQ page — visible copy + JSON-LD (keep in sync). */
export type FaqMarketingSection = {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
};

export const FAQ_MARKETING_SECTIONS: FaqMarketingSection[] = [
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        question: "What does it cost to work with COAI?",
        answer:
          "Website builds start at $1,200 for the Signal Foundation package and go up to $2,000+ for the Sentinel Automation layer. Exact pricing is scoped per project — we don't charge extra for complexity you don't need, and we don't pad quotes to hit a number.\n\nThe diagnostic call is free. The proposal is free. You only pay when a clear scope is agreed on and work begins. Use the pricing page for the full package breakdown."
      },
      {
        question: "Are there monthly fees or retainers?",
        answer:
          "No mandatory retainers. Every build is a one-time fixed-price engagement. You own the result. There's no ongoing fee to keep your site running. Optional ongoing support is available for clients who want COAI managing updates, monitoring, or expanding the system — but it's never a requirement. You can take full ownership and run it yourself."
      },
      {
        question: "Do you offer payment plans?",
        answer:
          "Yes. Milestone-based payment structures are available on larger builds. Typically 50% to start, 50% on delivery — or a three-milestone split for bigger projects. We work with operators, not against them."
      }
    ]
  },
  {
    id: "process",
    title: "Process",
    items: [
      {
        question: "How long does a build take?",
        answer:
          "Standard website builds complete in 2 to 4 weeks from signed scope to live deployment. Simpler builds (Signal Foundation) can be faster. More complex e-commerce or automation stacks take the full 4 weeks. We don't rush — we scope it right so we don't have to redo it. Every milestone has a staging link so you can see it taking shape in real time."
      },
      {
        question: "What do I need to provide to get started?",
        answer:
          "At minimum: your business name, services, target market, and any existing branding (logo, colors if you have them). We handle the rest — copy direction, layout, schema structure, and technical architecture. If you have photos, testimonials, or existing content, bring it. If you don't, we work with what exists and build from there. We don't stall projects waiting for perfect assets."
      },
      {
        question: "How involved do I need to be during the build?",
        answer:
          "Minimal. You review at each milestone checkpoint — that's typically 2 to 3 review sessions over the build period. Each session is focused: specific questions, specific feedback, no open-ended brainstorming that wastes your time. You run your business. We build the system. That's the arrangement."
      }
    ]
  },
  {
    id: "ownership",
    title: "Ownership",
    items: [
      {
        question: "Who owns the website after it's built?",
        answer:
          "You own everything. The code, the domain, the hosting account, the customer data — all of it transfers to you at handoff. COAI retains no ongoing control or access unless you explicitly grant it for support purposes. This is what \"sovereign infrastructure\" means. We build houses, not rental agreements. You never have to worry about COAI going out of business or changing its pricing and losing your site as a result."
      },
      {
        question: "What's the difference between a COAI build and Wix or Squarespace?",
        answer:
          "Wix and Squarespace are rented land. You pay monthly to live on their platform. If they raise prices, change features, or shut down, you lose everything you built. Your customer data lives on their servers. Your site disappears if you stop paying. A COAI build is custom code on hosting you control. It loads faster, ranks better, has cleaner schema, and can be handed to any developer in the world to maintain. It's an asset — not a subscription."
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Automation",
    items: [
      {
        question: "What is the AI receptionist and do I need it?",
        answer:
          "Cipher is COAI's AI receptionist — a voice and text system that answers missed calls, qualifies leads, and routes bookings 24/7 without you lifting a finger. It's deployed on COAI's own line at (661) 659-1376 — call it and hear exactly what your customers would experience. You don't need it to get a great website. But if you're missing calls after hours, dealing with unqualified leads, or losing jobs to faster-responding competitors — this is the fix."
      },
      {
        question: "What is AEO and why does it matter?",
        answer:
          "AEO stands for Answer Engine Optimization — the practice of structuring your site so AI tools like ChatGPT, Google's AI overview, Perplexity, and voice assistants can read and cite your business accurately. When someone asks Siri \"who does AC repair in Bakersfield\" or asks ChatGPT \"best plumber near me,\" AEO determines whether your business shows up in that answer. SEO gets you on Google. AEO gets you into AI search surfaces — which are now where high-intent buyers start their research."
      }
    ]
  },
  {
    id: "local",
    title: "Local & 661",
    items: [
      {
        question: "Do you only work with Bakersfield businesses?",
        answer:
          "No — COAI works with businesses anywhere in the US. The portfolio includes clients in Miami (Signature 954) and national e-commerce brands. But the 661 / Bakersfield market is the primary focus because it's underserved and Jason knows it from the inside. If you're outside Bakersfield, the same systems apply. The diagnostic process is the same. The build quality is the same."
      },
      {
        question: "Do you offer Spanish-language builds?",
        answer:
          "Yes. Bilingual (EN/ES) builds are available and strongly recommended for Kern County businesses. Over 50% of Bakersfield's population is Spanish-speaking — a monolingual English site is actively ignoring a significant portion of your market. COAI builds dual-language systems with proper hreflang markup for search engines."
      }
    ]
  },
  {
    id: "technical",
    title: "Technical",
    items: [
      {
        question: "What platform or tech stack do you build on?",
        answer:
          "Depends on the project. Next.js for complex e-commerce and application builds. Sovereign HTML/CSS/JS for fast, lightweight service business sites with maximum performance scores. Deployed to Vercel or Netlify for reliability. The goal is always the fastest, most schema-clean result for your specific use case — not a one-size-fits-all template."
      },
      {
        question: "Can I update the site myself after handoff?",
        answer:
          "Yes. COAI builds with handoff documentation and trains you (or your team) on how to make standard content updates — prices, hours, photos, service descriptions. For larger structural changes, ongoing support is available at a flat hourly rate. You will never be held hostage to COAI for routine updates. That's a feature, not a limitation."
      }
    ]
  }
];

export function faqMarketingFlat(): { question: string; answer: string }[] {
  return FAQ_MARKETING_SECTIONS.flatMap((s) => s.items);
}
