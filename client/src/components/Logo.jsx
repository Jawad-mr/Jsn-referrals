export default function Logo({ size = "md", showTag = true, tagText = "Refer", className = "" }) {
  const sizeMap = {
    sm: { box: "h-7 w-7 rounded-lg", text: "text-base", sub: "text-xs", icon: 16 },
    md: { box: "h-9 w-9 rounded-xl", text: "text-lg", sub: "text-xs", icon: 20 },
    lg: { box: "h-12 w-12 rounded-2xl", text: "text-2xl", sub: "text-sm", icon: 26 },
  };

  const s = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 font-[family-name:var(--font-display)] font-bold tracking-tight select-none ${className}`}>
      {/* Premium Gradient Icon Squircle */}
      <div
        className={`relative flex ${s.box} items-center justify-center bg-gradient-to-br from-[#1E222D] to-[#0E1015] border border-[#2D3342] shadow-[0_0_15px_rgba(245,197,24,0.15)] group-hover:shadow-[0_0_20px_rgba(245,197,24,0.3)] transition-all duration-300`}
      >
        {/* Subtle gold inner ring */}
        <div className="absolute inset-[1px] rounded-[inherit] border border-[#F5C518]/25 pointer-events-none" />

        {/* Geometric J Vector */}
        <svg viewBox="0 0 32 32" className="h-5/6 w-5/6 fill-[#F5C518] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          <path d="M10 8h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-5v7a4 4 0 1 1-8 0 2 2 0 0 1 4 0 0 0 0 0 0 0v-7h-3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />
          <circle cx="21.5" cy="19.5" r="2" className="fill-[#FFF066]" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <span className={`${s.text} font-bold text-white tracking-tight flex items-center gap-1.5`}>
          Jsn Creative
          {showTag && (
            <span className="text-[var(--color-yellow)] font-extrabold tracking-normal">
              {tagText}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
