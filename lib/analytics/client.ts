type EventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;

  const normalized = { event: eventName, ...payload };
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, payload);
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(normalized);
  }
}

