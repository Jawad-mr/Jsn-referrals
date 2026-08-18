import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LogIn, AlertCircle } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen max-h-screen w-full flex-col justify-center items-center overflow-hidden bg-[var(--color-ink)] px-4 py-4">
      {/* Top Header Logo */}
      <div className="mb-6 flex flex-col items-center">
        <Link to="/" className="transition active:scale-95">
          <Logo size="lg" />
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl text-center">
          Sign In
        </h1>
        <p className="mt-1 text-center text-xs text-[var(--color-text-muted)]">
          Access your referrer portal &amp; commission stats
        </p>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-2.5 text-xs text-[var(--color-danger)]">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[var(--color-yellow)]"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[var(--color-yellow)]"
              placeholder="••••••••"
            />
          </label>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
            >
              {loading ? <Spinner /> : <>Sign In <ArrowRight size={14} /></>}
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-xs text-[var(--color-text-muted)]">
          New to Jsn Refer?{" "}
          <Link to="/join" className="font-bold text-[var(--color-yellow)] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
