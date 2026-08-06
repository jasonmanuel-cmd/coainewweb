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
    <div className="m-error-page">
      <h1 className="m-error-title">Something broke</h1>
      <p className="m-error-sub">
        Not your fault. Jason probably pushed an edge case. Try again or head back to the home page.
      </p>
      <div className="m-error-actions">
        <button className="m-btn-primary" onClick={reset}>
          Try Again
        </button>
        <Link href="/" className="m-btn-ghost">
          Go Home
        </Link>
      </div>
    </div>
  );
}
