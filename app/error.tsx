"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "40px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "#e8a020", marginBottom: "8px" }}>Something broke</h1>
      <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.7)", maxWidth: "480px", marginBottom: "32px", lineHeight: 1.6 }}>
        Not your fault. Jason probably pushed an edge case. Try again or head back to the home page.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={reset} style={{ padding: "12px 28px", background: "#e8a020", color: "#000", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "1rem" }}>
          Try Again
        </button>
        <Link href="/" style={{ padding: "12px 28px", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "8px", textDecoration: "none", fontWeight: 600, fontSize: "1rem" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
