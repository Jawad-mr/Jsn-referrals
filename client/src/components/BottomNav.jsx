import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Sparkles,
  PlusCircle,
  History,
  Wallet,
  Send,
  UserCheck,
  Compass,
  LogIn,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const path = location.pathname;

  const isDashboard = path.startsWith("/dashboard");
  const isAdmin = path.startsWith("/admin");

  if (isAdmin) return null; // Admin has its own desktop/mobile management

  // Dashboard Nav Items (Logged-in referrer)
  const dashboardItems = [
    {
      label: "Home",
      to: "/dashboard",
      icon: Home,
      isActive: path === "/dashboard",
    },
    {
      label: "Explore",
      to: "/products-services",
      icon: Compass,
      isActive: path.startsWith("/products-services") || path.startsWith("/catalog"),
    },
    {
      label: "Refer",
      to: "/dashboard/refer",
      icon: Send,
      isCenterAction: true,
      isActive: path === "/dashboard/refer",
    },
    {
      label: "History",
      to: "/dashboard/history",
      icon: History,
      isActive: path === "/dashboard/history",
    },
    {
      label: "Earnings",
      to: "/dashboard/earnings",
      icon: Wallet,
      isActive: path === "/dashboard/earnings",
    },
  ];

  // Public Nav Items (Visitors)
  const publicItems = [
    {
      label: "Home",
      to: "/",
      icon: Home,
      isActive: path === "/",
    },
    {
      label: "Offerings",
      to: "/products-services",
      icon: Sparkles,
      isActive: path.startsWith("/products-services") || path.startsWith("/catalog"),
    },
    {
      label: "Join Free",
      to: "/join",
      icon: PlusCircle,
      isCenterAction: true,
      isActive: path === "/join",
    },
    {
      label: "How it works",
      to: "/#how-it-works",
      icon: UserCheck,
      isActive: false,
    },
    {
      label: "Sign in",
      to: user ? "/dashboard" : "/login",
      icon: LogIn,
      isActive: path === "/login",
    },
  ];

  const items = isDashboard && user ? dashboardItems : publicItems;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-3 md:hidden pointer-events-none">
      <nav
        aria-label="Mobile Navigation Bar"
        className="pointer-events-auto mx-auto flex max-w-md items-center justify-around rounded-3xl border border-white/10 bg-[#0E1015]/90 px-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      >
        {items.map((item) => {
          const Icon = item.icon;

          if (item.isCenterAction) {
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="group relative -mt-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--color-amber)] to-[var(--color-yellow)] text-[var(--color-ink)] shadow-[0_4px_20px_rgba(245,197,24,0.45)] transition-transform active:scale-95"
                aria-label={item.label}
              >
                <Icon size={22} className="stroke-[2.5]" />
                <span className="sr-only">{item.label}</span>
              </button>
            );
          }

          if (item.to.startsWith("/#")) {
            return (
              <a
                key={item.label}
                href={item.to}
                className="flex flex-1 flex-col items-center justify-center gap-1 py-1 text-center text-[var(--color-text-muted)] transition active:scale-95 hover:text-white"
              >
                <Icon size={19} className="opacity-80" />
                <span className="text-[10px] font-medium tracking-tight">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 py-1 text-center transition active:scale-95 ${
                item.isActive
                  ? "text-[var(--color-yellow)] font-bold"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              <Icon size={19} className={item.isActive ? "stroke-[2.3]" : "opacity-80"} />
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
              {item.isActive && (
                <span className="absolute -bottom-1 h-1 w-4 rounded-full bg-[var(--color-yellow)] shadow-[0_0_8px_var(--color-yellow)]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
