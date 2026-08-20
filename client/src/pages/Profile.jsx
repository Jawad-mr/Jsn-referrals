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
} from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

export default function Profile() {
  const { user, setUser } = useAuth();

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
      setProfileSuccess("Payout & profile details securely updated.");
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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-[var(--color-text-muted)]">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
          Profile &amp; Bank Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--color-text-muted)]">
          Manage your contact information and secure encrypted UPI / bank payout details.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Account Details & Payout Settings */}
        <div className="space-y-6 lg:col-span-8">
          {/* Main Profile Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white">
                    Personal Information
                  </h2>
                  <p className="text-[11px] text-[var(--color-text-muted)]">Your identity in the partner program</p>
                </div>
              </div>

              <span className="flex items-center gap-1 rounded-full bg-[var(--color-mint)]/10 border border-[var(--color-mint)]/30 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-mint)]">
                <ShieldCheck size={12} /> Verified Referrer
              </span>
            </div>

            {profileSuccess && (
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 p-3 text-xs text-[var(--color-mint)]">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}

            {profileError && (
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-3 text-xs text-[var(--color-danger)]">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

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
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[var(--color-yellow)]"
                  placeholder="Your legal name"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Email (Account ID)
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ""}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3.5 py-2.5 text-xs sm:text-sm text-[var(--color-text-muted)] cursor-not-allowed outline-none opacity-80"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Contact Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none transition focus:border-[var(--color-yellow)]"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Referral Code
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.referralCode || ""}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]/50 px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-[var(--color-yellow)] cursor-not-allowed outline-none"
                />
              </div>
            </div>

            {/* PAYOUT SECTION */}
            <div className="border-t border-[var(--color-border)] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
                    <Wallet size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Direct Payout Details</h3>
                    <p className="text-[11px] text-[var(--color-text-muted)]">
                      Commissions are disbursed directly to your UPI ID or Bank Account
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-[var(--color-mint)]">
                  <Lock size={13} />
                  <span className="hidden sm:inline">AES-256 Encrypted</span>
                </div>
              </div>

              {/* UPI ID INPUT */}
              <div className="rounded-2xl border border-[var(--color-yellow)]/30 bg-gradient-to-br from-[var(--color-yellow)]/5 to-[var(--color-ink)] p-4 sm:p-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                    UPI ID / VPA (Instant Transfer)
                  </label>
                  <span className="text-[10px] font-semibold text-[var(--color-text-faint)]">Recommended</span>
                </div>
                <div className="relative">
                  <QrCode size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@paytm or yourname@okhdfcbank"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-3 pl-11 pr-4 font-mono text-xs sm:text-sm text-white placeholder-[var(--color-text-faint)] outline-none transition focus:border-[var(--color-yellow)]"
                  />
                </div>
                <p className="mt-2 text-[11px] text-[var(--color-text-muted)]">
                  Your UPI ID is encrypted before being saved in our database. We use this to send instant commission payouts.
                </p>
              </div>

              {/* OPTIONAL BANK ACCOUNT DETAILS */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)]/60 p-4 sm:p-5 space-y-3">
                <p className="text-xs font-bold text-white">
                  Alternative: Direct Bank Account (Optional)
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase text-[var(--color-text-muted)]">
                      Account Name
                    </label>
                    <input
                      type="text"
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                      placeholder="Name on passbook"
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-white outline-none focus:border-[var(--color-yellow)]"
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
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 font-mono text-xs text-white outline-none focus:border-[var(--color-yellow)]"
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
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 font-mono text-xs text-white uppercase outline-none focus:border-[var(--color-yellow)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingProfile}
                className="flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
              >
                {savingProfile ? <Spinner /> : <><Save size={15} /> Save Profile &amp; Payouts</>}
              </button>
            </div>
          </form>

          {/* Change Password Form */}
          <form
            onSubmit={handleChangePassword}
            className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl space-y-4"
          >
            <div className="flex items-center gap-2.5 border-b border-[var(--color-border)] pb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-border)] text-white">
                <KeyRound size={18} />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
                  Security &amp; Password
                </h3>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Update your authentication credentials
                </p>
              </div>
            </div>

            {passwordSuccess && (
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 p-3 text-xs text-[var(--color-mint)]">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            {passwordError && (
              <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-danger)]/30 bg-[var(--color-danger-dim)] p-3 text-xs text-[var(--color-danger)]">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none focus:border-[var(--color-yellow)]"
                  placeholder="Current password"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none focus:border-[var(--color-yellow)]"
                  placeholder="6+ chars"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-[var(--color-text-muted)]">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3 py-2 text-xs text-white outline-none focus:border-[var(--color-yellow)]"
                  placeholder="Repeat new password"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={savingPassword}
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-5 py-2.5 text-xs font-bold text-white transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] disabled:opacity-60"
              >
                {savingPassword ? <Spinner /> : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Program & Security Information Card */}
        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              <Sparkles size={14} /> Partner Status
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-4 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-[var(--color-text-muted)]">Account Role</span>
                <span className="font-bold uppercase text-white">{user?.role || "Referrer"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--color-text-muted)]">Payout Status</span>
                <span className={`font-bold ${upiId || bankAccountNumber ? "text-[var(--color-mint)]" : "text-[var(--color-amber)]"}`}>
                  {upiId || bankAccountNumber ? "Configured" : "Action Needed"}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[var(--color-text-muted)]">Security Level</span>
                <span className="font-bold text-[var(--color-mint)]">High (AES-256)</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs text-[var(--color-text-muted)]">
              <p className="flex items-start gap-2">
                <ShieldCheck size={16} className="text-[var(--color-mint)] flex-shrink-0 mt-0.5" />
                <span>Your financial identifiers are never shared with prospective clients or third parties.</span>
              </p>
              <p className="flex items-start gap-2">
                <Lock size={16} className="text-[var(--color-yellow)] flex-shrink-0 mt-0.5" />
                <span>Protected with symmetric AES-256 encryption at rest on our secure servers.</span>
              </p>
            </div>

            <div className="border-t border-[var(--color-border)] pt-4">
              <Link
                to="/terms"
                className="flex items-center justify-between text-xs font-semibold text-[var(--color-yellow)] hover:underline"
              >
                <span>Read Referral Terms &amp; Policies</span>
                <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
