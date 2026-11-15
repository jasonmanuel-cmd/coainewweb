/**
 * Decorative SVG signal field for the homepage hero.
 * Inspired by the lightweight animated-path backgrounds on 21st.dev; this is
 * intentionally plain SVG/CSS (no canvas, client runtime, or animation package).
 */
export function HeroSignalField() {
  return (
    <svg
      className="cinematic-hero-paths"
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="coai-signal-flow" x1="1600" y1="180" x2="480" y2="720" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#54e0b0" stopOpacity="0" />
          <stop offset="0.48" stopColor="#7dff9d" stopOpacity="0.78" />
          <stop offset="1" stopColor="#54e0b0" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <g className="cinematic-path-tracks">
        <path d="M1660 72C1430 80 1426 208 1205 212C1000 216 1040 364 842 378C646 392 707 548 498 615" />
        <path d="M1678 154C1450 160 1394 282 1180 286C978 290 1022 431 816 448C622 464 669 607 452 704" />
        <path d="M1648 246C1438 242 1366 357 1153 364C968 370 990 505 804 524C635 541 640 671 490 792" />
        <path d="M1498 -28C1402 119 1309 174 1200 215C1086 258 1120 342 1011 403C888 472 864 586 733 670" />
        <path d="M1354 -30C1328 115 1218 197 1110 264C1000 332 1034 408 928 477C832 540 779 668 650 813" />
      </g>
      <g className="cinematic-path-pulses">
        <path d="M1660 72C1430 80 1426 208 1205 212C1000 216 1040 364 842 378C646 392 707 548 498 615" />
        <path d="M1678 154C1450 160 1394 282 1180 286C978 290 1022 431 816 448C622 464 669 607 452 704" />
        <path d="M1648 246C1438 242 1366 357 1153 364C968 370 990 505 804 524C635 541 640 671 490 792" />
      </g>
      <g className="cinematic-path-nodes">
        <circle className="cinematic-path-node-ring" cx="1205" cy="212" r="12" />
        <circle className="cinematic-path-node" cx="1205" cy="212" r="3" />
        <circle className="cinematic-path-node-ring" cx="842" cy="378" r="9" />
        <circle className="cinematic-path-node" cx="842" cy="378" r="2.5" />
        <circle className="cinematic-path-node-ring" cx="804" cy="524" r="10" />
        <circle className="cinematic-path-node" cx="804" cy="524" r="2.5" />
      </g>
    </svg>
  );
}
