import type { RouletteResult } from "@/lib/types";

/**
 * Fallback-Daten für /api/roulette, solange kein TMDB_READ_TOKEN gesetzt ist.
 * So funktioniert die App auch ganz ohne Account/Token.
 */
export const MOCK_MOVIES: RouletteResult[] = [
  {
    id: 1,
    title: "Der Schein trügt",
    year: 2001,
    runtimeMinutes: 108,
    director: "Platzhalter-Regie",
    overview:
      "Platzhalter-Beschreibung. Ohne TMDB_READ_TOKEN liefert /api/roulette diese Mock-Filme.",
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

export function pickRandomMockMovie(): RouletteResult {
  return MOCK_MOVIES[Math.floor(Math.random() * MOCK_MOVIES.length)];
}
