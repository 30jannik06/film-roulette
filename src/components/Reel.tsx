"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Reel({
  label,
  finalValue,
  spinning,
  candidates,
  stopDelayMs,
}: {
  label: string;
  /** The determined result, once known. Reel keeps cycling until this is set. */
  finalValue: string | null;
  spinning: boolean;
  candidates: string[];
  /** How long this reel keeps cycling after `finalValue` becomes known. */
  stopDelayMs: number;
}) {
  const [display, setDisplay] = useState(finalValue ?? "?");
  const [settled, setSettled] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!spinning) {
      if (cycleRef.current) clearInterval(cycleRef.current);
      return;
    }

    let index = 0;
    cycleRef.current = setInterval(() => {
      index = (index + 1) % candidates.length;
      setDisplay(candidates[index]);
    }, 90);

    return () => {
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  useEffect(() => {
    if (!spinning || finalValue === null) return;

    const timeout = setTimeout(() => {
      if (cycleRef.current) clearInterval(cycleRef.current);
      setDisplay(finalValue);
      setSettled(true);
    }, stopDelayMs);

    return () => clearTimeout(timeout);
  }, [spinning, finalValue, stopDelayMs]);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      <div
        className={`relative flex h-24 w-full items-center justify-center overflow-hidden rounded-lg border bg-background transition-colors sm:h-28 ${
          settled ? "border-primary" : "border-border"
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-0.5 -translate-y-1/2 bg-accent" />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={display}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1, scale: settled ? [1.08, 1] : 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: settled ? 0.25 : 0.1 }}
            className="font-heading px-2 text-center text-2xl tracking-wide text-foreground sm:text-3xl"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
