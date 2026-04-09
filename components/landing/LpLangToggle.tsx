"use client";

import { useState } from "react";

export function LpLangToggle() {
  const [lang, setLang] = useState<"en" | "es">("en");

  return (
    <div className="lp-lang-toggle" role="group" aria-label="Language">
      <button
        type="button"
        className={`lp-lang-btn ${lang === "en" ? "lp-active" : ""}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`lp-lang-btn ${lang === "es" ? "lp-active" : ""}`}
        onClick={() => setLang("es")}
      >
        ES
      </button>
    </div>
  );
}
