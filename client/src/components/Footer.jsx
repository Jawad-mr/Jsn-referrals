import { Link } from "react-router-dom";
import { AtSign, Share2, Mail, Phone, ExternalLink } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--color-border)] bg-[var(--color-surface)] pb-10 pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" showTag={false} />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-[var(--color-text-muted)]">
              Web, app, and AI studio. This referral program is how we grow with the people who already trust us.
            </p>
          </div>

          {/* Program Links */}
          <div className="col-span-1">
            <h4 className="font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Program</h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--color-text-muted)]">
              <li><Link to="/products-services" className="text-[var(--color-yellow)] hover:underline font-semibold">Products &amp; Services</Link></li>
              <li><a href="/#how-it-works" className="hover:text-white transition">How it works</a></li>
              <li><a href="/#earnings" className="hover:text-white transition">Earnings</a></li>
              <li><Link to="/join" className="hover:text-white transition">Join program</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms &amp; Policies</Link></li>
              <li><Link to="/dashboard/support" className="hover:text-white transition">Partner Desk</Link></li>
            </ul>
          </div>

          {/* Studio Links */}
          <div className="col-span-1">
            <h4 className="font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Studio</h4>
            <ul className="mt-3 space-y-2 text-xs text-[var(--color-text-muted)]">
              <li>
                <a href="https://www.jsncreative.studio/" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-white transition">
                  Main studio <ExternalLink size={11} />
                </a>
              </li>
              <li><Link to="/login" className="hover:text-white transition">Referrer Login</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Privacy Terms</Link></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold uppercase tracking-wider text-white">Get in touch</h4>
            <div className="mt-3 space-y-1 text-xs">
              <p className="text-[var(--color-text-muted)]">
                Helpline: <a href="tel:7204351696" className="font-mono font-bold text-white hover:text-[var(--color-yellow)]">+91 7204351696</a>
              </p>
              <p className="text-[var(--color-text-muted)] truncate">
                Email: <a href="mailto:jsn.creators@gmail.com" className="text-[var(--color-yellow)] hover:underline truncate">jsn.creators@gmail.com</a>
              </p>
            </div>

            <div className="mt-3 flex gap-2.5">
              <a href="mailto:jsn.creators@gmail.com" aria-label="Email" className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] bg-[var(--color-ink)]">
                <Mail size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] bg-[var(--color-ink)]">
                <AtSign size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition hover:border-[var(--color-yellow)] hover:text-[var(--color-yellow)] bg-[var(--color-ink)]">
                <Share2 size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--color-border)] pt-5 text-[11px] text-[var(--color-text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} JSN Creative. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link to="/terms" className="hover:text-[var(--color-yellow)] transition font-medium">Terms of Service</Link>
            <span>&bull;</span>
            <p>Commissions disbursed upon client project completion.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}


