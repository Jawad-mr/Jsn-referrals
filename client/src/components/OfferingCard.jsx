import { Link } from "react-router-dom";
import { ArrowRight, Share2, Sparkles, CheckCircle2 } from "lucide-react";

export default function OfferingCard({ item, onRefer }) {
  const isProduct = item.type === "product";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5 transition-all duration-300 hover:border-[var(--color-yellow)]/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)]">
      <div>
        {/* Visual Media Header */}
        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-[var(--color-ink)] sm:h-44">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                isProduct
                  ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                  : "bg-[var(--color-surface-raised)] text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {isProduct ? "Product" : "Service"}
            </span>
            {item.badge && (
              <span className="rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>

          <span className="absolute bottom-2.5 right-3 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-text-muted)] backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Content Body */}
        <Link to={`/products-services/${item.slug}`} className="block group-hover:text-[var(--color-yellow)]">
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white transition-colors sm:text-lg">
            {item.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)] line-clamp-2">
          {item.shortDescription}
        </p>

        {/* Highlight Feature bullets */}
        {item.features && item.features.length > 0 && (
          <div className="mt-3.5 space-y-1.5 border-t border-[var(--color-border-subtle)] pt-3 text-[11px] text-[var(--color-text-muted)]">
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
      <div className="mt-5 flex items-center gap-2 border-t border-[var(--color-border)] pt-3.5">
        <Link
          to={`/products-services/${item.slug}`}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2.5 text-xs font-semibold text-[var(--color-text)] transition active:scale-95 hover:border-[var(--color-text-muted)] hover:text-white"
        >
          Details <ArrowRight size={13} />
        </Link>

        <button
          onClick={() => onRefer(item)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-yellow)] px-3 py-2.5 text-xs font-bold text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
        >
          <Share2 size={13} />
          Refer Now
        </button>
      </div>
    </div>
  );
}
