import Image from "next/image";
import Link from "next/link";
import { CONTACT } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="m-error-page">
      <Image className="m-error-mark" src="/coai-mark.webp" alt="" width={120} height={120} />
      <h1 className="m-error-title">404</h1>
      <p className="m-error-sub">
        That page doesn&apos;t exist. If you think it should, call Jason - he probably just hasn&apos;t built it yet.
      </p>
      <div className="m-error-actions">
        <Link href="/" className="m-btn-primary">
          Go Home
        </Link>
        <Link href="/services" className="m-btn-ghost">
          Services
        </Link>
        <Link href="/portfolio" className="m-btn-ghost">
          Work
        </Link>
        <Link href="/pricing" className="m-btn-ghost">
          Pricing
        </Link>
        <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
          Call {CONTACT.phoneDisplay}
        </a>
      </div>
    </div>
  );
}
