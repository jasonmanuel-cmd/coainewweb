import type { ReactNode } from "react";
import { GOOGLE_BUSINESS_PROFILE_URL } from "@/lib/site";

type Props = {
  children?: ReactNode;
  className?: string;
};

export function GoogleBusinessLink({ children = "Google Business Profile", className }: Props) {
  return (
    <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
