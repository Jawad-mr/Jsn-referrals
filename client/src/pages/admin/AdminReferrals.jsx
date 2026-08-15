import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../../lib/api";
import { formatDate, formatINR } from "../../lib/format";
import { StatusBadge, Spinner } from "../../components/ui";

const statusFilters = ["all", "new", "contacted", "converted", "lost"];

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);

  function load() {
    setLoading(true);
    api.get("/admin/referrals").then((res) => setReferrals(res.data.referrals)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  const filtered = filter === "all" ? referrals : referrals.filter((r) => r.status === filter);

  async function approvePayout(id) {
    await api.patch(`/admin/referrals/${id}/approve`);
    load();
  }

  async function markPaid(id) {
    await api.patch(`/admin/referrals/${id}/paid`);
    load();
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Referrals</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Review leads, mark conversions, and manage payouts.</p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {statusFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium capitalize transition ${
              filter === f
                ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                : "border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex h-48 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center text-sm text-[var(--color-text-muted)]">
          No referrals in this category.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Referrer</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Commission</th>
                <th className="px-4 py-3 font-medium">Payout</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map((r) => (
                <tr key={r._id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{r.leadName}</p>
                    <p className="text-xs text-[var(--color-text-faint)]">{r.leadPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.referrer?.name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.serviceInterested}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)]">
                    {r.commissionAmount ? formatINR(r.commissionAmount) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {r.payoutStatus !== "not_applicable" ? <StatusBadge status={r.payoutStatus} /> : <span className="text-[var(--color-text-faint)]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(r)}
                        className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--color-yellow)]"
                      >
                        Edit
                      </button>
                      {r.payoutStatus === "pending" && (
                        <button
                          onClick={() => approvePayout(r._id)}
                          className="rounded-lg bg-[var(--color-mint)]/15 px-3 py-1.5 text-xs font-medium text-[var(--color-mint)] transition hover:bg-[var(--color-mint)]/25"
                        >
                          Approve
                        </button>
                      )}
                      {r.payoutStatus === "approved" && (
                        <button
                          onClick={() => markPaid(r._id)}
                          className="rounded-lg bg-[var(--color-yellow)]/15 px-3 py-1.5 text-xs font-medium text-[var(--color-yellow)] transition hover:bg-[var(--color-yellow)]/25"
                        >
                          Mark paid
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <EditReferralModal
          referral={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function EditReferralModal({ referral, onClose, onSaved }) {
  const [status, setStatus] = useState(referral.status);
  const [projectValue, setProjectValue] = useState(referral.projectValue || "");
  const [commissionPercent, setCommissionPercent] = useState(referral.commissionPercent || 10);
  const [adminNote, setAdminNote] = useState(referral.adminNote || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.patch(`/admin/referrals/${referral._id}/status`, {
        status,
        projectValue: status === "converted" ? projectValue : undefined,
        commissionPercent: status === "converted" ? commissionPercent : undefined,
        adminNote,
      });
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold">{referral.leadName}</h3>
            <p className="text-xs text-[var(--color-text-faint)]">Referred by {referral.referrer?.name}</p>
          </div>
          <button onClick={onClose} aria-label="Close"><X size={18} className="text-[var(--color-text-muted)]" /></button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="modal-field">
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </label>

          {status === "converted" && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Project value (₹)</span>
                <input
                  type="number"
                  min="0"
                  value={projectValue}
                  onChange={(e) => setProjectValue(e.target.value)}
                  className="modal-field"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Commission %</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(e.target.value)}
                  className="modal-field"
                  required
                />
              </label>
            </div>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">Internal note (optional)</span>
            <textarea value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="modal-field min-h-[70px] resize-y" />
          </label>

          {error && <p className="text-sm text-[var(--color-danger)]">{error}</p>}

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)] disabled:opacity-60"
            >
              {saving ? <Spinner /> : "Save changes"}
            </button>
            <button type="button" onClick={onClose} className="rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>

        <style>{`
          .modal-field {
            width: 100%;
            border-radius: 0.65rem;
            border: 1px solid var(--color-border);
            background-color: var(--color-ink);
            padding: 0.6rem 0.85rem;
            font-size: 0.875rem;
            color: var(--color-text);
          }
          .modal-field:focus { outline: none; border-color: var(--color-yellow); }
        `}</style>
      </div>
    </div>
  );
}
