"use client";

import { useState } from "react";
import { AIModeCard } from "@/components/AIModeCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModeSwitch, type RouletteMode } from "@/components/ModeSwitch";
import { ResultCard } from "@/components/ResultCard";
import {
  SlotMachine,
  SLOT_MACHINE_TOTAL_SPIN_MS,
  type ReelFinalValues,
} from "@/components/SlotMachine";
import { Toggle } from "@/components/Toggle";
import { buildRouletteFilters } from "@/lib/buildFilters";
import { CATEGORIES, type CategoryId } from "@/lib/categories";
import { getDecadeLabel } from "@/lib/decade";
import { fetchRouletteResult } from "@/lib/mockRoulette";
import type { RouletteResult } from "@/lib/types";

const EMPTY_REEL_VALUES: ReelFinalValues = {
  category: null,
  decade: null,
  movie: null,
};

export default function Home() {
  const [mode, setMode] = useState<RouletteMode>("random");
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    [],
  );
  const [excludeWatched, setExcludeWatched] = useState(false);
  const [watchlistOnly, setWatchlistOnly] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RouletteResult | null>(null);
  const [reelValues, setReelValues] =
    useState<ReelFinalValues>(EMPTY_REEL_VALUES);
  const [spinId, setSpinId] = useState(0);

  function toggleCategory(id: CategoryId) {
    setSelectedCategories((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id],
    );
  }

  async function handleSpin() {
    setSpinning(true);
    setResult(null);
    setReelValues(EMPTY_REEL_VALUES);
    setSpinId((id) => id + 1);

    const filters = buildRouletteFilters(mode, selectedCategories);
    // Das Ergebnis steht fest, BEVOR die Walzen gezielt darauf animiert werden.
    const nextResult = await fetchRouletteResult(filters);

    const categoryLabel =
      mode === "category" && selectedCategories.length > 0
        ? CATEGORIES.find((c) => c.id === selectedCategories[0])?.label ??
          "Random"
        : "Random";

    setReelValues({
      category: categoryLabel.toUpperCase(),
      decade: getDecadeLabel(nextResult.year),
      movie: nextResult.title.toUpperCase(),
    });

    window.setTimeout(() => {
      setResult(nextResult);
      setSpinning(false);
    }, SLOT_MACHINE_TOTAL_SPIN_MS);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-4 py-10 sm:px-6">
        <ModeSwitch mode={mode} onChange={setMode} />

        {mode === "category" && (
          <CategoryChips
            selected={selectedCategories}
            onToggle={toggleCategory}
          />
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Toggle
            label="Gesehene ausschließen"
            checked={excludeWatched}
            onChange={setExcludeWatched}
          />
          <Toggle
            label="Nur aus meiner Watchlist"
            checked={watchlistOnly}
            onChange={setWatchlistOnly}
          />
        </div>

        <SlotMachine
          values={reelValues}
          spinning={spinning}
          spinId={spinId}
          onSpin={handleSpin}
        />

        {result && <ResultCard result={result} onSpinAgain={handleSpin} />}

        <AIModeCard />
      </main>

      <Footer />
    </div>
  );
}
