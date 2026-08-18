import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Share2,
  Users,
  Wallet,
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronDown,
  Compass,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OfferingCard from "../components/OfferingCard";
import ReferModal from "../components/ReferModal";
import api from "../lib/api";
import { formatINR } from "../lib/format";
import { PRODUCTS, SERVICES } from "../data/catalog";

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
    q: "How does the Refer JSN program work?",
    a: "You share genuine JSN Creative products or services with businesses, friends, or clients who need them. When they purchase a software license or start a development contract, you earn a flat 10% commission on the deal value.",
  },
  {
    q: "Is there any cost or fee to join?",
    a: "No. The program is 100% free to join with no minimum sales quotas, registration fees, or hidden costs.",
  },
  {
    q: "How do I refer a business?",
    a: "You can either share your unique referral link (or one-tap WhatsApp / Telegram share), or submit their project details directly through your referrer dashboard.",
  },
  {
    q: "When and how do I receive commission payouts?",
    a: "Once the referred client completes their project milestone or license payment, your commission is automatically approved and transferred via UPI or direct Bank Transfer.",
  },
];

export default function Landing() {
  const [feed, setFeed] = useState(FALLBACK_FEED);
  const [leaderboard, setLeaderboard] = useState(FALLBACK_LEADERBOARD);
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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

  function handleRefer(offering) {
    setSelectedOffering(offering);
    setModalOpen(true);
  }

  const featuredOfferings = [
    PRODUCTS.find((p) => p.slug === "bakery-pos"),
    PRODUCTS.find((p) => p.slug === "restaurant-pos"),
    SERVICES.find((s) => s.slug === "web-development"),
    SERVICES.find((s) => s.slug === "ai-solutions"),
  ].filter(Boolean);

  const tickerItems = [...feed, ...feed];

  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)] app-screen-container">
      <Navbar />

      {/* HERO SECTION - Compact & Punchy */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)] px-4 pt-10 pb-12 sm:px-8 sm:pt-16 sm:pb-16">
        <div
          className="pointer-events-none absolute -top-32 right-[-5%] h-[380px] w-[380px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--color-yellow), transparent 70%)" }}
        />

        <div className="mx-auto max-w-5xl text-center sm:text-left">
          {/* Status Chip */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-text-muted)] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[var(--color-mint)] animate-pulse" />
            Official Jsn Creative Referral Network
          </div>

          <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.12]">
            Know someone who needs tech? <br className="hidden sm:inline" />
            <span className="text-[var(--color-yellow)]">Earn 10% commission on the deal.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            Explore ready-made software products and custom development services built by{" "}
            <a
              href="https://www.jsncreative.studio/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white underline decoration-[var(--color-yellow)] underline-offset-4 hover:text-[var(--color-yellow)]"
            >
              Jsn Creative Studio
            </a>
            . Refer clients in your network and earn cash payouts on every closed project.
          </p>

          {/* Quick Action CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/products-services"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-6 py-3.5 text-sm font-bold text-[var(--color-ink)] shadow-lg transition active:scale-95 hover:bg-[var(--color-amber)]"
            >
              <Compass size={18} />
              Explore Products &amp; Services
            </Link>

            <Link
              to="/join"
              className="flex items-center justify-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-3.5 text-sm font-semibold text-white transition active:scale-95 hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              Join Program Free <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Feature Micro-Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-text-faint)] sm:justify-start sm:gap-6">
            <span className="flex items-center gap-1.5 font-medium text-[var(--color-text-muted)]">
              <ShieldCheck size={15} className="text-[var(--color-mint)]" /> Zero Fees
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[var(--color-text-muted)]">
              <Zap size={15} className="text-[var(--color-yellow)]" /> 10% Flat Commission
            </span>
            <span className="flex items-center gap-1.5 font-medium text-[var(--color-text-muted)]">
              <Users size={15} className="text-[var(--color-amber)]" /> Unlimited Referrals
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

      {/* FEATURED OFFERINGS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-16">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              <Sparkles size={13} /> Featured Offerings
            </div>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
              Products &amp; Services You Can Refer
            </h2>
            <p className="mt-1 text-xs text-[var(--color-text-muted)] sm:text-sm">
              Pre-built software licenses &amp; high-value development contracts
            </p>
          </div>

          <Link
            to="/products-services"
            className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-yellow)] hover:underline"
          >
            Browse All 16+ Offerings <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOfferings.map((item) => (
            <OfferingCard key={item.id} item={item} onRefer={handleRefer} />
          ))}
        </div>
      </section>

      {/* THREE-STEP WORKFLOW */}
      <section id="how-it-works" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              Simple 3-Step Process
            </p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
              How You Earn with Jsn Creative
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                icon: Compass,
                title: "Explore Offerings",
                desc: "Discover our bakery POS, restaurant systems, mobile apps, or web development packages.",
              },
              {
                step: "02",
                icon: Share2,
                title: "Share or Submit",
                desc: "1-tap share to WhatsApp/Telegram with your referral link, or submit the lead directly from your dashboard.",
              },
              {
                step: "03",
                icon: Wallet,
                title: "Get Paid 10%",
                desc: "When the client completes their order or project milestone, receive direct cash commission into your account.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-yellow)]/40"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs font-extrabold text-[var(--color-yellow)]">
                  {s.step}
                </span>
                <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
                  <s.icon size={19} />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP REFERRERS LEADERBOARD */}
      <section id="earnings" className="border-t border-[var(--color-border)] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
                Verified Earnings
              </p>
              <h2 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold text-white sm:text-3xl">
                Real Payouts to Real Referrers
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-muted)] sm:text-sm">
                Every closed website, app, POS license, or AI project pays out a real 10% commission with zero deductions.
              </p>
              <Link
                to="/join"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
              >
                Start Earning Now <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:col-span-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--color-text-faint)]">
                Top Earners This Month
              </p>
              <div className="space-y-2">
                {leaderboard.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-[var(--color-ink)] p-3.5 border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
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
                          {entry.referralsCount || 3} deals closed
                        </p>
                      </div>
                    </div>

                    <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--color-yellow)]">
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
      <section id="faq" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/30 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)]">
              Got Questions?
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
                    className="flex w-full items-center justify-between p-4 text-left text-xs font-bold text-white sm:text-sm"
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
                    <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-border-subtle)]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REFER MODAL / BOTTOM SHEET */}
      <ReferModal
        offering={selectedOffering}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOffering(null);
        }}
      />

      <Footer />
    </div>
  );
}
