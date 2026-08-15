import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-ink)]">
      <Navbar />
      <main className="mx-auto flex w-full max-w-md flex-1 items-center px-5 py-16 sm:px-8">
        <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 sm:p-9">
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1.5 text-sm text-[var(--color-text-muted)]">Sign in to your referrer dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-yellow)]"
                placeholder="you@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-yellow)]"
                placeholder="••••••••"
              />
            </label>

            {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)] disabled:opacity-60"
            >
              {loading ? <Spinner /> : <>Sign in <ArrowRight size={15} /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            New here?{" "}
            <Link to="/join" className="font-medium text-[var(--color-yellow)]">Join the program</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
