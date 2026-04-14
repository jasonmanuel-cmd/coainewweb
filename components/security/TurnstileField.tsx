"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type TurnstileFieldProps = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  className?: string;
};

export function TurnstileField({ onToken, onExpire, className }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return (
    <div className={className}>
      <Turnstile siteKey={siteKey} onSuccess={onToken} onExpire={onExpire} />
    </div>
  );
}
