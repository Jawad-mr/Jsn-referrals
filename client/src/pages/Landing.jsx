import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Share2,
  Users,
  Wallet,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  ChevronDown,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";
import { formatINR } from "../lib/format";

const FALLBACK_FEED = [
  { name: "R••••h", amount: 4200 },
  { name: "S••a", amount: 8500 },
  { name: "A•••t", amount: 2100 },
  { name: "P••••a", amount: 12000 },
  { name: "M•••n", amount: 6300 },
];

const FALLBACK_LEADERBOARD = [
  { name: "Rahul K.", totalEarnings: 34500 },
  { name: "Sneha M.", totalEarnings: 27800 },
  { name: "Arjun T.", totalEarnings: 19200 },
];

export default function Landing() {
  const [feed, setFeed] = useState(FALLBACK_FEED);
  const [leaderboard, setLeaderboard] = useState(FALLBACK_LEADERBOARD);

  useEffect(() => {
    api.get("/referrals/activity-feed").then((res) => {
      if (res.data.feed?.length) setFeed(res.data.feed);
    }).catch(() => {});
    api.get("/referrals/leaderboard").then((res) => {
      if (res.data.leaderboard?.length) setLeaderboard(res.data.leaderboard);
    }).catch(() => {});
  }, []);

  const tickerItems = [...feed, ...feed]; // duplicated for seamless loop

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--color-border)]">
        <div
          className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-yellow), transparent 70%)" }}
        />
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
            The Jsn Creative Referral Program is open
          </div>

          <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-[var(--color-text)] sm:text-6xl">
            Know a business that needs a website? <span className="text-[var(--color-yellow)]">Get paid for the intro.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            Refer businesses to Jsn Creative for web, app, or AI work. When your referral becomes a client, you earn a real commission — no cap, no catch.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/join"
              className="group flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
            >
              Join the program — it's free
              <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-border)] px-7 py-3.5 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-text-muted)]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[var(--color-text-faint)]">
            <span className="flex items-center gap-2"><ShieldCheck size={15} className="text-[var(--color-mint)]" /> No cost to join</span>
            <span className="flex items-center gap-2"><Zap size={15} className="text-[var(--color-yellow)]" /> Commission on every closed project</span>
            <span className="flex items-center gap-2"><Users size={15} className="text-[var(--color-amber)]" /> Unlimited referrals</span>
          </div>
        </div>

        {/* Signature element: live earnings ticker */}
        <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-4">
          <div className="overflow-hidden">
            <div className="ticker-track flex w-max gap-8 whitespace-nowrap">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-muted)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-mint)]" />
                  {item.name} earned <span className="font-semibold text-[var(--color-yellow)]">{formatINR(item.amount)}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">How it works</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps, and you're earning
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Join free",
              body: "Sign up in under a minute and get your own referral link and code — no fees, no minimums.",
            },
            {
              icon: Share2,
              title: "Refer someone",
              body: "Share your link, or submit a lead directly from your dashboard with their contact details and what they need.",
            },
            {
              icon: Wallet,
              title: "Earn commission",
              body: "When the project closes, you earn a percentage of its value. Track it live, get paid on approval.",
            },
          ].map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-yellow)]/10 text-[var(--color-yellow)]">
                <step.icon size={20} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS & SERVICES DISCOVERY PREVIEW */}
      <section id="offerings-preview" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/40 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">
                Products &amp; Services
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                What you're referring &amp; earning on
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                Explore real, in-demand products &amp; services engineered by Jsn Creative. Refer any of them to businesses in your network.
              </p>
            </div>

            <Link
              to="/products-services"
              className="inline-flex items-center gap-1.5 font-semibold text-xs text-[var(--color-yellow)] hover:underline"
            >
              Explore all products &amp; services (16+) →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                slug: "bakery-pos",
                name: "Bakery POS App",
                type: "Product",
                category: "POS & Billing",
                desc: "Complete point-of-sale system for bakeries — inventory, orders, and daily sales in one place.",
                image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
              },
              {
                slug: "restaurant-pos",
                name: "Restaurant POS App",
                type: "Product",
                category: "POS & Billing",
                desc: "Table management, kitchen display, and billing — everything a modern restaurant needs.",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80",
              },
              {
                slug: "web-development",
                name: "Web Development",
                type: "Service",
                category: "Development",
                desc: "Fast, modern websites and web applications built with the latest technologies.",
                image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
              },
              {
                slug: "ai-solutions",
                name: "AI Solutions & Integration",
                type: "Service",
                category: "AI & Automation",
                desc: "Custom AI models, chatbots, and intelligent automation for business workflows.",
                image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80",
              },
            ].map((item) => (
              <div
                key={item.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition hover:-translate-y-1 hover:border-[var(--color-yellow)]/50"
              >
                <div>
                  <div className="relative mb-3.5 h-36 w-full overflow-hidden rounded-xl bg-[var(--color-ink)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--color-yellow)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-ink)]">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white group-hover:text-[var(--color-yellow)]">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--color-text-muted)]">{item.desc}</p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs">
                  <Link
                    to={`/products-services/${item.slug}`}
                    className="font-medium text-[var(--color-text-muted)] hover:text-white"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/products-services/${item.slug}`}
                    className="font-semibold text-[var(--color-yellow)] hover:underline"
                  >
                    Refer Deal →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/products-services"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-ink)] px-6 py-3 text-xs font-bold text-white transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]"
            >
              Browse Full Products &amp; Services Catalog <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* EARNINGS / SOCIAL PROOF */}
      <section id="earnings" className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">Real earnings</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
                See what referrers are already making
              </h2>
              <p className="mt-4 max-w-md text-[var(--color-text-muted)]">
                Commission is a percentage of the project value — the bigger the project you refer, the more you earn. Here's this month's top earners.
              </p>
              <Link
                to="/join"
                className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
              >
                Start earning too <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink)] p-6">
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[var(--color-text-faint)]">Top earners this month</p>
              <div className="space-y-1">
                {leaderboard.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-[var(--color-surface)]">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          i === 0 ? "bg-[var(--color-yellow)] text-[var(--color-ink)]" : "bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-medium">{entry.name}</span>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-semibold text-[var(--color-yellow)]">
                      {formatINR(entry.totalEarnings)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS PREVIEW */}
      <section id="materials-preview" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {["Instagram Story", "WhatsApp Caption", "LinkedIn Post", "Banner Pack"].map((label, i) => (
                <div
                  key={label}
                  className={`flex aspect-[3/4] flex-col justify-between rounded-2xl border border-[var(--color-border)] p-4 ${
                    i % 2 === 0 ? "bg-gradient-to-br from-[var(--color-yellow)]/15 to-[var(--color-surface)]" : "bg-[var(--color-surface)]"
                  }`}
                >
                  <ImageIcon size={18} className="text-[var(--color-text-faint)]" />
                  <p className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--color-text-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">Ready-made materials</p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
              You don't have to design anything
            </h2>
            <p className="mt-4 max-w-md text-[var(--color-text-muted)]">
              Every referrer gets access to ready-to-post banners, story templates, and pre-written captions for Instagram, WhatsApp, and LinkedIn. Just download, personalize your link, and post.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-[var(--color-text-muted)]">
              {["Branded banners sized for every platform", "Captions written and ready to paste", "New materials added regularly"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-yellow)]" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-yellow)]">FAQ</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">Common questions</h2>

          <div className="mt-10 space-y-3">
            {[
              { q: "Is it really free to join?", a: "Yes. There's no cost, no minimum referrals, and no expiry on your account." },
              { q: "How much can I earn?", a: "You earn a percentage of the project value for every referral that converts into a paying client. Larger projects mean larger commissions — there's no cap." },
              { q: "When do I get paid?", a: "Once a project you referred closes, our team confirms the details and approves your commission. Approved commissions are paid out via UPI or bank transfer." },
              { q: "What counts as a referral?", a: "Anyone you introduce to Jsn Creative who goes on to become a paying client for web, app, design, or AI services." },
              { q: "Can I refer more than one person?", a: "Yes — there's no limit. The more relevant referrals you bring in, the more you can earn." },
            ].map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="rounded-3xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-raised)] p-10 text-center sm:p-16">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Your network is worth more than you think
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-text-muted)]">
            Join the Jsn Creative referral program today and turn the businesses you already know into real income.
          </p>
          <Link
            to="/join"
            className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-yellow)] px-8 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-amber)]"
          >
            Join free now <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-ink)]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-[var(--color-text)]"
        aria-expanded={open}
      >
        {q}
        <ChevronDown size={16} className={`shrink-0 text-[var(--color-text-faint)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{a}</p>}
    </div>
  );
}
