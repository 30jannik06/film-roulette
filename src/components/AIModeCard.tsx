export function AIModeCard() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 opacity-60 sm:p-6">
      <div className="flex items-center gap-2">
        <h3 className="font-heading text-xl tracking-wide text-foreground">
          KI-Modus
        </h3>
        <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-background">
          Phase 2
        </span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Beschreib, worauf du Lust hast, und lass dir einen Film vorschlagen.
      </p>
      <input
        type="text"
        disabled
        placeholder="z. B. „etwas Leichtes für einen Regenabend“"
        className="mt-3 w-full rounded-full border border-border bg-background px-4 py-2 text-sm text-muted placeholder:text-muted disabled:cursor-not-allowed"
      />
    </div>
  );
}
