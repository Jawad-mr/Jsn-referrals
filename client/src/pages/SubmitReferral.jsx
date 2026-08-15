import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import api from "../lib/api";
import { Spinner } from "../components/ui";

const services = [
  "Web Development",
  "App Development",
  "Custom Software",
  "Graphic Designing",
  "Video Editing",
  "UI/UX Design",
  "SEO Services",
  "AI Solutions",
  "Digital Marketing",
  "Other",
];

export default function SubmitReferral() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    leadName: "",
    leadEmail: "",
    leadPhone: "",
    serviceInterested: services[0],
    notes: "",
  });
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
      setTimeout(() => navigate("/dashboard/history"), 1400);
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Submit a referral</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        Tell us about the business or person you're referring. We'll take it from here.
      </p>

      {success && (
        <div className="mt-6 rounded-xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 px-4 py-3 text-sm text-[var(--color-mint)]">
          Referral submitted. Redirecting to your referral history...
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-7 space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <Field label="Lead's name" required>
          <input
            type="text"
            required
            value={form.leadName}
            onChange={(e) => update("leadName", e.target.value)}
            className="field"
            placeholder="Business or contact name"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" required>
            <input
              type="tel"
              required
              value={form.leadPhone}
              onChange={(e) => update("leadPhone", e.target.value)}
              className="field"
              placeholder="+91"
            />
          </Field>
          <Field label="Email (optional)">
            <input
              type="email"
              value={form.leadEmail}
              onChange={(e) => update("leadEmail", e.target.value)}
              className="field"
              placeholder="contact@business.com"
            />
          </Field>
        </div>

        <Field label="Service they're interested in" required>
          <select
            value={form.serviceInterested}
            onChange={(e) => update("serviceInterested", e.target.value)}
            className="field"
          >
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>

        <Field label="Notes (optional)">
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="field min-h-[100px] resize-y"
            placeholder="Anything that would help us follow up well"
            maxLength={1000}
          />
        </Field>

        {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)] disabled:opacity-60"
        >
          {loading ? <Spinner /> : <>Submit referral <Send size={15} /></>}
        </button>
      </form>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background-color: var(--color-ink);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-text);
        }
        .field::placeholder { color: var(--color-text-faint); }
        .field:focus { outline: none; border-color: var(--color-yellow); }
      `}</style>
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
