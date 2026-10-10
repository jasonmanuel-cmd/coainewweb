export type RevampProject = {
  title: string;
  category: string;
  description: string;
  href: string;
  logo: string;
  result: string;
  metric: string;
};

/** Verified live URLs; keep synchronized with lib/portfolio-cases.tsx. */
export const REVAMP_PROJECTS: RevampProject[] = [
  {
    title: "Phil’s Cheesesteaks & More",
    category: "Food & Beverage",
    description: "A conversion-first restaurant site with a mobile menu, online ordering paths, local business signals, and review proof.",
    href: "https://phils-cheesesteaks-and-more.com",
    logo: "PHIL’S",
    result: "Live",
    metric: "Ordering and local discovery"
  },
  {
    title: "Edwin Ward Consulting",
    category: "Credit Restoration",
    description: "A trust-forward service site with transparent process education and a focused lead-intake journey.",
    href: "https://edwinwardconsulting.com",
    logo: "EWC",
    result: "Live",
    metric: "Trust and lead intake"
  },
  {
    title: "Signature 954",
    category: "General Contracting",
    description: "A premium contractor showcase designed around project credibility, service clarity, and quote requests.",
    href: "https://signature954.vercel.app",
    logo: "S954",
    result: "Live preview",
    metric: "Project and quote funnel"
  },
  {
    title: "Home Grow Money",
    category: "Apparel & Lifestyle",
    description: "A client-owned Next.js storefront with a dual catalog, cart, checkout, and independent operations tooling.",
    href: "https://homegrowmoney.com",
    logo: "HGM",
    result: "Live",
    metric: "Independent storefront"
  },
  {
    title: "Willam Dean",
    category: "Photography & Tattoo",
    description: "One portfolio architecture that gives two distinct audiences a clear gallery and inquiry path.",
    href: "https://willamdean.netlify.app",
    logo: "WD",
    result: "Live preview",
    metric: "Dual-audience portfolio"
  },
  {
    title: "Poison Well Records",
    category: "Independent Music",
    description: "A high-contrast label site for roster, release, merchandise, and booking information without platform dependency.",
    href: "https://poisonwellrecord.netlify.app",
    logo: "PWR",
    result: "Live preview",
    metric: "Owned label platform"
  },
  {
    title: "Master Glass Solutions",
    category: "Industrial Services",
    description: "A commercial glass platform with enhanced quote intake, customer reviews, a website assistant, service-area structure, and documented ownership.",
    href: "https://mgsusa.llc",
    logo: "MGS",
    result: "Live",
    metric: "Call-first service system"
  }
];
