import { Link } from "react-router-dom";
import { ArrowRight, Share2, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export default function OfferingCard({ item, onRefer }) {
  const isProduct = item.type === "product";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-yellow)]/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] sm:p-6">
      <div>
        {/* Card Header Image with overlay */}
        <div className="relative mb-5 h-44 w-full overflow-hidden rounded-xl bg-[var(--color-ink)] sm:h-48">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />

          {/* Badge & Type Tag */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${
                isProduct
                  ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                  : "bg-[var(--color-surface-raised)] text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {isProduct ? "Product" : "Service"}
            </span>
            {item.badge && (
              <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                {item.badge}
              </span>
            )}
          </div>

          <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-muted)] backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white transition-colors group-hover:text-[var(--color-yellow)] sm:text-xl">
          {item.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm line-clamp-2">
          {item.shortDescription}
        </p>

        {/* Quick Highlights */}
        {item.features && (
          <ul className="mt-4 space-y-1.5 text-xs text-[var(--color-text-faint)]">
            {item.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5 truncate">
                <CheckCircle2 size={13} className="text-[var(--color-mint)] flex-shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center gap-2.5 border-t border-[var(--color-border)] pt-4">
        <Link
          to={`/products-services/${item.slug}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-text-muted)] hover:text-white"
        >
          View Details <ArrowRight size={13} />
        </Link>

        <button
          onClick={() => onRefer(item)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-yellow)] px-3.5 py-2.5 text-xs font-bold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
        >
          <Share2 size={13} />
          Refer {isProduct ? "Product" : "Service"}
        </button>
      </div>
    </div>
  );
}
