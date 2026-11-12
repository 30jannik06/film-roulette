export function Reel({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-background sm:h-28">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-0.5 -translate-y-1/2 bg-accent" />
        <span className="font-heading px-2 text-center text-2xl tracking-wide text-foreground sm:text-3xl">
          {value}
        </span>
      </div>
    </div>
  );
}
