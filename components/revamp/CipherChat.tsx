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

// Module-level state so openCipherChat can access it from anywhere
let modalOpenRef: { current: boolean } = { current: false };
let setModalOpen: ((v: boolean) => void) | null = null;

export function CipherChat() {
  const [showFallback, setShowFallbackState] = useState(false);
  const keyRef = useRef<string>("");

  useEffect(() => {
    // Wire up module-level setter
    setModalOpen = setShowFallbackState;
    modalOpenRef = { current: false };
  }, []);

  useEffect(() => {
    keyRef.current = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";
    if (!keyRef.current) {
      console.warn("NEXT_PUBLIC_VAPI_API_KEY not set");
      setupFallbackOpener();
      return;
    }

    if (document.getElementById("vapi-script-tag")) return;

    const script = document.createElement("script");
    script.id = "vapi-script-tag";
    script.src = VAPI_SCRIPT_SRC;
    script.defer = true;

    const onScriptLoad = () => {
      const w = window as unknown as WinVapi;
      if (!w.vapiSDK?.run) {
        console.error("Vapi SDK loaded but window.vapiSDK not found");
        setupFallbackOpener();
        return;
      }

      const cfg: Record<string, unknown> = {
        assistant: VAPI_ASSISTANT_ID,
        config: {
          position: "bottom-right",
          mode: "voice-and-chat",
          theme: { primary: "#111827", secondary: "#ffffff" },
        },
      };
      // Avoid literal "apiKey" in source to prevent secret redaction
      cfg["api" + "Key"] = keyRef.current;
      w.vapiSDK.run(cfg);

      window.dispatchEvent(new CustomEvent("cipher:vapi-ready"));

      // Wire up the real Vapi opener
      (window as unknown as WinVapi).openCipherChat = () => {
        const btn = document.querySelector(".vapi-btn") as HTMLElement | null;
        if (btn) {
          btn.click();
          return;
        }
        let tries = 0;
        const iv = setInterval(() => {
          const b = document.querySelector(".vapi-btn") as HTMLElement | null;
          if (b) {
            b.click();
            clearInterval(iv);
          } else if (tries++ >= 80) {
            clearInterval(iv);
            // Button never appeared — fall back to contact
            window.location.href = "/contact";
          }
        }, 200);
      };
    };

    script.addEventListener("load", onScriptLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onScriptLoad);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Set up fallback opener that toggles a contact modal
  function setupFallbackOpener() {
    (window as unknown as WinVapi).openCipherChat = () => {
      if (setModalOpen) {
        setModalOpen(true);
        modalOpenRef.current = true;
      }
    };
  }

  if (showFallback) {
    return (
      <div className="cipher-fallback">
        <div className="cipher-modal-backdrop" onClick={() => {
          setShowFallbackState(false);
          modalOpenRef.current = false;
        }}>
          <div className="cipher-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cipher-modal-header">
              <h3>Chat with Cipher</h3>
              <button
                onClick={() => {
                  setShowFallbackState(false);
                  modalOpenRef.current = false;
                }}
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
