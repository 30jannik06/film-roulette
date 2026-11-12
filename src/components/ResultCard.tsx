import Image from "next/image";
import type { RouletteResult } from "@/lib/types";

export function ResultCard({
  result,
  onSpinAgain,
}: {
  result: RouletteResult;
  onSpinAgain: () => void;
}) {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative mx-auto h-72 w-48 shrink-0 overflow-hidden rounded-lg bg-background sm:mx-0">
          {result.posterUrl ? (
            <Image
              src={result.posterUrl}
              alt={result.title}
              fill
              sizes="192px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-muted">
              Kein Poster verfügbar
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="font-heading text-3xl tracking-wide text-foreground sm:text-4xl">
            {result.title}
          </h2>
          <p className="text-sm text-muted">
            {result.year} · {result.runtimeMinutes} Min. · Regie:{" "}
            {result.director}
          </p>
          <p className="text-sm text-foreground">{result.overview}</p>

          <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row">
            <a
              href={result.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-4 py-2 text-center text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Auf Letterboxd öffnen
            </a>
            <button
              type="button"
              onClick={onSpinAgain}
              className="rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Nochmal drehen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
