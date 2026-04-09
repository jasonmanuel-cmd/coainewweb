"use client";

import { useEffect, useState } from "react";

const TARGET = 148230;

export function LpRevenueCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const step = Math.ceil(TARGET / 80);
    const id = window.setInterval(() => {
      setValue((v) => {
        const n = Math.min(v + step, TARGET);
        if (n >= TARGET) window.clearInterval(id);
        return n;
      });
    }, 20);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="lp-stat-num" suppressHydrationWarning>
      ${value.toLocaleString()}
    </div>
  );
}
