export type SystemCapability = {
  name: string;
  purpose: string;
};

export type SystemChapter = {
  code: string;
  title: string;
  outcome: string;
  capabilities: readonly SystemCapability[];
};

/**
 * Public capability map distilled from COAI's August 2026 systems briefing.
 *
 * This is not a package inclusion list. The canonical offer and its inclusions
 * live in `lib/site.ts`; individual capabilities are only delivered when they
 * appear in a signed statement of work.
 */
export const SYSTEM_CHAPTERS: readonly SystemChapter[] = [
  {
    code: "01 / CATCH",
    title: "Catch the inquiry",
    outcome: "Give every raised hand a visible next step before it disappears.",
    capabilities: [
      {
        name: "Missed-call SMS back",
        purpose: "Send an approved acknowledgement after an unanswered call, open a reply path, and alert the right person."
      },
      {
        name: "Enhanced quote intake",
        purpose: "Collect the service, project details, photos, timing, location, and preferred contact method—not just a name."
      },
      {
        name: "Online booking",
        purpose: "Let a ready customer claim an available consultation or service window without waiting for a callback."
      },
      {
        name: "Appointment recovery",
        purpose: "Follow up on cancellations, no-shows, and abandoned booking attempts before the slot is lost."
      }
    ]
  },
  {
    code: "02 / ANSWER",
    title: "Answer and qualify",
    outcome: "Give customers a fast, consistent response while keeping judgment calls with a person.",
    capabilities: [
      {
        name: "Website assistant",
        purpose: "Answer approved common questions, capture contact details, and route the conversation to the business."
      },
      {
        name: "Voice receptionist",
        purpose: "Handle scoped call flows, collect the reason for the call, and escalate anything that needs human judgment."
      },
      {
        name: "Lead qualification",
        purpose: "Capture need, service area, timing, urgency, and job details so the owner can prioritize with context."
      },
      {
        name: "Knowledge agent",
        purpose: "Give the team answers grounded in its own services, policies, procedures, and approved operating notes."
      }
    ]
  },
  {
    code: "03 / CONVERT",
    title: "Make the site sell",
    outcome: "Turn the public website into proof, clarity, and a direct path to action.",
    capabilities: [
      {
        name: "Advanced service pages",
        purpose: "Give each major service a page that explains the work, answers real questions, and presents one clear next step."
      },
      {
        name: "Project gallery",
        purpose: "Organize real work by service so prospects can quickly find a project that resembles theirs."
      },
      {
        name: "Service-area architecture",
        purpose: "Show where the business works and give each priority market accurate, useful local information."
      },
      {
        name: "Bilingual experience",
        purpose: "Offer properly structured English and Spanish journeys when the business is ready to serve both."
      }
    ]
  },
  {
    code: "04 / DISCOVER",
    title: "Be findable and understood",
    outcome: "Make the business facts consistent for people, search engines, and answer systems.",
    capabilities: [
      {
        name: "Business listing and schema",
        purpose: "Align public business facts and add structured data for services, location, hours, and contact paths."
      },
      {
        name: "Local search foundation",
        purpose: "Build the service, location, metadata, internal-link, analytics, and citation structure local discovery needs."
      },
      {
        name: "Answer-engine readiness",
        purpose: "Use question-led content, first-party proof, and machine-readable facts without promising a citation or ranking."
      },
      {
        name: "First-hand publishing",
        purpose: "Create a practical publishing system based on real work and real expertise instead of generic filler."
      }
    ]
  },
  {
    code: "05 / KEEP",
    title: "Keep the relationship",
    outcome: "Turn completed work into trust, repeat service, and visible customer history.",
    capabilities: [
      {
        name: "Customer review system",
        purpose: "Request feedback after a completed job and route concerns to the business so a person can respond."
      },
      {
        name: "Service reminders",
        purpose: "Notify customers when maintenance, inspection, seasonal work, or a warranty check is due."
      },
      {
        name: "Customer reactivation",
        purpose: "Invite past customers back with a timely, service-specific message rather than a generic blast."
      },
      {
        name: "Referral tracking",
        purpose: "Give word-of-mouth a traceable path from a happy customer to a new inquiry and a recorded thank-you."
      }
    ]
  },
  {
    code: "06 / MEASURE",
    title: "Run and measure the pipeline",
    outcome: "Put every inquiry, handoff, and recovery action in one operating view.",
    capabilities: [
      {
        name: "CRM and lead pipeline",
        purpose: "Centralize leads, quotes, appointments, owners, and next actions instead of relying on memory and scattered texts."
      },
      {
        name: "Workflow automation",
        purpose: "Connect forms, email, calendars, texting, payments, and notifications so facts are not entered twice."
      },
      {
        name: "Revenue dashboard",
        purpose: "Track calls, leads, quotes, bookings, follow-up, reviews, and repeat work from one evidence layer."
      },
      {
        name: "Revenue leak audit",
        purpose: "Find where prospects disappear across acquisition, response, conversion, fulfillment, and retention."
      }
    ]
  }
] as const;

export const SYSTEM_CHAPTER_COUNT = SYSTEM_CHAPTERS.length;
export const SYSTEM_CAPABILITY_COUNT = SYSTEM_CHAPTERS.reduce(
  (total, chapter) => total + chapter.capabilities.length,
  0
);
