import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Copy,
  Check,
  Share2,
  Send,
  X,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Globe,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getReferralLink } from "../lib/format";

export default function ReferModal({ offering, isOpen, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !offering) return null;

  const referralCode = user?.referralCode || "";
  const origin = window.location.origin;
  const directLink = referralCode
    ? getReferralLink(referralCode) + `&item=${encodeURIComponent(offering.slug || offering.id)}`
    : `${origin}/join?interest=${encodeURIComponent(offering.name)}`;

  const shareMessage = `Hey! Check out ${offering.name} by Jsn Creative — ${offering.shortDescription}\n\nExplore here: ${directLink}`;

  function handleCopyLink() {
    navigator.clipboard.writeText(directLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleCopyPitch() {
    navigator.clipboard.writeText(shareMessage);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  }

  function handleWhatsAppShare() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleTelegramShare() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(directLink)}&text=${encodeURIComponent(`Check out ${offering.name} by Jsn Creative — ${offering.shortDescription}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleDirectLeadSubmit() {
    onClose();
    if (user) {
      navigate(`/dashboard/refer?service=${encodeURIComponent(offering.name)}`);
    } else {
      navigate(`/join?interest=${encodeURIComponent(offering.name)}`);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-md transition-opacity sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Container: Bottom sheet on mobile, Centered modal on sm+ */}
      <div
        className="animate-slide-up relative w-full max-w-lg rounded-t-3xl border-t border-white/10 bg-[var(--color-surface)] p-6 shadow-2xl transition-all sm:rounded-3xl sm:border sm:border-[var(--color-border)] sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator Handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20 sm:hidden" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-text-muted)] transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header Content */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
          <Sparkles size={14} />
          Refer {offering.type === "product" ? "Product" : "Service"}
        </div>
        <h2 id="modal-headline" className="mt-1.5 font-[family-name:var(--font-display)] text-xl font-bold text-white sm:text-2xl">
          {offering.name}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
          {offering.shortDescription}
        </p>

        {/* Reward Pill Banner */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--color-yellow)]/25 bg-[var(--color-yellow)]/10 px-4 py-2.5 text-xs text-[var(--color-text)]">
          <span className="font-medium">💰 Referral Reward</span>
          <span className="font-bold text-[var(--color-yellow)]">10% Commission Payout</span>
        </div>

        {/* Direct Action Grid */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              Instant 1-Tap Share
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-xs font-bold text-black shadow-md transition active:scale-95 hover:bg-[#20bd5a]"
              >
                <Share2 size={15} />
                WhatsApp
              </button>

              {/* Telegram Button */}
              <button
                onClick={handleTelegramShare}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#229ED9] px-4 py-3 text-xs font-bold text-white shadow-md transition active:scale-95 hover:bg-[#1f8fc4]"
              >
                <MessageSquare size={15} />
                Telegram
              </button>
            </div>
          </div>

          {/* Copy Action Options */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-yellow)]"
            >
              {copiedLink ? <Check size={14} className="text-[var(--color-mint)]" /> : <Copy size={14} />}
              {copiedLink ? "Link Copied!" : "Copy Link"}
            </button>

            <button
              onClick={handleCopyPitch}
              className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs font-semibold text-[var(--color-text)] transition hover:border-[var(--color-yellow)]"
            >
              {copiedPitch ? <Check size={14} className="text-[var(--color-mint)]" /> : <Copy size={14} />}
              {copiedPitch ? "Pitch Copied!" : "Copy Full Pitch"}
            </button>
          </div>

          {/* Direct Lead Submission */}
          <div className="border-t border-[var(--color-border)] pt-4">
            <button
              onClick={handleDirectLeadSubmit}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-lg transition active:scale-95 hover:bg-[var(--color-amber)]"
            >
              <Send size={15} />
              {user ? "Submit Client Lead Directly" : "Join Free & Submit Lead"}
            </button>
            <p className="mt-2 text-center text-[11px] text-[var(--color-text-faint)]">
              {user
                ? "Submits client details straight to your referral dashboard"
                : "Free to join • No fees • Instant referral code"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
