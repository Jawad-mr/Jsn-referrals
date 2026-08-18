// Clean Text-Only Brand Wordmark for JSN REFER (No graphic logo box)
export default function Logo({
  size = "md",
  className = "",
}) {
  const sizeMap = {
    sm: "text-base tracking-tight",
    md: "text-lg tracking-tight",
    lg: "text-2xl tracking-tight",
  };

  const textSize = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`inline-flex items-center font-[family-name:var(--font-display)] font-extrabold select-none ${textSize} ${className}`}
    >
      <span className="text-white">JSN</span>
      <span className="ml-1.5 text-[var(--color-yellow)]">REFER</span>
    </div>
  );
}
