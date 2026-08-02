import Link from "next/link";
import "./sms-consent.css";

/**
 * SMS consent, shared by every form that collects a phone number.
 *
 * Deliberately NOT required. Consent to marketing/automated texts must not be a
 * condition of doing business, so the form submits either way and the answer is
 * recorded as `sms_consent` = "yes" | "no". An unchecked box means we contact
 * the person by phone or email instead — it does not block them.
 */
export function SmsConsentField({ idPrefix = "form" }: { idPrefix?: string }) {
  const id = `${idPrefix}-sms-consent`;
  return (
    <div className="sms-consent">
      {/* Submitted when the box is unticked; the checkbox below overrides it when ticked. */}
      <input type="hidden" name="sms_consent" value="no" />
      <input className="sms-consent__box" type="checkbox" id={id} name="sms_consent" value="yes" />
      <label className="sms-consent__label" htmlFor={id}>
        Text me at this number about my request. Reply STOP to opt out, HELP for help. Message frequency
        varies, and message and data rates may apply. See the{" "}
        <Link href="/sms-terms">SMS terms</Link> and <Link href="/privacy">privacy policy</Link>.
        <span className="sms-consent__note">
          Optional — leave it unticked and we will reach you by phone or email instead.
        </span>
      </label>
    </div>
  );
}
