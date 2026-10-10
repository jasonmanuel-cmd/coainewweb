"use client";

import { useCallback, useState } from "react";
import type { FaqMarketingSection } from "@/lib/faq-marketing-data";

export function FaqMarketingAccordion({ sections }: { sections: FaqMarketingSection[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setOpenKey((k) => (k === key ? null : key));
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="m-faq-layout">
      <nav className="m-faq-nav" aria-label="FAQ sections">
        <div className="m-faq-nav-label">Jump To</div>
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <button type="button" onClick={() => scrollTo(s.id)}>
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        {sections.map((section) => (
          <section key={section.id} className="m-faq-section" id={section.id}>
            <h2 className="m-faq-section-title">{section.title}</h2>
            {section.items.map((item, idx) => {
              const key = `${section.id}-${idx}`;
              const isOpen = openKey === key;
              return (
                <div key={key} className={`m-faq-item ${isOpen ? "m-open" : ""}`}>
                  <button
                    type="button"
                    className="m-faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`${key}-answer`}
                    onClick={() => toggle(key)}
                  >
                    <span>{item.question}</span>
                    <span className="m-faq-toggle" aria-hidden>
                      +
                    </span>
                  </button>
                  <div className="m-faq-answer" id={`${key}-answer`}>
                    <div className="m-faq-answer-inner">
                      {item.answer.split("\n\n").map((para, pi) => (
                        <p key={pi}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
}
