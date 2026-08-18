import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Copy, Check, Share2, Send, X, ArrowUpRight, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getReferralLink } from "../lib/format";

export default function ReferModal({ offering, isOpen, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !offering) return null;

  const referralCode = user?.referralCode || "";
  const rawLink = referralCode ? getReferralLink(referralCode) : window.location.origin + "/join";
  const shareLink = `${rawLink}${rawLink.includes("?") ? "&" : "?"}interest=${encodeURIComponent(offering.name)}`;

  const pitchText = `Check out ${offering.name} by Jsn Creative — ${offering.shortDescription} Learn more here: ${shareLink}`;

  function copyPitch() {
    navigator.clipboard.writeText(pitchText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareWhatsApp() {
    const text = encodeURIComponent(pitchText);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  function handleDirectSubmit() {
    onClose();
    if (user) {
      navigate(`/dashboard/refer?service=${encodeURIComponent(offering.name)}`);
    } else {
      navigate(`/join?interest=${encodeURIComponent(offering.name)}`);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-ink)] hover:text-white"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">
          <Sparkles size={14} />
          Refer {offering.type === "product" ? "Product" : "Service"}
        </div>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
          {offering.name}
        </h3>
        <p className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
          {offering.shortDescription}
        </p>

        {/* Commission Banner */}
        <div className="mt-5 rounded-xl border border-[var(--color-yellow)]/20 bg-gradient-to-r from-[var(--color-yellow)]/10 to-transparent p-3.5">
          <p className="text-xs font-medium text-[var(--color-text)]">
            💰 <span className="font-semibold text-[var(--color-yellow)]">Commission Reward:</span> Earn 10% on every closed deal for this {offering.type}.
          </p>
        </div>

        {/* Referral Action Options */}
        <div className="mt-6 space-y-4">
          {user ? (
            <>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--color-text-muted)]">
                  Your Pre-configured Referral Message
                </label>
                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] p-3 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {pitchText}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={copyPitch}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-4 py-2.5 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-yellow)]"
                >
                  {copied ? <Check size={14} className="text-[var(--color-mint)]" /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy Pitch"}
                </button>

                <button
                  onClick={shareWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-black transition hover:opacity-90"
                >
                  <Share2 size={14} />
                  WhatsApp
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleDirectSubmit}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-yellow)] px-5 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
                >
                  <Send size={15} />
                  Submit Lead Details Directly
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] p-4 text-center">
                <p className="text-sm font-medium text-white">Want to earn commission for referring {offering.name}?</p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                  Join our referral program for free to get your personal referral tracking link.
                </p>
                <button
                  onClick={handleDirectSubmit}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-6 py-2.5 text-xs font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
                >
                  Join & Refer This {offering.type === "product" ? "Product" : "Service"} <ArrowUpRight size={14} />
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-muted)]">
                <span>Already have a referrer account?</span>
                <Link to="/login" onClick={onClose} className="font-semibold text-[var(--color-yellow)] hover:underline">
                  Sign in here →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
