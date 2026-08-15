import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/#how-it-works", label: "How it works" },
  { to: "/#earnings", label: "Earnings" },
  { to: "/#materials-preview", label: "Materials" },
  { to: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-ink)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--color-yellow)] font-bold text-[var(--color-ink)]">J</span>
          <span>
            Jsn Creative <span className="text-[var(--color-yellow)]">Refer</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={() => navigate(user.role === "admin" ? "/admin" : "/dashboard")}
              className="rounded-full bg-[var(--color-yellow)] px-5 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
            >
              Go to dashboard
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
              >
                Sign in
              </Link>
              <Link
                to="/join"
                className="group flex items-center gap-1 rounded-full bg-[var(--color-yellow)] px-5 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
              >
                Join free
                <ArrowUpRight size={15} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </>
          )}
        </div>

        <button
          className="text-[var(--color-text)] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-ink)] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.to} href={l.to} onClick={() => setOpen(false)} className="text-sm text-[var(--color-text-muted)]">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-[var(--color-border)] pt-4">
              {user ? (
                <button
                  onClick={() => { setOpen(false); navigate(user.role === "admin" ? "/admin" : "/dashboard"); }}
                  className="rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-center text-sm font-semibold text-[var(--color-ink)]"
                >
                  Go to dashboard
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="text-center text-sm text-[var(--color-text-muted)]">
                    Sign in
                  </Link>
                  <Link
                    to="/join"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-center text-sm font-semibold text-[var(--color-ink)]"
                  >
                    Join free
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
