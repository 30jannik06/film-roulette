import type { RouletteFilters, RouletteResult } from "@/lib/types";

export async function fetchRouletteResult(
  filters: RouletteFilters,
): Promise<RouletteResult> {
  const res = await fetch("/api/roulette", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  if (!res.ok) {
    throw new Error("Drehen fehlgeschlagen. Bitte erneut versuchen.");
  }

  return res.json() as Promise<RouletteResult>;
}
