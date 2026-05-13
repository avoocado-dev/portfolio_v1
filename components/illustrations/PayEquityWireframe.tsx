/**
 * PayEquityWireframe
 *
 * Stylised wireframe of the Pay Equity Analysis surface used as the hero
 * illustration on the case study. Pure presentational SVG: scales cleanly,
 * crisp at any size, no runtime cost. Colors are hard-coded (rather than
 * using design tokens) so the illustration reads as a UI sketch regardless
 * of light/dark mode — this is "art on a card", not chrome.
 */
export function PayEquityWireframe({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative w-full overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] " +
        (className ?? "")
      }
      aria-hidden="true"
      role="presentation"
    >
      <svg
        viewBox="0 0 600 420"
        xmlns="http://www.w3.org/2000/svg"
        className="block h-auto w-full"
      >
        {/* Heading bar */}
        <rect x="56" y="56" width="220" height="32" rx="3" fill="#2a2a2a" />

        {/* Status indicators (red / green / amber dot + label) */}
        <g transform="translate(56, 134)">
          <circle cx="12" cy="12" r="12" fill="#b03b2c" />
          <rect x="36" y="6" width="120" height="12" rx="2" fill="#5a5a5a" />
        </g>
        <g transform="translate(232, 134)">
          <circle cx="12" cy="12" r="12" fill="#5d8a55" />
          <rect x="36" y="6" width="120" height="12" rx="2" fill="#5a5a5a" />
        </g>
        <g transform="translate(408, 134)">
          <circle cx="12" cy="12" r="12" fill="#e3a53b" />
          <rect x="36" y="6" width="120" height="12" rx="2" fill="#5a5a5a" />
        </g>

        {/* Tab / chip strip */}
        <g transform="translate(56, 192)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              x={i * 86}
              y="0"
              width="74"
              height="24"
              rx="3"
              fill="#a8a8a8"
            />
          ))}
        </g>

        {/* Avatar + name + description row */}
        <g transform="translate(56, 256)">
          <circle cx="22" cy="22" r="22" fill="#b03b2c" />
          <rect x="64" y="10" width="112" height="24" rx="3" fill="#3f3f3f" />
          <rect x="200" y="10" width="288" height="24" rx="3" fill="#a8a8a8" />
        </g>

        {/* Bottom: small label + 3 pills */}
        <g transform="translate(56, 332)">
          <rect x="0" y="0" width="60" height="22" rx="3" fill="#7a7a7a" />
          <rect x="84" y="0" width="120" height="22" rx="11" fill="#dcdcdc" />
          <rect x="220" y="0" width="120" height="22" rx="11" fill="#dcdcdc" />
          <rect x="356" y="0" width="120" height="22" rx="11" fill="#dcdcdc" />
        </g>
      </svg>
    </div>
  );
}
