import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import api from "../lib/api";
import { formatDate, formatINR } from "../lib/format";
import { StatusBadge, Spinner } from "../components/ui";

const filters = ["all", "new", "contacted", "converted", "lost"];

export default function ReferralHistory() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/referrals/mine").then((res) => setReferrals(res.data.referrals)).finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? referrals : referrals.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">My referrals</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">Every lead you've submitted, and where it stands.</p>
        </div>
        <Link
          to="/dashboard/refer"
          className="flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
        >
          <Send size={14} /> New referral
        </Link>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
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
          No referrals in this category yet.
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Commission</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filtered.map((r) => (
                <tr key={r._id}>
                  <td className="px-4 py-3">
                    <p className="font-medium">{r.leadName}</p>
                    <p className="text-xs text-[var(--color-text-faint)]">{r.leadPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.serviceInterested}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatDate(r.createdAt)}</td>
                  <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[var(--color-text)]">
                    {r.commissionAmount ? formatINR(r.commissionAmount) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
