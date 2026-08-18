import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListChecks, Users, Image as ImageIcon, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../components/Logo";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/referrals", label: "Referrals", icon: ListChecks },
  { to: "/admin/referrers", label: "Referrers", icon: Users },
  { to: "/admin/materials", label: "Materials", icon: ImageIcon },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4 md:hidden">
        <Logo size="sm" tagText="Admin" />
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Desktop & Mobile Main Layout */}
      <div className="flex min-h-screen w-full">
        <aside
          className={`${
            mobileOpen ? "block" : "hidden"
          } w-full border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-6 md:sticky md:top-0 md:block md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r md:px-6 md:py-8`}
        >
          <div className="mb-8 hidden md:block">
            <Logo size="md" tagText="Admin" />
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

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-10 md:py-10 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
