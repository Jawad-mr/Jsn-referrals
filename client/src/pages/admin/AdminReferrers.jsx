import { useEffect, useState } from "react";
import api from "../../lib/api";
import { formatDate, formatINR } from "../../lib/format";
import { Spinner } from "../../components/ui";

export default function AdminReferrers() {
  const [referrers, setReferrers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/referrers").then((res) => setReferrers(res.data.referrers)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">Referrers</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Everyone enrolled in the program.</p>

      {loading ? (
        <div className="flex h-48 items-center justify-center"><Spinner className="h-6 w-6 text-[var(--color-text-muted)]" /></div>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-border)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Pending</th>
                <th className="px-4 py-3 font-medium">Total earned</th>
                <th className="px-4 py-3 font-medium">Paid out</th>
                <th className="px-4 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {referrers.map((r) => (
                <tr key={r._id}>
                  <td className="px-4 py-3 font-medium">{r.name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">
                    <p>{r.email}</p>
                    {r.phone && <p className="text-xs text-[var(--color-text-faint)]">{r.phone}</p>}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-xs">{r.referralCode}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)]">{formatINR(r.pendingEarnings)}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)] text-[var(--color-yellow)]">{formatINR(r.totalEarnings)}</td>
                  <td className="px-4 py-3 font-[family-name:var(--font-mono)]">{formatINR(r.paidOut)}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{formatDate(r.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
