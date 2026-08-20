import { useState } from "react";
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/ui";

const SUPPORT_FAQS = [
  {
    q: "How soon are commission payouts processed?",
    a: "Payouts are automatically approved once the referred client completes their project payment. Disbursals to your registered UPI ID or Bank Account are processed within 24-48 hours of milestone completion.",
  },
  {
    q: "What if my referral didn't use my direct link?",
    a: "If you spoke to a client before they contacted us, you can manually submit their lead information through the 'New Referral' tab in your dashboard. Our sales team will attribute the lead to your account.",
  },
  {
    q: "How is project commission calculated?",
    a: "Commissions range from ₹5,000 up to ₹50,000+ depending on the project scope and package (flat 10-20% on software licenses and development retainers). You can view the exact commission per product in the Products & Services catalog.",
  },
  {
    q: "Is my UPI ID and bank information secure?",
    a: "Yes. All financial identifiers are encrypted at rest with military-grade AES-256-GCM encryption on our secure database servers.",
  },
];

export default function Support() {
  const { user } = useAuth();

  const [category, setCategory] = useState("Payout Question");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const whatsappMessage = encodeURIComponent(
    `Hi JSN Creative Support Team! I'm ${user?.name || "a partner"} (Ref Code: ${user?.referralCode || "N/A"}). I need assistance with my referral partner account.`
  );

  function handleSubmitTicket(e) {
    e.preventDefault();
    setLoading(true);
    // Simulate support ticket dispatch & mailto trigger
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSubject("");
      setMessage("");
    }, 800);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
          <Sparkles size={13} /> Dedicated Partner Desk
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-3xl mt-1">
          Help &amp; Support
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--color-text-muted)] max-w-xl">
          Need help with lead tracking, deal closures, or instant payout verification? Our partner team is here for you.
        </p>
      </div>

      {/* Instant Contact Channels */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* WhatsApp Channel */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-[var(--color-mint)]/40 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-mint)]/15 text-[var(--color-mint)]">
                <MessageSquare size={22} />
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-mint)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[var(--color-mint)]">
                <Clock size={11} /> 15 Min Response
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white mt-4">
              WhatsApp Partner Desk
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
              Instant chat with our partner relationship managers for deal verification, custom software quotes, and expedited payouts.
            </p>
          </div>

          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-mint)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-mint)]/90"
          >
            Chat on WhatsApp <ExternalLink size={14} />
          </a>
        </div>

        {/* Email Support Channel */}
        <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:border-[var(--color-yellow)]/40 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-yellow)]/15 text-[var(--color-yellow)]">
                <Mail size={22} />
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[var(--color-yellow)]">
                Official Support
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white mt-4">
              Email Desk
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
              Send formal project proposals, enterprise client requirements, or account verification queries directly to our studio inbox.
            </p>
          </div>

          <a
            href="mailto:hello@jsncreative.studio?subject=JSN%20Referral%20Partner%20Inquiry"
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition active:scale-95 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
          >
            Email: hello@jsncreative.studio <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Support Ticket Submission Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7 shadow-xl">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white flex items-center gap-2">
              <Send size={18} className="text-[var(--color-yellow)]" />
              Send a Message to Partner Desk
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Have a question about a specific client lead or payout? Drop us a note.
            </p>

            {success ? (
              <div className="mt-6 rounded-2xl border border-[var(--color-mint)]/30 bg-[var(--color-mint)]/10 p-5 text-center">
                <CheckCircle2 size={32} className="mx-auto text-[var(--color-mint)] mb-2" />
                <h4 className="font-bold text-white text-sm">Message Received</h4>
                <p className="text-xs text-[var(--color-text-muted)] mt-1">
                  Our team has received your ticket and will respond to <strong className="text-white">{user?.email}</strong> shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-4 rounded-xl bg-[var(--color-mint)] px-4 py-2 text-xs font-bold text-[var(--color-ink)]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                    Inquiry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                  >
                    <option value="Payout Question">Payout &amp; UPI Disbursal</option>
                    <option value="Referral Lead Status">Referral Lead Status Check</option>
                    <option value="Custom Project Pricing">Custom Project / Software Quote</option>
                    <option value="Account & Profile">Account &amp; Security</option>
                    <option value="General Question">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief summary of your question"
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-[var(--color-text-muted)]">
                    Message Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details, client name, or any reference numbers..."
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)] px-3.5 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-[var(--color-yellow)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)] disabled:opacity-60"
                >
                  {loading ? <Spinner /> : <>Submit Inquiry <Send size={14} /></>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick FAQ Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xl">
            <h3 className="font-[family-name:var(--font-display)] text-sm font-bold text-white flex items-center gap-2 mb-4">
              <HelpCircle size={17} className="text-[var(--color-yellow)]" />
              Frequently Asked Questions
            </h3>

            <div className="space-y-2.5">
              {SUPPORT_FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] overflow-hidden transition"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-3.5 text-left text-xs font-bold text-white hover:text-[var(--color-yellow)]"
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        size={15}
                        className={`text-[var(--color-text-muted)] flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[var(--color-yellow)]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 pt-1 text-[11px] leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
