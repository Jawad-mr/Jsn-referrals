import { Link } from "react-router-dom";
import { AtSign, Share2, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Logo size="md" showTag={false} />
            <p className="mt-3 max-w-xs text-sm text-[var(--color-text-muted)]">
              Web, app, and AI studio. This referral program is how we grow with the people who already trust us.
            </p>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-text)]">Program</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-text-muted)]">
              <li><a href="/#how-it-works" className="hover:text-[var(--color-text)]">How it works</a></li>
              <li><a href="/#earnings" className="hover:text-[var(--color-text)]">Earnings</a></li>
              <li><Link to="/join" className="hover:text-[var(--color-text)]">Join the program</Link></li>
              <li><a href="/#faq" className="hover:text-[var(--color-text)]">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-text)]">Jsn Creative</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--color-text-muted)]">
              <li><a href="https://www.jsncreative.studio/" target="_blank" rel="noreferrer" className="hover:text-[var(--color-text)]">Main studio site</a></li>
              <li><Link to="/login" className="hover:text-[var(--color-text)]">Referrer sign in</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-text)]">Get in touch</h4>
            <div className="mt-4 flex gap-3">
              <a href="mailto:hello@jsncreative.studio" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]">
                <Mail size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]">
                <AtSign size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)]">
                <Share2 size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jsn Creative. All rights reserved.</p>
          <p>Commissions are paid on approved, completed projects only.</p>
        </div>
      </div>
    </footer>
  );
}
