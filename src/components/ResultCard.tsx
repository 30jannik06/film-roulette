"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { RouletteResult } from "@/lib/types";

export function ResultCard({
  result,
  onSpinAgain,
}: {
  result: RouletteResult;
  onSpinAgain: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full rounded-xl border border-border bg-card p-4 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row">
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

        <div className="flex flex-1 flex-col gap-3">
          <div className="h-1 w-10 rounded-full bg-primary" />
          <h2 className="font-heading text-3xl leading-none tracking-wide text-foreground sm:text-4xl">
            {result.title}
          </h2>

          <div className="flex flex-wrap gap-2 text-xs text-muted sm:text-sm">
            <span className="rounded-full border border-border px-2.5 py-1">
              {result.year}
            </span>
            <span className="rounded-full border border-border px-2.5 py-1">
              {result.runtimeMinutes} Min.
            </span>
            <span className="rounded-full border border-border px-2.5 py-1">
              Regie: {result.director}
            </span>
          </div>

          <p className="text-sm text-foreground/90">{result.overview}</p>

          <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row">
            <a
              href={result.letterboxdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-center text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Auf Letterboxd öffnen
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  d="M4 12 12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <motion.button
              type="button"
              onClick={onSpinAgain}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
            >
              Nochmal drehen
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  d="M13.5 8a5.5 5.5 0 1 1-1.7-3.98M13.5 2v3.2h-3.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
