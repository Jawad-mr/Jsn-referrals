// Official Brand Logo Component for JSN REFER
// Clean, high-impact branding: 'JSN' + 'REFER'

export default function Logo({
  size = "md",
  showTag = true,
  tagText = "REFER",
  className = "",
}) {
  const sizeMap = {
    sm: {
      box: "h-8 w-8 rounded-xl",
      text: "text-sm",
      sub: "text-[10px]",
      tag: "text-[9px] px-1.5 py-0.5",
      svgSize: "w-4.5 h-4.5",
    },
    md: {
      box: "h-9 w-9 rounded-2xl",
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
      svgSize: "w-6 h-6",
    },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center gap-2 font-[family-name:var(--font-display)] select-none ${className}`}
    >
      {/* Brand Icon Emblem */}
      <div
        className={`relative flex ${s.box} items-center justify-center bg-gradient-to-br from-[#1C1F28] to-[#0A0C10] border border-[var(--color-yellow)]/50 shadow-[0_2px_14px_rgba(245,197,24,0.22)] flex-shrink-0`}
      >
        <div className="absolute inset-[1px] rounded-[inherit] border border-white/10 pointer-events-none" />

        {/* Vector SVG Mark */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={s.svgSize}
        >
          {/* Bridge link */}
          <path
            d="M11 15C11 13.8954 11.8954 13 13 13H18C19.1046 13 20 13.8954 20 15C20 16.1046 19.1046 17 18 17H13C11.8954 17 11 16.1046 11 15Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />
          {/* Upward Dynamic J Loop */}
          <path
            d="M23 9C24.1046 9 25 9.89543 25 11V25C25 28.3137 22.3137 31 19 31C15.6863 31 13 28.3137 13 25C13 23.8954 13.8954 23 15 23C16.1046 23 17 23.8954 17 25C17 26.1046 17.8954 27 19 27C20.1046 27 21 26.1046 21 25V13H19C17.8954 13 17 12.1046 17 11C17 9.89543 17.8954 9 19 9H23Z"
            fill="url(#yellowGradient)"
          />
          {/* Spark Beacon */}
          <circle cx="28" cy="11" r="3" fill="#FFFFFF" />
          <circle cx="28" cy="11" r="1.5" fill="#F5C518" />

          <defs>
            <linearGradient id="yellowGradient" x1="13" y1="9" x2="25" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF275" />
              <stop offset="0.6" stopColor="#F5C518" />
              <stop offset="1" stopColor="#E09B00" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography: JSN REFER */}
      <div className="flex items-center gap-1.5 leading-none">
        <span className={`${s.text} font-extrabold tracking-tight text-white`}>
          JSN
        </span>
        <span className={`${s.text} font-bold tracking-tight text-[var(--color-yellow)]`}>
          REFER
        </span>
      </div>
    </div>
  );
}
