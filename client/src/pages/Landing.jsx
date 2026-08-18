import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Share2,
  Users,
  Wallet,
  ShieldCheck,
  Zap,
  ChevronDown,
  LogIn,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";
import { formatINR } from "../lib/format";

const FALLBACK_FEED = [
  { name: "Rahul K.", amount: 8500 },
  { name: "Sneha M.", amount: 14200 },
  { name: "Arjun T.", amount: 6400 },
  { name: "Priya S.", amount: 19800 },
  { name: "Vikram P.", amount: 11500 },
];

const FALLBACK_LEADERBOARD = [
  { name: "Rahul K.", totalEarnings: 42500, referralsCount: 5 },
  { name: "Sneha M.", totalEarnings: 31800, referralsCount: 3 },
  { name: "Arjun T.", totalEarnings: 24200, referralsCount: 4 },
];

const FAQS = [
  {
    q: "How does Jsn Refer work?",
    a: "You introduce clients, businesses, or friends who need website development, mobile apps, POS billing software, or AI solutions to Jsn Creative. When they close a project or software license, you earn a flat 10% cash commission.",
  },
  {
    q: "Is there any cost or fee to join?",
    a: "No. Jsn Refer is 100% free to join with zero registration fees, minimum quotas, or hidden costs.",
  },
  {
    q: "How do I refer a business?",
    a: "Once signed in, you get a personal referral link and access to our 1-tap WhatsApp/Telegram sharing tool, or you can submit client lead details directly from your referrer dashboard.",
  },
  {
    q: "When and how do I receive commission payouts?",
    a: "Commissions are approved once the referred client completes their project payment, and transferred directly to your bank account or UPI.",
  },
];

export default function Landing() {
  const [feed, setFeed] = useState(FALLBACK_FEED);
  const [leaderboard, setLeaderboard] = useState(FALLBACK_LEADERBOARD);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    api.get("/referrals/activity-feed")
      .then((res) => {
        if (res.data.feed?.length) setFeed(res.data.feed);
      })
      .catch(() => {});

    api.get("/referrals/leaderboard")
      .then((res) => {
        if (res.data.leaderboard?.length) setLeaderboard(res.data.leaderboard);
      })
      .catch(() => {});
  }, []);

  const tickerItems = [...feed, ...feed];

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]">
      <Navbar />

      {/* HERO SECTION — FOCUSED ON JOIN & SIGN IN */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] px-4 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-20">
        <div
          className="pointer-events-none absolute -top-32 right-[-5%] h-[420px] w-[420px] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, var(--color-yellow), transparent 70%)" }}
        />

        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--color-surface)] px-4 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
            Official Jsn Creative Referral Program
          </div>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            Know someone who needs tech? <br />
            <span className="text-[var(--color-yellow)]">Get paid for the intro.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            Refer businesses to JSN Creative for websites, mobile apps, bakery/restaurant POS software, or AI solutions. Earn a flat <strong>10% cash commission</strong> on every closed deal.
          </p>

          {/* MAIN SIGN IN & JOIN ACTIONS */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              to="/join"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-xl transition active:scale-95 hover:bg-[var(--color-amber)]"
            >
              Join Free &amp; Start Earning <ArrowUpRight size={17} />
            </Link>

            <Link
              to="/login"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition active:scale-95 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              <LogIn size={17} />
              Sign in to Account
            </Link>
          </div>

          {/* Micro Value Props */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-5 text-xs text-[var(--color-text-faint)] sm:gap-8">
            <span className="flex items-center gap-1.5 font-semibold text-[var(--color-text-muted)]">
              <ShieldCheck size={16} className="text-[var(--color-mint)]" /> Zero Fees or Quotas
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-[var(--color-text-muted)]">
              <Zap size={16} className="text-[var(--color-yellow)]" /> Flat 10% Commission
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-[var(--color-text-muted)]">
              <Users size={16} className="text-[var(--color-amber)]" /> Instant Payout Tracking
            </span>
          </div>
        </div>
      </section>

      {/* LIVE EARNINGS TICKER */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-3">
        <div className="overflow-hidden">
          <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
            {tickerItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
                {item.name} earned{" "}
                <span className="font-bold text-[var(--color-yellow)]">
                  {formatINR(item.amount)}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* THREE-STEP WORKFLOW */}
      <section id="how-it-works" className="py-14 sm:py-20 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="text-center max-w-xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              Simple Process
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
              Three steps, and you're earning
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: Users,
                title: "1. Join Free in 30 Seconds",
                desc: "Sign up with your basic details and get your unique referral link and dashboard immediately.",
              },
              {
                step: "02",
                icon: Share2,
                title: "2. Introduce a Business",
                desc: "Share your link on WhatsApp/Telegram or submit client lead details from your referrer portal.",
              },
              {
                step: "03",
                icon: Wallet,
                title: "3. Earn Cash Commission",
                desc: "When the project closes or software license is delivered, receive your 10% commission payout.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-yellow)]/40"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs font-extrabold text-[var(--color-yellow)]">
                  {s.step}
                </span>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
                  <s.icon size={20} />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VERIFIED EARNINGS & SOCIAL PROOF */}
      <section id="earnings" className="border-b border-[var(--color-border)] bg-[var(--color-surface)]/40 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                Real Earnings
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                See What Referrers Are Already Making
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                Commission is a flat percentage of every project closed. The larger the web, app, or software contract, the higher your commission.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                {[
                  "Average commission: ₹5,000 - ₹25,000 per closed deal",
                  "Direct UPI / Bank Transfer payout on completion",
                  "Real-time deal progress tracking in dashboard",
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-white">
                    <CheckCircle2 size={15} className="text-[var(--color-mint)] flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/join"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
              >
                Create Free Referrer Account <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:col-span-6 shadow-xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[var(--color-text-faint)]">
                Top Referrers Leaderboard
              </p>
              <div className="space-y-2.5">
                {leaderboard.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl bg-[var(--color-ink)] p-4 border border-white/5"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                          idx === 0
                            ? "bg-[var(--color-yellow)] text-[var(--color-ink)]"
                            : "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-white">{entry.name}</p>
                        <p className="text-[10px] text-[var(--color-text-faint)]">
                          {entry.referralsCount || 3} deals converted
                        </p>
                      </div>
                    </div>

                    <span className="font-[family-name:var(--font-mono)] text-xs font-extrabold text-[var(--color-yellow)]">
                      {formatINR(entry.totalEarnings)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-14 sm:py-20 border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              Questions &amp; Answers
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4.5 text-left text-xs font-bold text-white sm:text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-[var(--color-text-muted)] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[var(--color-yellow)]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4 pt-1 text-xs leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Call to Action */}
          <div className="mt-14 rounded-3xl border border-[var(--color-yellow)]/30 bg-gradient-to-br from-[var(--color-yellow)]/10 to-[var(--color-surface)] p-8 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white sm:text-2xl">
              Ready to start earning commissions?
            </h3>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              Sign up today and get your referral link immediately.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/join"
                className="w-full sm:w-auto rounded-2xl bg-[var(--color-yellow)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
              >
                Join Free Now
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition active:scale-95 hover:border-[var(--color-yellow)]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
