import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, Compass, LogIn, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

const navLinks = [
  { to: "/products-services", label: "Products & Services", isRouterLink: true, highlight: true },
  { to: "/#how-it-works", label: "How it works" },
  { to: "/#earnings", label: "Earnings" },
  { to: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-ink)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
        <Link to="/" className="flex items-center transition active:scale-95">
          <Logo size="md" tagText="Refer" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) =>
            l.isRouterLink ? (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs font-bold uppercase tracking-wider transition ${
                  l.highlight
                    ? "text-[var(--color-yellow)] hover:text-white"
                    : "text-[var(--color-text-muted)] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.to}
                href={l.to}
                className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition hover:text-white"
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop Action Right Area */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}
              className="flex items-center gap-2 rounded-full bg-[var(--color-yellow)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
            >
              <LayoutDashboard size={14} />
              Dashboard
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] transition hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/join"
                className="flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
              >
                Join Free <ArrowUpRight size={14} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[var(--color-text)] transition hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((l) =>
              l.isRouterLink ? (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-xl p-2.5 text-xs font-bold uppercase tracking-wider ${
                    l.highlight
                      ? "bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]"
                      : "text-[var(--color-text)] hover:bg-white/5"
                  }`}
                >
                  <span>{l.label}</span>
                  <Compass size={14} />
                </Link>
              ) : (
                <a
                  key={l.to}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              )
            )}

            <div className="mt-2 flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-4">
              {user ? (
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate(user.role === "admin" ? "/admin" : "/dashboard");
                  }}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
                >
                  <LayoutDashboard size={15} />
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/join"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-2xl bg-[var(--color-yellow)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]"
                  >
                    Join Program Free <ArrowUpRight size={14} />
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] py-2.5 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <LogIn size={14} />
                    Sign in to Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
