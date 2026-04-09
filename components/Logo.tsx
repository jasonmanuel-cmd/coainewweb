import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="brand" aria-label="Chaotically Organized AI home">
      <Image src="/logo.png" width={88} height={88} alt="Chaotically Organized AI logo" priority />
      <div className="brand-copy">
        <div className="brand-title">CHAOTICALLY ORGANIZED AI</div>
        <small className="muted">Bakersfield, CA | Sovereign Infrastructure</small>
      </div>
    </Link>
  );
}
