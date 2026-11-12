"use client";

import { useState } from "react";
import { AIModeCard } from "@/components/AIModeCard";
import { CategoryChips } from "@/components/CategoryChips";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ModeSwitch, type RouletteMode } from "@/components/ModeSwitch";
import { ResultCard } from "@/components/ResultCard";
import { SlotMachine } from "@/components/SlotMachine";
import { Toggle } from "@/components/Toggle";
import type { CategoryId } from "@/lib/categories";
import type { RouletteResult } from "@/lib/types";

const MOCK_RESULT: RouletteResult = {
  id: 1,
  title: "Der Schein trügt",
  year: 2001,
  runtimeMinutes: 108,
  director: "Platzhalter-Regie",
  overview:
    "Platzhalter-Beschreibung. Sobald die API angebunden ist, steht hier die echte Filmbeschreibung.",
  posterUrl: null,
  letterboxdUrl: "https://letterboxd.com",
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

  function toggleCategory(id: CategoryId) {
    setSelectedCategories((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id],
    );
  }

  function handleSpin() {
    setSpinning(true);
    setResult(null);
    window.setTimeout(() => {
      setSpinning(false);
      setResult(MOCK_RESULT);
    }, 600);
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
          values={{ category: "?", decade: "?", movie: "?" }}
          spinning={spinning}
          onSpin={handleSpin}
        />

        {result && <ResultCard result={result} onSpinAgain={handleSpin} />}

        <AIModeCard />
      </main>

      <Footer />
    </div>
  );
}
