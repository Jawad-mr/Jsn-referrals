// Official Brand Logo Component for JSN CREATIVE / REFER JSN
// Matches the visual identity of https://www.jsncreative.studio/

export default function Logo({
  size = "md",
  showTag = true,
  tagText = "REFER",
  className = "",
}) {
  const sizeMap = {
    sm: {
      box: "h-7 w-7 rounded-lg",
      text: "text-sm",
      sub: "text-[10px]",
      tag: "text-[9px] px-1.5 py-0.5",
      svgSize: "w-4 h-4",
    },
    md: {
      box: "h-9 w-9 rounded-xl",
      text: "text-base",
      sub: "text-xs",
      tag: "text-[10px] px-2 py-0.5",
      svgSize: "w-5 h-5",
    },
    lg: {
      box: "h-12 w-12 rounded-2xl",
      text: "text-xl",
      sub: "text-sm",
      tag: "text-xs px-2.5 py-1",
      svgSize: "w-7 h-7",
    },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-[family-name:var(--font-display)] select-none ${className}`}
    >
      {/* Brand Icon Emblem */}
      <div
        className={`relative flex ${s.box} items-center justify-center bg-black border border-[var(--color-yellow)]/40 shadow-[0_0_15px_rgba(245,197,24,0.2)] transition-all duration-300 flex-shrink-0`}
      >
        {/* Inner gold glow accent */}
        <div className="absolute inset-[1px] rounded-[inherit] border border-[var(--color-yellow)]/20 pointer-events-none" />

        {/* JSN Monogram Icon */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${s.svgSize} text-[var(--color-yellow)]`}
        >
          {/* Main bold geometric J stem & curve */}
          <path
            d="M20 7H28V22C28 26.4183 24.4183 30 20 30C15.5817 30 12 26.4183 12 22C12 20.8954 12.8954 20 14 20C15.1046 20 16 20.8954 16 22C16 24.2091 17.7909 26 20 26C22.2091 26 24 24.2091 24 22V11H20C18.8954 11 18 10.1046 18 9C18 7.89543 18.8954 7 20 7Z"
            fill="currentColor"
          />
          {/* S & N dynamic energy lines */}
          <path
            d="M8 12C8 10.8954 8.89543 10 10 10H14C15.1046 10 16 10.8954 16 12C16 13.1046 15.1046 14 14 14H10C8.89543 14 8 13.1046 8 12Z"
            fill="#FFFFFF"
            fillOpacity="0.9"
          />
          {/* Creative Spark Dot */}
          <circle cx="28" cy="7" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-center gap-2 leading-none">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className={`${s.text} text-white font-extrabold tracking-tight`}>
              JSN
            </span>
            <span className={`${s.text} text-[var(--color-text-muted)] font-semibold tracking-tight`}>
              CREATIVE
            </span>
            {showTag && (
              <span
                className={`rounded-md bg-[var(--color-yellow)] text-[var(--color-ink)] font-extrabold tracking-wider uppercase ml-1 ${s.tag}`}
              >
                {tagText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
