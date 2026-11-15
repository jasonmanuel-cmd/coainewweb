"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";
import { CONTACT } from "@/lib/site";

type TurnstileFieldProps = {
  onToken: (token: string) => void;
  onExpire?: () => void;
  className?: string;
};

export function TurnstileField({ onToken, onExpire, className }: TurnstileFieldProps) {
  const [failed, setFailed] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  function verificationFailed() {
    onToken("");
    setFailed(true);
  }
  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={(token) => { setFailed(false); onToken(token); }}
        onExpire={() => { onToken(""); onExpire?.(); }}
        onError={verificationFailed}
        onTimeout={verificationFailed}
        onUnsupported={verificationFailed}
      />
      {failed ? <p role="alert">Verification could not finish. Try opening this page in your regular browser, or contact Jason directly below. Your form details are still here.</p> : null}
      <p className="m-form-note">
        Verification not loading? <a href={`tel:${CONTACT.phoneE164}`}>Call {CONTACT.phoneDisplay}</a> or <a href={`mailto:${CONTACT.email}`}>email Jason</a> to discuss your request.
      </p>
    </div>
  );
}
