import { Link } from "react-router-dom";
import {
  ShieldCheck,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Lock,
  Wallet,
  Scale,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-text)]">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-8 sm:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-yellow)] hover:underline mb-4"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-yellow)]/10 text-[var(--color-yellow)] mb-3">
            <ShieldCheck size={28} />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white sm:text-4xl">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[var(--color-text-muted)]">
            JSN Creative Referral Partner Agreement &bull; Last updated: August 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="space-y-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-10 shadow-xl leading-relaxed text-xs sm:text-sm text-[var(--color-text-muted)]">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <FileText size={18} className="text-[var(--color-yellow)]" />
              1. Overview of the Referral Program
            </h2>
            <p>
              Welcome to the <strong>JSN Creative Referral Program</strong> ("Program"). By registering as a referrer, creating an account, or sharing your unique referral link/submitting prospective clients, you agree to be bound by these Terms and Conditions. This agreement governs your participation in referring clients to JSN Creative for technology services, website design, mobile apps, software licensing, and custom digital solutions.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <CheckCircle2 size={18} className="text-[var(--color-mint)]" />
              2. Eligibility and Account Integrity
            </h2>
            <p>
              Participation is open to individuals aged 18 and older. When creating an account, you must provide true, accurate, and complete information (including legal name, contact phone number, and legitimate email). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <Wallet size={18} className="text-[var(--color-yellow)]" />
              3. Referral Qualifications &amp; Commission Calculation
            </h2>
            <p>
              To qualify for a cash commission payout:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>The referred lead must be a genuine new client who has not previously contacted or engaged JSN Creative in the preceding 6 months.</li>
              <li>The client must formally contract with JSN Creative and complete payment for the agreed project or software product license.</li>
              <li>Commissions are calculated as a percentage or fixed incentive based on the net contract value (excluding taxes, third-party server costs, and domain/license fees).</li>
              <li>Commissions move from <em>Pending</em> to <em>Approved</em> once the client payment milestone has cleared into JSN Creative accounts.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <Lock size={18} className="text-[var(--color-yellow)]" />
              4. Payout Methods, UPI Verification &amp; Security
            </h2>
            <p>
              Referrers can configure their direct payout method via UPI ID or Indian Bank Account (IMPS/NEFT). For security:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>All UPI IDs and bank account identifiers are encrypted at rest with industry-standard AES-256-GCM symmetric encryption.</li>
              <li>Payouts are processed directly to the verified UPI ID / bank details on file on a scheduled weekly/bi-weekly cycle following deal approval.</li>
              <li>JSN Creative is not liable for payout failures or misdirected funds resulting from incorrect UPI ID or IFSC information entered by the user.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <AlertTriangle size={18} className="text-[var(--color-danger)]" />
              5. Prohibited Conduct &amp; Fraud Prevention
            </h2>
            <p>
              The following practices are strictly prohibited and will result in immediate disqualification, termination of account, and forfeiture of all accumulated commissions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Submitting fabricated, fake, or non-consensual contact details of third parties.</li>
              <li>Self-referral or collusive schemes intended to artificially generate commissions.</li>
              <li>Spamming unsolicited messages across social media, forums, or SMS without recipient consent.</li>
              <li>Misrepresenting pricing, delivery timelines, or guarantees on behalf of JSN Creative without written authorization.</li>
              <li>Bidding on JSN Creative trademarked terms in search engine marketing (Google Ads / Bing Ads).</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              <Scale size={18} className="text-[var(--color-yellow)]" />
              6. Intellectual Property &amp; Brand Usage
            </h2>
            <p>
              You are granted a limited, revocable, non-exclusive license to use official promotional materials provided in the Referrer Portal for the sole purpose of sharing referrals. You may not alter, distort, or misuse studio logos and venture brand identities.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              7. Termination &amp; Program Changes
            </h2>
            <p>
              JSN Creative reserves the right to modify commission rates, update guidelines, or suspend the Program at any time with prior notice. In the event of program termination, all legitimate, approved commissions earned prior to the date of termination will be honored and disbursed according to regular payout schedules.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 border-t border-[var(--color-border)] pt-6">
            <h2 className="font-[family-name:var(--font-display)] text-base font-bold text-white sm:text-lg">
              8. Contact &amp; Support
            </h2>
            <p>
              For questions regarding commission payouts, terms of service, or enterprise referrals, contact our partner desk at{" "}
              <a href="mailto:jsn.creators@gmail.com" className="font-semibold text-[var(--color-yellow)] hover:underline">
                jsn.creators@gmail.com
              </a>{" "}
              or phone/WhatsApp helpline at{" "}
              <a href="tel:7204351696" className="font-mono font-bold text-white hover:text-[var(--color-yellow)]">
                +91 7204351696
              </a>
              .
            </p>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center">
          <Link
            to="/join"
            className="inline-flex items-center gap-2 rounded-2xl bg-[var(--color-yellow)] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] shadow-md transition active:scale-95 hover:bg-[var(--color-amber)]"
          >
            I Accept &bull; Create Referrer Account
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
