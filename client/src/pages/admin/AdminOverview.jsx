import { useEffect, useState } from "react";
import api from "../../lib/api";
import { formatINR } from "../../lib/format";
import { StatCard, Spinner } from "../../components/ui";

export default function AdminOverview() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/summary").then((res) => setSummary(res.data.summary)).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>;
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Program-wide overview.</p>

      <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Total referrers" value={summary?.totalReferrers ?? 0} />
        <StatCard label="Total referrals" value={summary?.totalReferrals ?? 0} />
        <StatCard label="New leads" value={summary?.newLeads ?? 0} />
        <StatCard label="Converted" value={summary?.converted ?? 0} />
        <StatCard label="Pending payout" value={formatINR(summary?.pendingPayoutAmount)} accent />
        <StatCard label="Total paid out" value={formatINR(summary?.totalPaidOut)} />
      </div>
    </div>
  );
}
