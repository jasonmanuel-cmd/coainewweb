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

    const handleLoad = () => {
      const w = window as unknown as VapiWindow;
      if (w.vapiSDK) {
        w.vapiSDK.run({
          apiKey: "e89bfab1-7e36-41df-8c32-77d2ed819d37",
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
    };

    script.addEventListener("load", handleLoad);

    return () => {
      script.removeEventListener("load", handleLoad);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
}
