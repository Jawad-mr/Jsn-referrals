import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Users,
  Award,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReferModal from "../components/ReferModal";
import { getOfferingBySlug, ALL_OFFERINGS } from "../data/catalog";

export default function OfferingDetail() {
  const { slug } = useParams();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  const item = getOfferingBySlug(slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] text-white app-screen-container">
        {!isDashboard && <Navbar />}
        <div className="mx-auto max-w-md px-5 py-24 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">Offering not found</h1>
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            The product or service you're looking for doesn't exist or has moved.
          </p>
          <Link
            to={isDashboard ? "/dashboard/products" : "/products-services"}
            className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-xs font-bold text-[var(--color-ink)]"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>
        {!isDashboard && <Footer />}
      </div>
    );
  }

  const isProduct = item.type === "product";
  const otherOfferings = ALL_OFFERINGS.filter((o) => o.id !== item.id).slice(0, 3);

  return (
    <div className={`${isDashboard ? "" : "min-h-screen bg-[var(--color-ink)] text-[var(--color-text)] app-screen-container"}`}>
      {!isDashboard && <Navbar />}

      {/* TOP NAVIGATION BAR */}
      <div className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[var(--color-ink)]/90 py-3 backdrop-blur-md">
        <div className={`${isDashboard ? "" : "mx-auto max-w-5xl px-4 sm:px-8"} flex items-center justify-between`}>
          <Link
            to={isDashboard ? "/dashboard/products" : "/products-services"}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] transition active:scale-95 hover:text-white"
          >
            <ArrowLeft size={16} /> All Offerings
          </Link>

          <span className="rounded-full bg-[var(--color-surface)] border border-[var(--color-yellow)]/30 px-3 py-1 text-[11px] font-bold text-[var(--color-yellow)]">
            Cash Commission
          </span>
        </div>
      </div>

      {/* MAIN DETAIL CONTAINER */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Product Visual & Action Box */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl">
              <div className="relative h-56 w-full sm:h-72">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-black/20 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="rounded-full bg-[var(--color-yellow)] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-ink)]">
                    {isProduct ? "Product" : "Service"}
                  </span>
                  {item.badge && (
                    <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Box Inside Card */}
              <div className="p-4 sm:p-5">
                <div className="rounded-2xl border border-[var(--color-yellow)]/20 bg-[var(--color-yellow)]/10 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">💰 Referrer Payout</span>
                    <span className="font-extrabold text-[var(--color-yellow)]">Cash Commission</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                    {item.commissionNote || "Earn on every client who completes this project or license."}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2.5">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
                  >
                    <Share2 size={15} />
                    Refer {item.name}
                  </button>

                  {item.officialUrl && (
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] py-3 text-xs font-semibold text-white transition active:scale-95 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
                    >
                      {isProduct ? "Explore Live Product Demo" : "View Studio Page"} <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Specifications */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                <Sparkles size={12} /> {item.category}
              </span>
              <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-3xl">
                {item.name}
              </h1>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                {item.description || item.shortDescription}
              </p>
            </div>

            {/* WHAT IT DOES */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-bold text-white sm:text-base">
                <Layers size={16} className="text-[var(--color-yellow)]" />
                {isProduct ? "What the Product Does" : "What JSN Creative Provides"}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {item.whatItDoes || item.whatItProvides || item.description}
              </p>
            </div>

            {/* MAIN FEATURES */}
            {item.features && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-white sm:text-base">
                  Main Features &amp; Capabilities
                </h3>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-xs text-white"
                    >
                      <CheckCircle2 size={15} className="text-[var(--color-mint)] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHO IT IS FOR */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-bold text-white sm:text-base">
                <Users size={16} className="text-[var(--color-yellow)]" />
                Who Needs This?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                {item.targetAudience || item.whoNeedsIt}
              </p>
            </div>

            {/* KEY BENEFITS */}
            {(item.benefits || item.keyBenefits) && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-white sm:text-base">
                  Key Benefits
                </h3>
                <div className="mt-3 space-y-2">
                  {(item.benefits || item.keyBenefits).map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs text-white"
                    >
                      <Award size={15} className="text-[var(--color-yellow)] flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED OFFERINGS */}
        <section className="mt-14 border-t border-[var(--color-border)] pt-8">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">
              Explore More Offerings
            </h3>
            <Link
              to="/products-services"
              className="text-xs font-bold text-[var(--color-yellow)] hover:underline"
            >
              View all ({ALL_OFFERINGS.length}) →
            </Link>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {otherOfferings.map((other) => (
              <Link
                key={other.id}
                to={`/products-services/${other.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:border-[var(--color-yellow)]/40"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                    {other.type} • {other.category}
                  </span>
                  <h4 className="mt-1 font-[family-name:var(--font-display)] text-sm font-bold text-white group-hover:text-[var(--color-yellow)]">
                    {other.name}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-[11px] text-[var(--color-text-muted)]">
                    {other.shortDescription}
                  </p>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-text-muted)] group-hover:text-white">
                  Details <ArrowUpRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <ReferModal
        offering={item}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {!isDashboard && <Footer />}
    </div>
  );
}
