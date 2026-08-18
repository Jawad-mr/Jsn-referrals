import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Send, History, Image as ImageIcon, Wallet, LogOut, Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/products", label: "Products & Services", icon: Sparkles },
  { to: "/dashboard/refer", label: "New referral", icon: Send },
  { to: "/dashboard/history", label: "My referrals", icon: History },
  { to: "/dashboard/materials", label: "Materials", icon: ImageIcon },
  { to: "/dashboard/earnings", label: "Earnings", icon: Wallet },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-ink)]/90 px-4 py-3.5 backdrop-blur-md md:hidden">
        <Logo size="sm" tagText="Dashboard" />
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-yellow)] text-xs font-bold text-[var(--color-ink)]">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Desktop & Mobile Main Layout */}
      <div className="flex min-h-screen w-full">
        {/* Sidebar - Anchored to left edge on desktop */}
        <aside
          className={`${
            mobileOpen ? "block" : "hidden"
          } w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 md:sticky md:top-0 md:block md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r md:px-6 md:py-8`}
        >
          <div className="mb-8 hidden md:block">
            <Logo size="md" tagText="Refer" />
          </div>

          <div className="mb-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-3.5 shadow-sm">
            <p className="truncate text-sm font-bold text-white">{user?.name}</p>
            <p className="truncate text-xs text-[var(--color-text-muted)]">{user?.email}</p>
          </div>

          <nav className="space-y-1.5">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                    isActive
                      ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sm"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-white"
                  }`
                }
              >
                <l.icon size={16} />
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 border-t border-[var(--color-border)] pt-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-danger)]"
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-10 md:py-10 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
