export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="font-heading text-2xl tracking-wide text-primary sm:text-3xl">
          FILM ROULETTE
        </span>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted sm:text-sm">
            Letterboxd nicht verbunden
          </span>

          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary sm:text-sm"
          >
            CSV hochladen
          </button>

          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted sm:text-sm">
            Nicht angemeldet
          </span>
        </div>
      </div>
    </header>
  );
}
