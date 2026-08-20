import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Send,
  History,
  Image as ImageIcon,
  Wallet,
  LogOut,
  Menu,
  X,
  Sparkles,
  User,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

const links = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/products", label: "Products & Services", icon: Sparkles },
  { to: "/dashboard/refer", label: "New referral", icon: Send },
  { to: "/dashboard/history", label: "My referrals", icon: History },
  { to: "/dashboard/materials", label: "Materials", icon: ImageIcon },
  { to: "/dashboard/earnings", label: "Earnings", icon: Wallet },
  { to: "/dashboard/profile", label: "Profile & Payouts", icon: User },
  { to: "/dashboard/support", label: "Help & Support", icon: HelpCircle },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)] flex flex-col md:flex-row">
      {/* Mobile Sticky Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-ink)]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <Logo size="sm" tagText="Dashboard" />
        <div className="flex items-center gap-2">
          <NavLink
            to="/dashboard/profile"
            className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-bold text-white transition active:scale-95 hover:border-[var(--color-yellow)]"
            title="View Profile"
          >
            <User size={14} className="text-[var(--color-yellow)]" />
            <span>Profile</span>
          </NavLink>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-white transition active:scale-95"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Slide-Over Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar (Fixed on Desktop & Slide-Over on Mobile) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 shadow-2xl transition-transform duration-300 ease-in-out md:fixed md:inset-y-0 md:left-0 md:z-30 md:h-screen md:w-64 md:flex-shrink-0 md:translate-x-0 md:shadow-none md:px-6 md:py-8 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <Logo size="md" tagText="Refer" />
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:text-white md:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <NavLink
          to="/dashboard/profile"
          onClick={() => setMobileOpen(false)}
          className="group mb-6 block rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-3.5 transition hover:border-[var(--color-yellow)]/50"
        >
          <div className="flex items-center justify-between">
            <p className="truncate text-xs font-bold text-white group-hover:text-[var(--color-yellow)]">
              {user?.name || "Referrer"}
            </p>
            <span className="text-[9px] font-bold uppercase text-[var(--color-mint)]">Verified</span>
          </div>
          <p className="truncate text-[10px] text-[var(--color-text-muted)] mt-0.5">{user?.email}</p>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar py-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  isActive
                    ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-sm font-extrabold"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-white"
                }`
              }
            >
              <l.icon size={16} className="flex-shrink-0" />
              <span className="truncate">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto border-t border-[var(--color-border)] pt-4 space-y-1">
          <NavLink
            to="/terms"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-[11px] font-semibold text-[var(--color-text-faint)] hover:text-[var(--color-text-muted)]"
          >
            <ShieldCheck size={15} />
            Terms &amp; Policies
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-danger)]"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area — Offset on desktop by the fixed sidebar width */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 md:py-10 max-w-6xl w-full md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}


