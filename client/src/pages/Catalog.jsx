import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Package,
  Briefcase,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfferingCard from "../components/OfferingCard";
import ReferModal from "../components/ReferModal";
import { PRODUCTS, SERVICES, VENTURES, ALL_OFFERINGS } from "../data/catalog";

const FILTER_TABS = [
  { id: "all", label: "All Offerings", count: ALL_OFFERINGS.length },
  { id: "products", label: "Products", count: PRODUCTS.length, icon: Package },
  { id: "services", label: "Services", count: SERVICES.length, icon: Briefcase },
  { id: "pos", label: "POS & Billing", count: 2 },
  { id: "dev", label: "Development", count: 3 },
  { id: "ai", label: "AI & Automation", count: 2 },
  { id: "design", label: "Design & Media", count: 3 },
];

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "all";
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleRefer(offering) {
    setSelectedOffering(offering);
    setModalOpen(true);
  }

  const filteredItems = useMemo(() => {
    return ALL_OFFERINGS.filter((item) => {
      // 1. Category / Type filter
      let matchesFilter = true;
      if (activeFilter === "products") matchesFilter = item.type === "product";
      else if (activeFilter === "services") matchesFilter = item.type === "service";
      else if (activeFilter === "pos") matchesFilter = item.category.includes("POS");
      else if (activeFilter === "dev") matchesFilter = item.category.includes("Development") || item.category.includes("Software");
      else if (activeFilter === "ai") matchesFilter = item.category.includes("AI") || item.category.includes("Artificial Intelligence");
      else if (activeFilter === "design") matchesFilter = item.category.includes("Design") || item.category.includes("Media");

      // 2. Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.shortDescription.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.targetAudience && item.targetAudience.toLowerCase().includes(query));
      }

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const productCount = filteredItems.filter((i) => i.type === "product").length;
  const serviceCount = filteredItems.filter((i) => i.type === "service").length;

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] bg-gradient-to-b from-[var(--color-surface)]/50 to-[var(--color-ink)] py-16 sm:py-20">
        <div
          className="pointer-events-none absolute -top-40 right-1/4 h-[450px] w-[450px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-yellow), transparent 70%)" }}
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)]">
            <Sparkles size={13} className="text-[var(--color-yellow)]" />
            Official Jsn Creative Offerings
          </div>

          <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore Products &amp; Services <br className="hidden sm:inline" />
            <span className="text-[var(--color-yellow)]">Ready for Referral.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            Discover the real software products, enterprise apps, and creative services built by{" "}
            <a
              href="https://www.jsncreative.studio/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white underline decoration-[var(--color-yellow)] underline-offset-4 hover:text-[var(--color-yellow)]"
            >
              Jsn Creative Studio
            </a>
            . Understand each offering, and earn a 10% commission on every business you refer.
          </p>

          {/* SEARCH & CONTROLS */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bakery, POS, website, AI, gym, app..."
                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 text-sm text-white placeholder-[var(--color-text-faint)] transition focus:border-[var(--color-yellow)] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)] hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick stats counter */}
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="rounded-full bg-[var(--color-surface)] px-3 py-1.5 border border-[var(--color-border)]">
                Showing <strong className="text-white">{filteredItems.length}</strong> items
              </span>
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="mt-6 flex flex-wrap gap-2 pt-2">
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    setSearchParams(tab.id === "all" ? {} : { filter: tab.id });
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-md"
                      : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-text-muted)] hover:text-white"
                  }`}
                >
                  {tab.icon && <tab.icon size={13} />}
                  {tab.label}
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-[var(--color-ink)]/20 text-[var(--color-ink)]" : "bg-[var(--color-ink)] text-[var(--color-text-faint)]"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISCOVERY GRID */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-12 text-center">
            <Package size={40} className="mx-auto text-[var(--color-text-muted)]" />
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-white">
              No products or services found
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Try searching with different keywords (e.g. "POS", "Web", "AI", "App", "Restaurant").
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-xs font-bold text-[var(--color-ink)]"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {/* PRODUCTS SECTION */}
            {(activeFilter === "all" || activeFilter === "products" || activeFilter === "pos" || activeFilter === "ai") && productCount > 0 && (
              <section id="products-catalog">
                <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                      <Package size={14} /> Ready Software Solutions
                    </div>
                    <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                      Software Products
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    One-time lifetime licenses • High customer conversion rates
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems
                    .filter((item) => item.type === "product")
                    .map((product) => (
                      <OfferingCard key={product.id} item={product} onRefer={handleRefer} />
                    ))}
                </div>
              </section>
            )}

            {/* SERVICES SECTION */}
            {(activeFilter === "all" || activeFilter === "services" || activeFilter === "dev" || activeFilter === "design") && serviceCount > 0 && (
              <section id="services-catalog">
                <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                      <Briefcase size={14} /> Custom Development &amp; Design
                    </div>
                    <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                      Creative &amp; Engineering Services
                    </h2>
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Full lifecycle web, mobile, AI &amp; branding contracts
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredItems
                    .filter((item) => item.type === "service")
                    .map((service) => (
                      <OfferingCard key={service.id} item={service} onRefer={handleRefer} />
                    ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* VENTURES SHOWCASE BANNER */}
        <section className="mt-20 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                <Layers size={14} /> Incubated by Jsn Creative
              </div>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Official Studio Ventures Portfolio
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                Explore the autonomous brands and venture platforms incubated and operated by Jsn Creative.
              </p>
            </div>

            <a
              href="https://www.jsncreative.studio/#ventures"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] px-6 py-3 text-xs font-semibold text-white transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              View Studio Portfolio <ExternalLink size={14} />
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((venture) => (
              <a
                key={venture.name}
                href={venture.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-4 transition hover:border-[var(--color-yellow)]/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-base font-bold text-white group-hover:text-[var(--color-yellow)]">
                      {venture.name}
                    </span>
                    <ArrowUpRight size={14} className="text-[var(--color-text-muted)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-yellow)]" />
                  </div>
                  <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{venture.description}</p>
                </div>
                <span className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-faint)]">
                  {venture.category}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* REFER MODAL */}
      <ReferModal
        offering={selectedOffering}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOffering(null);
        }}
      />

      <Footer />
    </div>
  );
}
