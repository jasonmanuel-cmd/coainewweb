"use client";

import { useEffect } from "react";

interface VapiSDK {
  run: (config: Record<string, unknown>) => void;
}

interface VapiWindow {
  vapiSDK?: VapiSDK;
}

export function CipherChat() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    let vapiReady = false;

    const handleLoad = () => {
      const w = window as unknown as VapiWindow;
      if (w.vapiSDK) {
        w.vapiSDK.run({
          apiKey: process.env.NEXT_PUBLIC_VAPI_API_KEY || "e89bf...37",
          assistant: "0c4d7983-e21b-4385-b269-552d98d457f4",
          config: {
            position: "bottom-right",
            mode: "voice-and-chat",
            theme: {
              primary: "#111827",
              secondary: "#ffffff",
            },
          },
        });
      }
      vapiReady = true;
      // Notify anyone waiting that the widget is initialized
      window.dispatchEvent(new CustomEvent("cipher-ready"));
    };

    script.addEventListener("load", handleLoad);

    // Expose a global function so nav/footer buttons can open the widget.
    // Uses polling because the .vapi-btn is injected by the SDK after async load.
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    (window as unknown as VapiWindow & { openCipherChat?: () => void }).openCipherChat = () => {
      if (vapiReady && document.querySelector(".vapi-btn")) {
        (document.querySelector(".vapi-btn") as HTMLButtonElement).click();
        return;
      }
      // Poll for up to 5 seconds for the widget button to appear
      let attempts = 0;
      const maxAttempts = 50;
      const tryClick = () => {
        const btn = document.querySelector(".vapi-btn") as HTMLButtonElement | null;
        if (btn) {
          btn.click();
          if (pollInterval) clearInterval(pollInterval);
        } else if (attempts++ < maxAttempts) {
          if (!pollInterval) pollInterval = setInterval(tryClick, 100);
        } else if (pollInterval) {
          clearInterval(pollInterval);
          // Fallback: open contact page if Vapi widget never appeared
          window.location.href = "/contact";
        }
      };
      tryClick();
    };

    return () => {
      script.removeEventListener("load", handleLoad);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
