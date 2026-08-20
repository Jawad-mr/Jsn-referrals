import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  Wallet,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Save,
  KeyRound,
  ExternalLink,
  Sparkles,
  Copy,
  Check,
  Building2,
  Headphones,
  FileText,
} from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { getReferralLink, formatINR } from "../lib/format";
import { Spinner } from "../components/ui";

const UPI_REGEX = /^[\w.-]{2,256}@[a-zA-Z]{2,64}$/;

export default function Profile() {
  const { user, setUser } = useAuth();

  const [activeTab, setActiveTab] = useState("payouts"); // 'payouts' | 'account' | 'security'
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");

  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    try {
      const res = await api.get("/auth/profile");
      const u = res.data.user;
      setName(u.name || "");
      setPhone(u.phone || "");
      setUpiId(u.payoutMethod?.upiId || "");
      setBankAccountName(u.payoutMethod?.bankAccountName || "");
      setBankAccountNumber(u.payoutMethod?.bankAccountNumber || "");
      setBankIFSC(u.payoutMethod?.bankIFSC || "");
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");

    if (upiId.trim() && !UPI_REGEX.test(upiId.trim())) {
      setProfileError("Please enter a valid UPI ID (e.g. mobile@paytm or name@okaxis).");
      return;
    }

    setSavingProfile(true);
    try {
      const res = await api.put("/auth/profile", {
        name,
        phone,
        upiId,
        bankAccountName,
        bankAccountNumber,
        bankIFSC,
      });
      setProfileSuccess("Settings saved successfully. Payout details encrypted with AES-256.");
      if (res.data.user) {
        setUser((prev) => ({ ...prev, ...res.data.user }));
      }
      setTimeout(() => setProfileSuccess(""), 4000);
    } catch (err) {
      setProfileError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setSavingPassword(true);
    try {
      await api.put("/auth/change-password", { currentPassword, newPassword });
      setPasswordSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  }

  function copyReferralLink() {
    const link = getReferralLink(user?.referralCode);
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  const isUpiValid = upiId.trim() ? UPI_REGEX.test(upiId.trim()) : false;
  const userInitial = user?.name ? user.name.trim().charAt(0).toUpperCase() : "U";

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-[var(--color-text-muted)]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* 1. TOP PROFILE HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-surface)] to-[var(--color-ink)] p-5 sm:p-7 shadow-2xl">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-yellow), transparent 70%)" }}
        />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--color-amber)] to-[var(--color-yellow)] text-2xl font-black text-[var(--color-ink)] shadow-[0_4px_20px_rgba(245,197,24,0.3)]">
              {userInitial}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white sm:text-2xl truncate">
                  {user?.name || "Partner"}
                </h1>
                <span className="flex items-center gap-1 rounded-full bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-mint)]">
                  <ShieldCheck size={12} /> Verified
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Quick Referral Chip */}
          <button
            onClick={copyReferralLink}
            className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/10 px-4 py-2.5 text-xs font-bold text-[var(--color-yellow)] transition active:scale-95 hover:bg-[var(--color-yellow)]/20"
          >
            <span className="font-mono">Ref: {user?.referralCode}</span>
            {copiedLink ? <Check size={14} className="text-[var(--color-mint)]" /> : <Copy size={14} />}
          </button>
        </div>

        {/* 3 KPI Summary Pills */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-5">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)]/60 p-3">
            <span className="text-[10px] font-semibold uppercase text-[var(--color-text-faint)]">Earnings Paid</span>
            <p className="mt-0.5 font-mono text-sm font-bold text-[var(--color-yellow)]">{formatINR(user?.paidOut || 0)}</p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)]/60 p-3">
            <span className="text-[10px] font-semibold uppercase text-[var(--color-text-faint)]">Payout Status</span>
            <p className={`mt-0.5 text-sm font-bold ${upiId || bankAccountNumber ? "text-[var(--color-mint)]" : "text-[var(--color-amber)]"}`}>
              {upiId || bankAccountNumber ? "Configured" : "Add UPI ID"}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)]/60 p-3">
            <span className="text-[10px] font-semibold uppercase text-[var(--color-text-faint)]">Encryption</span>
            <p className="mt-0.5 text-sm font-bold text-white flex items-center gap-1">
              <Lock size={13} className="text-[var(--color-mint)]" /> AES-256-GCM
            </p>
          </div>
        </div>
      </div>

      {/* 2. TABBED SEGMENT SELECTOR */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: "payouts", label: "Payout Methods", icon: Wallet },
          { id: "account", label: "Personal Info", icon: User },
          { id: "security", label: "Security & Password", icon: KeyRound },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition active:scale-95 whitespace-nowrap ${
                isActive
                  ? "bg-[var(--color-yellow)] text-[var(--color-ink)] shadow-md"
                  : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-white border border-[var(--color-border)]"
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Global Alerts */}
      {profileSuccess && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 p-3.5 text-xs text-[var(--color-mint)]">
          <CheckCircle2 size={16} className="flex-shrink-0" />
          <span>{profileSuccess}</span>
        </div>
      )}

      {profileError && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-3.5 text-xs text-[var(--color-danger)]">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{profileError}</span>
        </div>
      )}

      {/* 3. TAB 1: PAYOUT METHODS (UPI & BANK) */}
      {activeTab === "payouts" && (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div>
                <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white flex items-center gap-2">
                  <Wallet size={18} className="text-[var(--color-yellow)]" />
                  Instant Commission Payout Setup
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Direct transfer to your verified UPI ID or Bank Account on closed deals
                </p>
              </div>

              <span className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--color-mint)]">
                <Lock size={13} /> Encrypted at rest
              </span>
            </div>

            {/* UPI Section */}
            <div className="rounded-2xl border border-[var(--color-yellow)]/30 bg-gradient-to-br from-[var(--color-yellow)]/5 to-[var(--color-ink)] p-4 sm:p-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                  Primary: UPI ID / VPA (Instant Disbursal)
                </label>
                {upiId && (
                  <span className={`text-[10px] font-bold ${isUpiValid ? "text-[var(--color-mint)]" : "text-[var(--color-danger)]"}`}>
                    {isUpiValid ? "✓ Valid Format" : "Invalid Format"}
                  </span>
                )}
              </div>

              <div className="relative">
                <QrCode size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. 9876543210@paytm or yourname@okhdfcbank"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 font-mono text-xs sm:text-sm text-white placeholder-[var(--color-text-faint)] outline-none transition focus:border-[var(--color-yellow)]"
                />
              </div>

              <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                Enter any active UPI VPA (Google Pay, PhonePe, Paytm, BHIM). Commission transfers are credited directly within minutes of approval.
              </p>
            </div>

            {/* Optional Bank Account */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)]/50 p-4 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-[var(--color-text-muted)]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Alternative: Direct Bank Account (Optional)
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase text-[var(--color-text-muted)]">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    placeholder="Full name on bank record"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-xs text-white outline-none focus:border-[var(--color-yellow)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase text-[var(--color-text-muted)]">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    placeholder="Bank account number"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 font-mono text-xs text-white outline-none focus:border-[var(--color-yellow)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase text-[var(--color-text-muted)]">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={bankIFSC}
                    onChange={(e) => setBankIFSC(e.target.value.toUpperCase())}
                    placeholder="e.g. HDFC0001234"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 font-mono text-xs text-white uppercase outline-none focus:border-[var(--color-yellow)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
              >
                {savingProfile ? <Spinner /> : <><Save size={15} /> Save Payout Details</>}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 4. TAB 2: PERSONAL INFO */}
      {activeTab === "account" && (
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl space-y-5">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <User size={18} className="text-[var(--color-yellow)]" />
              Personal &amp; Contact Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Email Address (Account ID)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3.5 py-2.5 text-xs sm:text-sm text-[var(--color-text-muted)] cursor-not-allowed opacity-80"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Partner Referral Code
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.referralCode || ""}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[var(--color-yellow)] cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
              >
                {savingProfile ? <Spinner /> : <><Save size={15} /> Save Changes</>}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 5. TAB 3: SECURITY & PASSWORD */}
      {activeTab === "security" && (
        <form onSubmit={handleChangePassword} className="space-y-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl space-y-5">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <KeyRound size={18} className="text-[var(--color-yellow)]" />
              Change Password
            </h2>

            {passwordSuccess && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 p-3.5 text-xs text-[var(--color-mint)]">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-3.5 text-xs text-[var(--color-danger)]">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  New Password (6+ chars)
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
              >
                {savingPassword ? <Spinner /> : "Update Password"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 6. BOTTOM HELPFUL LINKS */}
      <div className="grid gap-4 sm:grid-cols-2 pt-2">
        <Link
          to="/dashboard/support"
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs font-bold text-white hover:border-[var(--color-yellow)] transition"
        >
          <span className="flex items-center gap-2">
            <Headphones size={16} className="text-[var(--color-yellow)]" />
            Need help with your account? Talk to Support
          </span>
          <ExternalLink size={14} className="text-[var(--color-text-muted)]" />
        </Link>

        <Link
          to="/terms"
          className="flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs font-bold text-white hover:border-[var(--color-yellow)] transition"
        >
          <span className="flex items-center gap-2">
            <FileText size={16} className="text-[var(--color-mint)]" />
            View Referral Program Terms &amp; Policies
          </span>
          <ExternalLink size={14} className="text-[var(--color-text-muted)]" />
        </Link>
      </div>
    </div>
  );
}
