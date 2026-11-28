import Link from "next/link";
import { CoaiBrandMark } from "@/components/revamp/CoaiIntro";
import { CONTACT } from "@/lib/site";
export function RevampNavbar() {
 return <header className="cl-nav"><nav className="cl-shell cl-nav-inner" aria-label="Primary navigation">
 <Link className="cl-wordmark cl-brand-lockup" href="/" aria-label="COAI home"><CoaiBrandMark /><span><strong>COAI<b>.</b></strong><small>Intelligent Business Infrastructure</small></span></Link>
 <div className="cl-nav-links"><Link href="/#solutions">Solutions</Link><Link href="/#process">Process</Link><Link href="/#faq">FAQ</Link><Link href="/#contact">Contact</Link><a href={"tel:"+CONTACT.phoneE164}>Call {CONTACT.phoneDisplay}</a><Link className="cl-button" href="/intake">Start a diagnostic</Link></div>
 </nav></header>;
}
