import { useEffect, useState } from "react";
import { Wallet, Clock, CheckCircle2 } from "lucide-react";
import api from "../lib/api";
import { formatDate, formatINR } from "../lib/format";
import { StatCard, StatusBadge, Spinner } from "../components/ui";

export default function Earnings() {
  const [stats, setStats] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/referrals/mine/stats"), api.get("/referrals/mine")])
      .then(([statsRes, listRes]) => {
        setStats(statsRes.data.stats);
        setReferrals(listRes.data.referrals.filter((r) => r.status === "converted"));
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>
    );
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Earnings</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Commission from your converted referrals.</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total earned" value={formatINR(stats?.totalEarnings)} accent />
        <StatCard label="Pending approval" value={formatINR(stats?.pendingEarnings)} />
        <StatCard label="Paid out" value={formatINR(stats?.paidOut)} />
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-yellow)]/15 text-[var(--color-yellow)]">
            <Wallet size={15} />
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">
            <p className="font-medium text-[var(--color-text)]">How payouts work</p>
            <p className="mt-1 leading-relaxed">
              When a referral converts, our team confirms the project and moves it to <strong className="text-[var(--color-text)]">pending</strong>. Once approved, it becomes part of your <strong className="text-[var(--color-text)]">total earnings</strong>. Approved amounts are paid out via UPI or bank transfer.
            </p>
          </div>
        </div>
      </div>

      <h2 className="mt-9 font-[family-name:var(--font-display)] text-lg font-semibold">Converted referrals</h2>

      {referrals.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center text-sm text-[var(--color-text-muted)]">
          No converted referrals yet. Once one of your leads becomes a client, it'll show up here.
        </div>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3 font-medium">Lead</th>
                <th className="px-4 py-3 font-medium">Project value</th>
                <th className="px-4 py-3 font-medium">Commission</th>
                <th className="px-4 py-3 font-medium">Payout status</th>
                <th className="px-4 py-3 font-medium">Converted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {referrals.map((r) => (
                <tr key={r._id}>
                  <td className="px-4 py-3 font-medium">{r.leadName}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatINR(r.projectValue)}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[var(--color-yellow)]">
                    {formatINR(r.commissionAmount)} <span className="text-[var(--color-text-faint)]">({r.commissionPercent}%)</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={r.payoutStatus} /></td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatDate(r.convertedAt || r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
