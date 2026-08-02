import { BUSINESS_HOURS_LABEL, CONTACT, OFFERS, THIRD_PARTY_COSTS } from "./site";

/**
 * Marketing FAQ — visible copy AND FAQPage JSON-LD come from this one array.
 *
 * Because this text is emitted as structured data, AI search engines quote it
 * verbatim. Rules:
 * - Every price references OFFERS. Never write a price literal here.
 * - No statistic without a named source.
 * - No availability claim that contradicts BUSINESS_HOURS_LABEL.
 * - No phone number other than CONTACT.phoneDisplay presented as company NAP.
 */
export type FaqMarketingSection = {
  id: string;
  title: string;
  items: { question: string; answer: string }[];
};

const HOSTING = THIRD_PARTY_COSTS[0];
const MESSAGING = THIRD_PARTY_COSTS[1];

export const FAQ_MARKETING_SECTIONS: FaqMarketingSection[] = [
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        question: "What does it cost to work with COAI?",
        answer: `We sell three things. The ${OFFERS.scorecard.name} is free for qualified owner-operators; otherwise it is a $350 Structural Audit, credited to the build if you go ahead. The ${OFFERS.tradecall.name} is ${OFFERS.tradecall.price} flat — ${OFFERS.tradecall.terms}. A bilingual English/Spanish build adds ${OFFERS.tradecall.bilingual}. ${OFFERS.continuity.name} is an optional ${OFFERS.continuity.price} per month, ${OFFERS.continuity.terms}.\n\nThe diagnostic call and the proposal are free. You only pay once a written scope is agreed and work begins. The pricing page is the single source of truth for every number.`
      },
      {
        question: "Are there monthly fees or retainers?",
        answer: `No mandatory retainer. The build is a one-time fixed-price engagement and you own the result.\n\nTwo costs do continue after launch, and you pay them directly to the vendor rather than to COAI: ${HOSTING.item.toLowerCase()} at ${HOSTING.cost} (${HOSTING.paidTo}), and ${MESSAGING.item.toLowerCase()} at ${MESSAGING.cost} (${MESSAGING.paidTo}). ${OFFERS.continuity.name} at ${OFFERS.continuity.price} per month is optional and never required.`
      },
      {
        question: "What is not included in the build price?",
        answer:
          "Ad spend, custom third-party integrations, ongoing content beyond the agreed scope, carrier and SMS usage fees, hosting, advanced CRM migration, and around-the-clock human dispatch are not included. Actual third-party costs are listed in writing before you sign, not discovered afterward."
      },
      {
        question: "Do you offer payment plans?",
        answer: `The standard split is built in: ${OFFERS.tradecall.terms}. Milestone-based structures are available on larger builds — typically 50% to start and 50% on delivery, or a three-milestone split. We work with operators, not against them.`
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
          "Two to three weeks from signed scope to live deployment. Larger e-commerce or automation work is scoped separately with its own timeline agreed before work starts. Every milestone has a staging link so you can see it taking shape in real time."
      },
      {
        question: "What do I need to provide to get started?",
        answer:
          "At minimum: your business name, services, service area, and any existing branding. We handle copy direction, layout, schema structure, and technical architecture. If you have photos, reviews, or existing content, bring it. If you do not, we build from what exists. We do not stall projects waiting for perfect assets."
      },
      {
        question: "How involved do I need to be during the build?",
        answer:
          "Minimal. You review at each milestone checkpoint — typically two to three focused sessions over the build period, with specific questions and specific feedback. You run your business. We build the system."
      }
    ]
  },
  {
    id: "ownership",
    title: "Ownership",
    items: [
      {
        question: "Who owns the website after it is built?",
        answer:
          "You do. You control the domain registrar, hosting account, source code repository, analytics, Search Console, Google Business Profile, and all lead data. We deploy into your accounts, document the setup, and hand over admin access at launch.\n\nCOAI retains no ongoing control or access unless you explicitly grant it for support. You never have to worry about COAI changing its pricing or going away and taking your site with it."
      },
      {
        question: "What is the difference between a COAI build and Wix or Squarespace?",
        answer:
          "A rented platform can be the right choice for a simple brochure site, and we will tell you so if it is. The question is what your revenue operation needs.\n\nCompare on the criteria that matter: who controls the account credentials, whether the system can be exported and the handoff documented, whether missed-call recovery is installed and tested, whether your business facts are kept consistent across the web and Google, and what happens when the vendor leaves. We put our answers to those questions in writing before you buy. Check any platform's answers against the same list."
      },
      {
        question: "Can I update the site myself after handoff?",
        answer:
          "Yes. You get handoff documentation and a walkthrough of standard content updates — prices, hours, photos, service descriptions. Larger structural changes are available at an hourly rate. You are never held hostage for routine updates."
      }
    ]
  },
  {
    id: "ai",
    title: "Calls and automation",
    items: [
      {
        question: "How does missed-call text-back work with my existing number?",
        answer:
          "Your published number stays yours. When a call goes unanswered, the system sends an automatic text back to the caller and creates a task for you.\n\nAn automated acknowledgement is not the same as a human response, and we do not describe it as one. The system is configured so that a lead nobody has touched escalates to a named person."
      },
      {
        question: "What is the AI receptionist and do I need it?",
        answer: `Cipher is an optional voice and text agent that answers calls, qualifies leads, and routes bookings. Callers are told they are speaking with an automated agent, calls may be recorded for quality review, and there is a named human escalation path and an emergency exclusion — the details are on our AI disclosure page.\n\nYou do not need it to get a working website. Our published business hours are ${BUSINESS_HOURS_LABEL.toLowerCase()}; any coverage outside those hours is scoped and disclosed explicitly rather than assumed.`
      },
      {
        question: "Is the number I see on your demo the same as your business number?",
        answer: `No. Our only company number is ${CONTACT.phoneDisplay}. Any other number that appears in our material is a product demo or test line and is labeled as such. One business, one published number — that is the same standard we hold your listings to.`
      },
      {
        question: "What is AEO and why does it matter?",
        answer:
          "AEO stands for Answer Engine Optimization: structuring your site so AI tools like ChatGPT, Google's AI Overviews, Perplexity, and voice assistants can read and cite your business facts accurately.\n\nIn practice it is unglamorous work — making your hours, services, service area, pricing, and FAQs consistent and machine-readable so both customers and search systems can understand the business. We do not claim it makes any engine cite you first, and nobody can promise that."
      }
    ]
  },
  {
    id: "local",
    title: "Local and 661",
    items: [
      {
        question: "Do you only work with Bakersfield businesses?",
        answer:
          "Bakersfield and Kern County are the primary focus because the market is underserved and Jason knows it from the inside. The portfolio does include work outside the area. If you are outside Bakersfield the same systems and the same diagnostic process apply."
      },
      {
        question: "Do you offer Spanish-language builds?",
        answer: `Yes. Bilingual English/Spanish builds are available for ${OFFERS.tradecall.bilingual} and are worth considering for most Kern County service businesses — a monolingual site simply cannot be read by part of your market. We build dual-language systems with proper hreflang markup and translation QA.`
      }
    ]
  },
  {
    id: "support",
    title: "Support and services",
    items: [
      {
        question: "What does ongoing support cost after launch?",
        answer: `${OFFERS.continuity.name} is ${OFFERS.continuity.price} per month, ${OFFERS.continuity.terms}. It covers the routing, form, and SMS test log, a response-time report, an uncontacted-lead review, a monthly scorecard, minor site and profile corrections, and one improvement priority each month.\n\nAs-needed work outside that is $75 per hour with a one-hour minimum. There is no mandatory maintenance fee — you can take full ownership at launch and never pay us again.`
      },
      {
        question: "Can you migrate my existing Wix, Squarespace, or WordPress site?",
        answer:
          "Yes. We migrate from Wix, Squarespace, GoDaddy, WordPress, and other major platforms, preserving your domain, URLs, and content. Migration is scoped and quoted per project — the price depends on page count and how much of the content can move cleanly, and you get that number before work starts."
      },
      {
        question: "Do you offer emergency repairs for sites that are down?",
        answer:
          "Yes. If your site is down, compromised, or losing leads to a technical fault, we offer priority repair. We diagnose the root cause, fix it, and recommend a permanent solution. Rates and expected turnaround are agreed in writing before work begins.\n\nThis is a business-hours service. It is not a 24-hour dispatch desk, and we will not describe it as one."
      },
      {
        question: "What happens if my site breaks after launch?",
        answer:
          "The build uses stable, minimal infrastructure with no plugin stack to break on update, so faults are uncommon. If something does go wrong, support is available at $75 per hour. Because you own the hosting and the code, you can also hire any developer you like to fix it."
      },
      {
        question: "Do you offer hosting?",
        answer: `We set up hosting in your own account on Vercel and hand you the credentials. It runs ${HOSTING.cost} depending on traffic, paid by you directly to the platform. We configure it; you own it; you can move it whenever you want.`
      },
      {
        question: "Do you offer domain registration or management?",
        answer:
          "We help you register the domain through a provider you control, then configure DNS, SSL, and email routing as part of the build. The registrar account is always in your name."
      },
      {
        question: "What is the turnaround time for content updates?",
        answer:
          "Standard content updates — pricing changes, new photos, text edits, service additions — are typically completed within two to three business days. Larger feature additions are scoped per project with a timeline agreed before work starts."
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
          "Next.js with TypeScript, deployed on Vercel. You receive full source access and written handoff documentation. No proprietary platforms and no locked-in systems."
      },
      {
        question: "Do you guarantee a particular performance score or ranking?",
        answer:
          "No. Performance scores depend on your content, images, and third-party tools, and search rankings are set by Google, not by us. What we do publish is a live Lighthouse scan you can run against any URL, including ours — measured on demand rather than asserted in copy. We will show you the before and after on your own site and let the numbers speak."
      }
    ]
  }
];

export function faqMarketingFlat(): { question: string; answer: string }[] {
  return FAQ_MARKETING_SECTIONS.flatMap((s) => s.items);
}
