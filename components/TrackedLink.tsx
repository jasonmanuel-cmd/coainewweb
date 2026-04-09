"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/client";

type TrackedLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  eventName: string;
  eventPayload?: Record<string, string | number | boolean | null | undefined>;
  target?: string;
  rel?: string;
};

export function TrackedLink({
  href,
  className,
  children,
  eventName,
  eventPayload,
  target,
  rel
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => trackEvent(eventName, { href, ...eventPayload })}
    >
      {children}
    </Link>
  );
}

