"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/site";

const VAPI_ASSISTANT_ID = "0c4d7983-e21b-4385-b269-552d98d457f4";
const VAPI_SCRIPT_ID = "vapi-script-tag";
// Third-party widget. Pin to a release tag (gh/VapiAI/html-script-tag@<tag>) once one is chosen.
const VAPI_SCRIPT_SRC = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
// Public, client-side key — inlined at build time.
const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY ?? "";

/** Module-level so React strict-mode double mounts cannot start two widgets. */
let widgetStarted = false;

type VapiWindow = Window & {
  openCipherChat?: () => void;
  vapiSDK?: { run: (config: Record<string, unknown>) => unknown };
};

/**
 * "Chat with Cipher".
 *
 * When the Vapi widget loads it renders its own floating button, and `window.openCipherChat`
 * clicks it. When it cannot load (no key configured, script blocked, offline) a fallback
 * launcher opens a contact dialog instead, so the entry point never disappears or dead-ends.
 */
export function CipherChat() {
  const [widgetLive, setWidgetLive] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const widgetLiveRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openChat = useCallback(() => {
    const button = widgetLiveRef.current ? document.querySelector<HTMLElement>(".vapi-btn") : null;
    if (button) button.click();
    else setDialogOpen(true);
  }, []);

  useEffect(() => {
    const w = window as VapiWindow;
    w.openCipherChat = openChat;

    if (!VAPI_PUBLIC_KEY) return;

    const start = () => {
      const run = (window as VapiWindow).vapiSDK?.run;
      if (!run) return;
      if (widgetStarted) {
        widgetLiveRef.current = true;
        setWidgetLive(true);
        return;
      }
      widgetStarted = true;
      run({
        apiKey: VAPI_PUBLIC_KEY,
        assistant: VAPI_ASSISTANT_ID,
        config: {
          position: "bottom-right",
          mode: "voice-and-chat",
          theme: { primary: "#7dff9d", secondary: "#04110a" },
          idle: { color: "#7dff9d", type: "pill", title: "Chat with Cipher", subtitle: "Ask the AI assistant" }
        }
      });
      widgetLiveRef.current = true;
      setWidgetLive(true);
    };

    const existing = document.getElementById(VAPI_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if ((window as VapiWindow).vapiSDK) start();
      else existing.addEventListener("load", start, { once: true });
      return;
    }

    // Defer the third-party bundle until the browser is idle. Fetching and running it
    // on mount competed with hydration for main-thread time and was a measurable part
    // of total blocking time; the launcher button is already interactive without it.
    const idle: (cb: () => void) => void =
      typeof (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback === "function"
        ? (cb) => (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(cb)
        : (cb) => window.setTimeout(cb, 2000);

    let cancelled = false;
    idle(() => {
      if (cancelled) return;
      const script = document.createElement("script");
      script.id = VAPI_SCRIPT_ID;
      script.src = VAPI_SCRIPT_SRC;
      script.defer = true;
      script.addEventListener("load", start, { once: true });
      // On error the fallback launcher stays in place; nothing else to do.
      document.head.appendChild(script);
    });

    return () => {
      cancelled = true;
      if ((window as VapiWindow).openCipherChat === openChat) delete (window as VapiWindow).openCipherChat;
    };
  }, [openChat]);

  useEffect(() => {
    if (!dialogOpen) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dialogOpen]);

  return (
    <>
      {!widgetLive && (
        <button type="button" className="cipher-fab" onClick={() => setDialogOpen(true)}>
          <span className="cipher-fab-dot" aria-hidden="true" />
          Chat with Cipher
        </button>
      )}

      {dialogOpen && (
        <div className="cipher-modal-backdrop" onClick={() => setDialogOpen(false)}>
          <div
            className="cipher-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cipher-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cipher-modal-header">
              <h2 id="cipher-modal-title">Chat with Cipher</h2>
              <button ref={closeRef} type="button" className="cipher-close" aria-label="Close" onClick={() => setDialogOpen(false)}>
                ×
              </button>
            </div>
            <div className="cipher-modal-body">
              <p>The AI assistant is not available right now. Reach Jason directly:</p>
              <p>
                <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
                <br />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </p>
              <p>
                Or <Link href="/intake" onClick={() => setDialogOpen(false)}>request your leak score</Link> and we will follow up.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
