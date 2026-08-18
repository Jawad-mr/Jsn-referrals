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

      <div className="mx-auto flex max-w-7xl">
        <aside
          className={`${
            mobileOpen ? "block" : "hidden"
          } w-full border-b border-[var(--color-border)] px-5 py-4 md:sticky md:top-0 md:block md:h-screen md:w-64 md:border-b-0 md:border-r md:px-6 md:py-8`}
        >
          <div className="mb-8 hidden md:block">
            <Logo size="md" tagText="Admin" />
          </div>

          <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-[var(--color-text-faint)]">{user?.email}</p>
          </div>

          <nav className="space-y-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                  }`
                }
              >
                <l.icon size={17} />
                {l.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-danger)]"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
