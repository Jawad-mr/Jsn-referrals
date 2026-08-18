import Logo from "./Logo";

export default function BootScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[var(--color-ink)] px-6 text-center">
      <Logo size="lg" tagText="Refer" />
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-yellow)] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-yellow)] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-yellow)]" />
      </div>
      <p className="max-w-xs text-sm text-[var(--color-text-muted)]">
        Just a moment — waking things up. First load can take up to 30 seconds.
      </p>
    </div>
  );
}
