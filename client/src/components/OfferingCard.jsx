import { Link } from "react-router-dom";
import { ArrowRight, Share2, CheckCircle2 } from "lucide-react";

export default function OfferingCard({ item, onRefer }) {
  const isProduct = item.type === "product";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 sm:p-5 transition-all duration-300 hover:border-[var(--color-yellow)]/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
      <div>
        {/* Visual Media Header */}
        <div className="relative mb-2.5 sm:mb-4 h-28 xs:h-32 sm:h-44 w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[var(--color-ink)]">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute left-2 top-2 sm:left-3 sm:top-3 flex flex-wrap items-center gap-1">
            <span
              className={`rounded-full px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 text-[8px] sm:text-[10px] font-extrabold uppercase tracking-wider ${
                isProduct
                  ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                  : "bg-[var(--color-surface-raised)] text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {isProduct ? "Product" : "Service"}
            </span>
            {item.badge && (
              <span className="hidden xs:inline-block rounded-full border border-white/10 bg-black/60 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-medium text-white backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>

          <span className="absolute bottom-2 right-2 sm:bottom-2.5 sm:right-3 rounded-md bg-black/75 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-semibold text-[var(--color-text-muted)] backdrop-blur-sm truncate max-w-[70%]">
            {item.category}
          </span>
        </div>

        {/* Content Body */}
        <Link to={`/products-services/${item.slug}`} className="block group-hover:text-[var(--color-yellow)]">
          <h3 className="font-[family-name:var(--font-display)] text-xs font-bold text-white transition-colors sm:text-lg line-clamp-1 sm:line-clamp-2">
            {item.name}
          </h3>
        </Link>

        <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
          {item.shortDescription}
        </p>

        {/* Highlight Feature bullets (Visible on tablet/desktop) */}
        {item.features && item.features.length > 0 && (
          <div className="mt-3.5 hidden sm:block space-y-1.5 border-t border-[var(--color-border-subtle)] pt-3 text-[11px] text-[var(--color-text-muted)]">
            {item.features.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 truncate">
                <CheckCircle2 size={13} className="text-[var(--color-mint)] flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-3 sm:mt-5 flex flex-col xs:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2 border-t border-[var(--color-border)] pt-2.5 sm:pt-3.5">
        <Link
          to={`/products-services/${item.slug}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg sm:rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-2 py-1.5 sm:px-3 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-[var(--color-text)] transition active:scale-95 hover:border-[var(--color-text-muted)] hover:text-white"
        >
          <span>Details</span> <ArrowRight size={11} className="hidden xs:inline" />
        </Link>

        <button
          onClick={() => onRefer(item)}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg sm:rounded-xl bg-[var(--color-yellow)] px-2 py-1.5 sm:px-3 sm:py-2.5 text-[10px] sm:text-xs font-bold text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
        >
          <Share2 size={11} />
          <span>Refer</span>
        </button>
      </div>
    </div>
  );
}

