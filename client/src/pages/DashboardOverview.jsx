import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Share2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { formatINR, getReferralLink } from "../lib/format";
import { StatCard, StatusBadge, Spinner } from "../components/ui";

export default function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [hasPayout, setHasPayout] = useState(Boolean(user?.hasPayoutDetails));

  useEffect(() => {
    Promise.all([
      api.get("/referrals/mine/stats"),
      api.get("/referrals/mine"),
      api.get("/auth/profile").catch(() => null),
    ])
      .then(([statsRes, listRes, profileRes]) => {
        setStats(statsRes.data.stats);
        setRecent(listRes.data.referrals.slice(0, 5));
        if (profileRes?.data?.user?.payoutMethod?.isConfigured || profileRes?.data?.user?.hasPayoutDetails) {
          setHasPayout(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const link = user ? getReferralLink(user.referralCode) : "";

  function copyLink() {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareWhatsapp() {
    const text = encodeURIComponent(
      `I'm referring businesses to Jsn Creative and earning commission on every project that closes. If you need a website, app, or AI solution, check them out: ${link}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-[var(--color-text-muted)]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl font-semibold sm:text-3xl">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">Here's how your referrals are doing.</p>

      {/* Referral link card */}
      <div className="mt-6 rounded-3xl border border-[var(--color-yellow)]/25 bg-gradient-to-br from-[var(--color-yellow)]/10 to-[var(--color-surface)] p-5 sm:p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">Your Referral Link</p>
          <span className="font-mono text-[10px] text-[var(--color-text-muted)]">Code: <strong className="text-white">{user?.referralCode}</strong></span>
        </div>
        <div className="mt-3 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <code className="flex-1 truncate rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 font-[family-name:var(--font-mono)] text-xs sm:text-sm text-[var(--color-text)]">
            {link}
          </code>
          <div className="flex gap-2">
            <button
              onClick={copyLink}
              className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl bg-[var(--color-yellow)] px-4 py-2.5 text-xs font-bold text-[var(--color-ink)] transition active:scale-95 hover:bg-[var(--color-amber)]"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy Link"}
            </button>
            <button
              onClick={shareWhatsapp}
              className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-2.5 text-xs font-semibold text-[var(--color-text)] transition active:scale-95 hover:border-[var(--color-mint)] hover:text-[var(--color-mint)]"
            >
              <Share2 size={14} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Payout Details Prompt only shown if user has NOT yet added UPI/Bank */}
      {!hasPayout && !user?.hasPayoutDetails && (
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/5 p-4">
          <div>
            <p className="text-xs font-bold text-white">Add your UPI ID for Instant Payouts</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">Your bank / UPI details are encrypted with AES-256 for secure payouts.</p>
          </div>
          <Link
            to="/dashboard/profile"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--color-mint)]/20 border border-[var(--color-mint)]/40 px-3.5 py-1.5 text-xs font-bold text-[var(--color-mint)] hover:bg-[var(--color-mint)] hover:text-[var(--color-ink)] transition active:scale-95"
          >
            Setup Payout ID &rarr;
          </Link>
        </div>
      )}

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total earnings" value={formatINR(stats?.totalEarnings)} accent />
        <StatCard label="Pending commission" value={formatINR(stats?.pendingEarnings)} />
        <StatCard label="Paid out" value={formatINR(stats?.paidOut)} />
        <StatCard label="Total referrals" value={stats?.total ?? 0} sub={`${stats?.converted ?? 0} converted`} />
      </div>

      {/* Recent activity */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">Recent referrals</h2>
          <Link to="/dashboard/history" className="flex items-center gap-1 text-sm text-[var(--color-yellow)]">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-[var(--color-border)] p-10 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">You haven't submitted any referrals yet.</p>
            <Link
              to="/dashboard/refer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)]"
            >
              Submit your first referral <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--color-border)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {recent.map((r) => (
                  <tr key={r._id}>
                    <td className="px-4 py-3 font-medium">{r.leadName}</td>
                    <td className="px-4 py-3 text-[var(--color-text-muted)]">{r.serviceInterested}</td>
                    <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
