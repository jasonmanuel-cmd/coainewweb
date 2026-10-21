export type RevampProject = {
  title: string;
  category: string;
  description: string;
  href: string;
  logo: string;
  result: string;
  metric: string;
  previewImage?: string;
  previewAlt?: string;
};

/** Verified live URLs; keep synchronized with lib/portfolio-cases.tsx. */
export const REVAMP_PROJECTS: RevampProject[] = [
  {
    title: "Aspen II Homes",
    category: "Residential Homebuilding",
    description: "A Tehachapi homebuilder site connecting the current community release, six semi-custom plans, financing details, and buyer inquiries.",
    href: "https://aspen2homes.com/",
    logo: "ASPEN II",
    previewImage: "/projects/aspen-ii-homes.webp",
    previewAlt: "Aspen II Homes homepage featuring Sunset Retreat in Tehachapi",
    result: "Live",
    metric: "Home plans + buyer path"
  },
  {
    title: "Harbison Standard",
    category: "Real Estate & Development",
    description: "A values-led site for real estate, development, and investing, with service overviews, founder content, video, and contact paths.",
    href: "https://www.harbisonstandard.com/",
    logo: "HARBISON",
    previewImage: "/projects/harbison-standard.webp",
    previewAlt: "Harbison Standard homepage with its Kern County landscape hero",
    result: "Live",
    metric: "Brand story + client paths"
  },
  {
    title: "The Pitts",
    category: "Independent Music",
    description: "An official artist EPK for the band’s Jamestown album, bringing together streaming, track details, press assets, and booking contact.",
    href: "https://www.thepitts805.com/",
    logo: "THE PITTS",
    previewImage: "/projects/the-pitts.webp",
    previewAlt: "The Pitts official website featuring the Jamestown album",
    result: "Live",
    metric: "Album + booking journey"
  },
  {
    title: "T&M Hauling",
    category: "Junk Removal & Hauling",
    description: "A Bakersfield hauling site with clear service information, fast estimate paths, before-and-after proof, and local coverage.",
    href: "https://www.tandmbak.com/",
    logo: "T&M",
    previewImage: "/projects/tm-hauling.webp",
    previewAlt: "T&M Hauling homepage showing the Bakersfield father-and-son crew",
    result: "Live",
    metric: "Service calls + estimates"
  },
  {
    title: "Phil’s Cheesesteaks & More",
    category: "Food & Beverage",
    description: "A conversion-first restaurant site with a mobile menu, online ordering paths, local business signals, and review proof.",
    href: "https://phils-cheesesteaks-and-more.com",
    logo: "PHIL’S",
    previewImage: "/projects/phils-cheesesteaks.webp",
    previewAlt: "Phil’s Cheesesteaks homepage with pickup ordering and Bakersfield location details",
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
