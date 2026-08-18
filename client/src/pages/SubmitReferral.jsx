import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Send, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import api from "../lib/api";
import { Spinner } from "../components/ui";

const services = [
  "Web Development",
  "App Development",
  "Custom Software",
  "Bakery POS App",
  "Restaurant POS App",
  "Gym Management App",
  "Hotel Management App",
  "AI Chatbot",
  "AI Solutions",
  "UI/UX Design",
  "SEO Services",
  "Graphic Designing",
  "Video Editing",
  "Digital Marketing",
  "Educational Consultancy",
  "E-Books",
  "Other",
];

export default function SubmitReferral() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prefilledService = searchParams.get("service") || searchParams.get("item") || services[0];

  const [form, setForm] = useState({
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    serviceInterested: services.includes(prefilledService) ? prefilledService : services[0],
    notes: "",
  });

  useEffect(() => {
    const s = searchParams.get("service") || searchParams.get("item");
    if (s && services.includes(s)) {
      setForm((f) => ({ ...f, serviceInterested: s }));
    }
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/referrals", form);
      setSuccess(true);
      setForm({ leadName: "", leadEmail: "", leadPhone: "", serviceInterested: services[0], notes: "" });
      setTimeout(() => navigate("/dashboard/history"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit referral. Please verify the information.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
          Submit a Lead
        </h1>
        <p className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
          Introduce a business or client to Jsn Creative. We'll handle the sales pitch and credit your 10% commission.
        </p>
      </div>

      {form.serviceInterested && form.serviceInterested !== "Web Development" && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/10 px-3.5 py-1.5 text-xs font-bold text-[var(--color-yellow)]">
          <Sparkles size={13} /> Pre-selected: {form.serviceInterested}
        </div>
      )}

      {success && (
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint-dim)] p-4 text-xs font-semibold text-[var(--color-mint)] sm:text-sm">
          <CheckCircle2 size={18} className="flex-shrink-0" />
          <span>Referral successfully submitted! Redirecting to your history...</span>
        </div>
      )}

      {error && (
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-4 text-xs font-semibold text-[var(--color-danger)] sm:text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl"
      >
        <Field label="Client / Business Name" required>
          <input
            type="text"
            required
            value={form.leadName}
            onChange={(e) => update("leadName", e.target.value)}
            className="app-field"
            placeholder="e.g. Acme Bakery, John Doe"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp / Phone Number" required>
            <input
              type="tel"
              required
              value={form.leadPhone}
              onChange={(e) => update("leadPhone", e.target.value)}
              className="app-field"
              placeholder="+91 9876543210"
            />
          </Field>

          <Field label="Email Address (optional)">
            <input
              type="email"
              value={form.leadEmail}
              onChange={(e) => update("leadEmail", e.target.value)}
              className="app-field"
              placeholder="contact@business.com"
            />
          </Field>
        </div>

        <Field label="Service or Product Needed" required>
          <select
            value={form.serviceInterested}
            onChange={(e) => update("serviceInterested", e.target.value)}
            className="app-field"
          >
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project Notes & Context (optional)">
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="app-field min-h-[90px] resize-y"
            placeholder="What does the client want to achieve? Any budget or timeline details?"
            maxLength={1000}
          />
        </Field>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                Submit Referral <Send size={15} />
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        .app-field {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid var(--color-border);
          background-color: var(--color-ink);
          padding: 0.75rem 0.95rem;
          font-size: 0.875rem;
          color: var(--color-text);
          transition: border-color 0.2s ease;
        }
        .app-field::placeholder {
          color: var(--color-text-faint);
        }
        .app-field:focus {
          outline: none;
          border-color: var(--color-yellow);
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
        {label} {required && <span className="text-[var(--color-yellow)]">*</span>}
      </span>
      {children}
    </label>
  );
}
