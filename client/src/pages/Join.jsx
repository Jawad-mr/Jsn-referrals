import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-ink)]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-16 sm:px-8">
        <div className="grid w-full gap-14 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">Join the program</p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight tracking-tight">
              Start earning from your network today
            </h1>
            <ul className="mt-8 space-y-4">
              {[
                "Free to join, no minimums",
                "Earn commission on every closed project",
                "Get your own link + ready-made materials",
                "Track every referral in real time",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-[var(--color-text-muted)]">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[var(--color-mint)]" />
                  {t}
                </li>
              ))}
            </ul>
            {refCode && (
              <div className="mt-8 rounded-xl border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/10 px-4 py-3 text-sm text-[var(--color-yellow)]">
                You were invited with referral code <span className="font-[family-name:var(--font-mono)] font-semibold">{refCode}</span>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 sm:p-9">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Create your account</h2>
            <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">Takes less than a minute.</p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <Field label="Full name" required>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="input"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="input"
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone (optional)">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                  placeholder="+91"
                />
              </Field>
              <Field label="Password" required>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="input"
                  placeholder="At least 6 characters"
                />
              </Field>

              {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)] disabled:opacity-60"
              >
                {loading ? <Spinner /> : <>Create account <ArrowRight size={15} /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[var(--color-yellow)]">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background-color: var(--color-ink);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-text);
        }
        .input::placeholder { color: var(--color-text-faint); }
        .input:focus { outline: none; border-color: var(--color-yellow); }
      `}</style>
      <Footer />
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">
        {label} {required && <span className="text-[var(--color-yellow)]">*</span>}
      </span>
      {children}
    </label>
  );
}
