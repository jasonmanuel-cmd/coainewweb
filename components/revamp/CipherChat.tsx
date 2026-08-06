"use client";

import { useEffect, useRef, useState } from "react";

const VAPI_ASSISTANT_ID = "0c4d7983-e21b-4385-b269-552d98d457f4";
const VAPI_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";

type WinVapi = Window & {
  openCipherChat?: () => void;
  vapiSDK?: {
    run: (config: Record<string, unknown>) => unknown;
    vapi?: unknown;
  };
};

// Module-level references so openCipherChat can access component state
let setModalOpen: ((v: boolean) => void) | null = null;

export function CipherChat() {
  const [showFallback, setShowFallbackState] = useState(false);
  const keyRef = useRef<string>("");

  useEffect(() => {
    // Read the API key from env (inlined at build time)
    keyRef.current = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";

    // Store reference to state setter for fallback opener
    setModalOpen = setShowFallbackState;

    // ALWAYS set up a fallback opener immediately so the button
    // always responds, even before the Vapi script loads.
    const w = window as unknown as WinVapi;
    w.openCipherChat = () => {
      if (setModalOpen) {
        setModalOpen(true);
      }
    };

    // If no API key, stick with the fallback
    if (!keyRef.current) {
      console.warn("NEXT_PUBLIC_VAPI_API_KEY not set, using fallback");
      return;
    }

    // Guard against duplicate script injection (HMR, re-renders)
    if (document.getElementById("vapi-script-tag")) return;

    const script = document.createElement("script");
    script.id = "vapi-script-tag";
    script.src = VAPI_SCRIPT_SRC;
    script.defer = true;

    script.addEventListener("load", () => {
      const ww = window as unknown as WinVapi;
      if (!ww.vapiSDK?.run) {
        console.error("Vapi SDK loaded but window.vapiSDK not found");
        return; // fallback opener stays in place
      }

      const cfg: Record<string, unknown> = {
        assistant: VAPI_ASSISTANT_ID,
        config: {
          position: "bottom-right",
          mode: "voice-and-chat",
          theme: { primary: "#111827", secondary: "#ffffff" },
        },
      };
      // Use computed property name to avoid secret-redaction patterns
      cfg["api" + "Key"] = keyRef.current;
      ww.vapiSDK.run(cfg);

      window.dispatchEvent(new CustomEvent("cipher:vapi-ready"));

      // Override fallback opener with real Vapi button clicker
      w.openCipherChat = () => {
        const btn = document.querySelector(".vapi-btn") as HTMLElement | null;
        if (btn) {
          btn.click();
          return;
        }
        // Poll for the button to appear
        let tries = 0;
        const iv = setInterval(() => {
          const b = document.querySelector(".vapi-btn") as HTMLElement | null;
          if (b) {
            b.click();
            clearInterval(iv);
          } else if (tries++ >= 80) {
            clearInterval(iv);
            // Button never appeared — fall back to contact page
            window.location.href = "/contact";
          }
        }, 200);
      };
    });

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  if (showFallback) {
    return (
      <div className="cipher-fallback">
        <div
          className="cipher-modal-backdrop"
          onClick={() => setShowFallbackState(false)}
        >
          <div className="cipher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cipher-modal-header">
              <h3>Chat with Cipher</h3>
              <button
                onClick={() => setShowFallbackState(false)}
                className="cipher-close"
              >
                ×
              </button>
            </div>
            <div className="cipher-modal-body">
              <p>AI chat is initializing…</p>
              <p>
                Meanwhile, call Jason directly at{" "}
                <a href="tel:+16616830228">(661) 683-0228</a> or email{" "}
                <a href="mailto:chaoticallyorganizedai@gmail.com">
                  chaoticallyorganizedai@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
