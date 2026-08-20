import { useState, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import {
  Search,
  Package,
  Briefcase,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfferingCard from "../components/OfferingCard";
import ReferModal from "../components/ReferModal";
import { PRODUCTS, SERVICES, VENTURES, ALL_OFFERINGS } from "../data/catalog";

const FILTER_TABS = [
  { id: "all", label: "All", count: ALL_OFFERINGS.length },
  { id: "products", label: "Products", count: PRODUCTS.length, icon: Package },
  { id: "services", label: "Services", count: SERVICES.length, icon: Briefcase },
  { id: "pos", label: "POS & Billing", count: 2 },
  { id: "dev", label: "Development", count: 3 },
  { id: "ai", label: "AI & Agents", count: 2 },
  { id: "design", label: "Design & Media", count: 3 },
];

export default function Catalog() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
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
      let matchesFilter = true;
      if (activeFilter === "products") matchesFilter = item.type === "product";
      else if (activeFilter === "services") matchesFilter = item.type === "service";
      else if (activeFilter === "pos") matchesFilter = item.category.includes("POS");
      else if (activeFilter === "dev")
        matchesFilter = item.category.includes("Development") || item.category.includes("Software");
      else if (activeFilter === "ai")
        matchesFilter = item.category.includes("AI") || item.category.includes("Artificial Intelligence");
      else if (activeFilter === "design")
        matchesFilter = item.category.includes("Design") || item.category.includes("Media");

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
    <div className={`${isDashboard ? "" : "min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]"}`}>
      {!isDashboard && <Navbar />}

      {/* DISCOVERY APP HEADER */}
      <section className={`${isDashboard ? "mb-8" : "border-b border-[var(--color-border)] bg-[var(--color-surface)]/30 px-4 py-8 sm:px-8 sm:py-12"}`}>
        <div className={`${isDashboard ? "" : "mx-auto max-w-7xl"}`}>
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              <Sparkles size={13} /> Official Jsn Creative Studio Catalog
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-4xl">
              Explore Products &amp; Services
            </h1>
            <p className="max-w-xl text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
              Discover active software solutions and design services. Tap "Refer Now" on any offering to share with your network and earn cash commissions.
            </p>
          </div>

          {/* SEARCH & FILTERS BAR */}
          <div className="mt-6 flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bakery, POS, website, AI, gym, Flutter..."
                className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-10 pr-9 text-xs text-white placeholder-[var(--color-text-faint)] transition focus:border-[var(--color-yellow)] focus:outline-none sm:text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Horizontal Scrolling Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFilter(tab.id);
                      setSearchParams(tab.id === "all" ? {} : { filter: tab.id });
                    }}
                    className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition active:scale-95 ${
                      isActive
                        ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sm"
                        : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {tab.icon && <tab.icon size={13} />}
                    {tab.label}
                    <span
                      className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive ? "bg-black/20 text-black font-bold" : "bg-[var(--color-ink)] text-[var(--color-text-faint)]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVERY GRID MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <Package size={36} className="mx-auto text-[var(--color-text-muted)]" />
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold text-white">
              No offerings found
            </h3>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              Try searching with different keywords or reset your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2 text-xs font-bold text-[var(--color-ink)]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Products Subsection */}
            {(activeFilter === "all" || activeFilter === "products" || activeFilter === "pos" || activeFilter === "ai") &&
              productCount > 0 && (
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                        Software Products
                      </h2>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        Lifetime licenses • Ready for instant delivery
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-yellow)]">
                      {productCount} items
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredItems
                      .filter((i) => i.type === "product")
                      .map((p) => (
                        <OfferingCard key={p.id} item={p} onRefer={handleRefer} />
                      ))}
                  </div>
                </section>
              )}

            {/* Services Subsection */}
            {(activeFilter === "all" || activeFilter === "services" || activeFilter === "dev" || activeFilter === "design") &&
              serviceCount > 0 && (
                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
                        Design &amp; Development Services
                      </h2>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        Full custom projects &amp; client retainers
                      </p>
                    </div>
                    <span className="rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-yellow)]">
                      {serviceCount} items
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredItems
                      .filter((i) => i.type === "service")
                      .map((s) => (
                        <OfferingCard key={s.id} item={s} onRefer={handleRefer} />
                      ))}
                  </div>
                </section>
              )}
          </div>
        )}

        {/* VENTURES SHOWCASE BANNER */}
        <section className="mt-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                <Layers size={13} /> Studio Ecosystem
              </div>
              <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                Official Jsn Creative Ventures
              </h3>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                Autonomous digital brands incubated by the studio.
              </p>
            </div>

            <a
              href="https://www.jsncreative.studio/#ventures"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-2 text-xs font-bold text-white transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              Portfolio <ExternalLink size={13} />
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VENTURES.map((v) => (
              <a
                key={v.name}
                href={v.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-3.5 transition hover:border-[var(--color-yellow)]/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-display)] text-sm font-bold text-white group-hover:text-[var(--color-yellow)]">
                      {v.name}
                    </span>
                    <ArrowUpRight size={13} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-yellow)]" />
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--color-text-muted)] line-clamp-2">
                    {v.description}
                  </p>
                </div>
                <span className="mt-3 text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-faint)]">
                  {v.category}
                </span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <ReferModal
        offering={selectedOffering}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOffering(null);
        }}
      />

      {!isDashboard && <Footer />}
    </div>
  );
}
