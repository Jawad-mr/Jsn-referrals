import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

export default function Join() {
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ ...form, refCode });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen max-h-screen w-full flex-col justify-center items-center overflow-hidden bg-[var(--color-ink)] px-4 py-3">
      {/* Brand Header */}
      <div className="mb-4 flex flex-col items-center">
        <Link to="/" className="transition active:scale-95">
          <Logo size="lg" />
        </Link>
      </div>

      {/* Main Registration Card */}
      <div className="w-full max-w-sm rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl text-center">
          Create Account
        </h1>
        <p className="mt-0.5 text-center text-xs text-[var(--color-text-muted)]">
          Join free &amp; get your personal referral link instantly
        </p>

        {refCode && (
          <div className="mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/10 px-3 py-1.5 text-[11px] font-semibold text-[var(--color-yellow)]">
            <Sparkles size={12} /> Referred by: <span className="font-mono font-bold">{refCode}</span>
          </div>
        )}

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-2.5 text-xs text-[var(--color-danger)]">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
          <div>
            <span className="mb-1 block text-[11px] font-semibold text-[var(--color-text-muted)]">Full Name</span>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none transition focus:border-[var(--color-yellow)]"
              placeholder="Your full name"
            />
          </div>

          <div>
            <span className="mb-1 block text-[11px] font-semibold text-[var(--color-text-muted)]">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none transition focus:border-[var(--color-yellow)]"
              placeholder="you@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="mb-1 block text-[11px] font-semibold text-[var(--color-text-muted)]">Phone</span>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none transition focus:border-[var(--color-yellow)]"
                placeholder="+91"
              />
            </div>

            <div>
              <span className="mb-1 block text-[11px] font-semibold text-[var(--color-text-muted)]">Password</span>
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none transition focus:border-[var(--color-yellow)]"
                placeholder="6+ chars"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
            >
              {loading ? <Spinner /> : <>Start Earning <ArrowRight size={14} /></>}
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
          Already a user?{" "}
          <Link to="/login" className="font-bold text-[var(--color-yellow)] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
