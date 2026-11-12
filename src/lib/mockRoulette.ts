import type { RouletteFilters, RouletteResult } from "@/lib/types";

const MOCK_MOVIES: RouletteResult[] = [
  {
    id: 1,
    title: "Der Schein trügt",
    year: 2001,
    runtimeMinutes: 108,
    director: "Platzhalter-Regie",
    overview:
      "Platzhalter-Beschreibung. Sobald die API angebunden ist, steht hier die echte Filmbeschreibung.",
    posterUrl: null,
    letterboxdUrl: "https://letterboxd.com",
  },
  {
    id: 2,
    title: "Mitternachtsrolle",
    year: 1994,
    runtimeMinutes: 96,
    director: "Platzhalter-Regie",
    overview: "Noch ein Platzhalter-Film für die Entwicklung der Walzen.",
    posterUrl: null,
    letterboxdUrl: "https://letterboxd.com",
  },
  {
    id: 3,
    title: "Letzte Vorstellung",
    year: 2016,
    runtimeMinutes: 121,
    director: "Platzhalter-Regie",
    overview: "Dritter Platzhalter-Film, nur zum Testen der Spin-Logik.",
    posterUrl: null,
    letterboxdUrl: "https://letterboxd.com",
  },
];

/** Simulierte Netzwerklatenz, damit sich das Drehen auch ohne echte API richtig anfühlt. */
export async function fetchRouletteResult(
  filters: RouletteFilters,
): Promise<RouletteResult> {
  void filters; // berücksichtigt erst die echte API in /api/roulette
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_MOVIES[Math.floor(Math.random() * MOCK_MOVIES.length)];
}
