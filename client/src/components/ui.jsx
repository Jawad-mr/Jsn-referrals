export function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <p
        className={`mt-2 font-[family-name:var(--font-number)] text-2xl sm:text-3xl font-extrabold tracking-tight font-number ${
          accent ? "text-[var(--color-yellow)]" : "text-white"
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-[var(--color-text-faint)] font-medium">{sub}</p>}
    </div>
  );
}

const statusStyles = {
  new: "bg-[var(--color-border)] text-[var(--color-text-muted)]",
  contacted: "bg-[#3b4a6b]/30 text-[#8fa8e8]",
  converted: "bg-[var(--color-mint)]/15 text-[var(--color-mint)]",
  lost: "bg-[var(--color-danger)]/15 text-[var(--color-danger)]",
  pending: "bg-[var(--color-amber)]/15 text-[var(--color-amber)]",
  approved: "bg-[#8fa8e8]/15 text-[#8fa8e8]",
  paid: "bg-[var(--color-mint)]/15 text-[var(--color-mint)]",
  not_applicable: "bg-[var(--color-border)] text-[var(--color-text-faint)]",
};

export function StatusBadge({ status }) {
  const label = status.replace(/_/g, " ");
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[status] || statusStyles.new}`}>
      {label}
    </span>
  );
}

export function Spinner({ className = "" }) {
  return (
    <div
      className={`h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
