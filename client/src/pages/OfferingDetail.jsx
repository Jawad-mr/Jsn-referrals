import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReferModal from "../components/ReferModal";
import { getOfferingBySlug, ALL_OFFERINGS } from "../data/catalog";
import { useAuth } from "../context/AuthContext";

export default function OfferingDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const item = getOfferingBySlug(slug);

  if (!item) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] text-white">
        <Navbar />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold">Offering not found</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            The product or service you're looking for doesn't exist.
          </p>
          <Link
            to="/products-services"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-yellow)] px-6 py-2.5 text-xs font-bold text-[var(--color-ink)]"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isProduct = item.type === "product";
  const otherOfferings = ALL_OFFERINGS.filter((o) => o.id !== item.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]">
      <Navbar />

      {/* BREADCRUMB HEADER */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/40 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/products-services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)] transition hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Products &amp; Services
          </Link>
          <span className="rounded-full bg-[var(--color-ink)] px-3 py-1 text-[11px] font-medium text-[var(--color-yellow)] border border-[var(--color-border)]">
            10% Referrer Commission
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Visual Preview & Quick Actions */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
              <div className="relative h-64 w-full sm:h-80">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent opacity-80" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--color-yellow)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                    {isProduct ? "Product" : "Service"}
                  </span>
                  {item.badge && (
                    <span className="rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Action bar inside box */}
              <div className="p-6">
                <div className="rounded-2xl border border-[var(--color-yellow)]/30 bg-gradient-to-br from-[var(--color-yellow)]/10 to-transparent p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">Referral Payout</span>
                    <span className="font-bold text-[var(--color-yellow)]">10% of Project Value</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                    {item.commissionNote || "Earn on every client who completes this project or license."}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] shadow-lg transition hover:bg-[var(--color-amber)]"
                  >
                    <Share2 size={16} />
                    Refer {item.name}
                  </button>

                  {item.officialUrl && (
                    <a
                      href={item.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] px-6 py-3 text-xs font-semibold text-white transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
                    >
                      {isProduct ? "Explore Live Product Demo" : "View Official Studio Page"} <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Information */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">
                <Sparkles size={13} /> {item.category}
              </div>
              <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {item.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
                {item.description || item.shortDescription}
              </p>
            </div>

            {/* WHAT IT DOES / WHAT JSN PROVIDES */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                <Layers size={18} className="text-[var(--color-yellow)]" />
                {isProduct ? "What the Product Does" : "What JSN Creative Provides"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.whatItDoes || item.whatItProvides || item.description}
              </p>
            </div>

            {/* MAIN FEATURES */}
            {item.features && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  Main Features &amp; Capabilities
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5 text-xs text-white"
                    >
                      <CheckCircle2 size={16} className="text-[var(--color-mint)] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WHO IT IS USEFUL FOR */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">
              <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold text-white">
                <Users size={18} className="text-[var(--color-yellow)]" />
                Who Needs This?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.targetAudience || item.whoNeedsIt}
              </p>
            </div>

            {/* KEY BENEFITS */}
            {(item.benefits || item.keyBenefits) && (
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  Key Benefits &amp; Advantage
                </h3>
                <div className="mt-4 space-y-2.5">
                  {(item.benefits || item.keyBenefits).map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-xs sm:text-sm text-white"
                    >
                      <Award size={16} className="text-[var(--color-yellow)] flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED OFFERINGS */}
        <section className="mt-20 border-t border-[var(--color-border)] pt-14">
          <div className="flex items-center justify-between">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
              Explore More Offerings
            </h3>
            <Link
              to="/products-services"
              className="text-xs font-semibold text-[var(--color-yellow)] hover:underline"
            >
              View all ({ALL_OFFERINGS.length}) →
            </Link>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {otherOfferings.map((other) => (
              <Link
                key={other.id}
                to={`/products-services/${other.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[var(--color-yellow)]/50"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                    {other.type} • {other.category}
                  </span>
                  <h4 className="mt-1.5 font-[family-name:var(--font-display)] text-base font-bold text-white group-hover:text-[var(--color-yellow)]">
                    {other.name}
                  </h4>
                  <p className="mt-1.5 line-clamp-2 text-xs text-[var(--color-text-muted)]">
                    {other.shortDescription}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-text-muted)] group-hover:text-white">
                  Learn more <ArrowUpRight size={13} />
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

      <Footer />
    </div>
  );
}
