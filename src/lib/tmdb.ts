import type { RouletteFilters, RouletteResult } from "@/lib/types";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_MAX_PAGE = 500;

type TmdbDiscoverResponse = {
  total_pages?: number;
  results?: { id: number }[];
};

type TmdbCrewMember = { job: string; name: string };

type TmdbMovieDetails = {
  id: number;
  title: string;
  release_date?: string;
  runtime?: number;
  overview?: string;
  poster_path?: string | null;
  credits?: { crew?: TmdbCrewMember[] };
};

async function tmdbFetch<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`TMDB-Anfrage fehlgeschlagen (${res.status})`);
  }
  return res.json() as Promise<T>;
}

function buildDiscoverParams(filters: RouletteFilters, page: number) {
  const params = new URLSearchParams({
    include_adult: "false",
    sort_by: "popularity.desc",
    page: String(page),
  });
  if (filters.genreIds.length > 0) {
    params.set("with_genres", filters.genreIds.join(","));
  }
  if (filters.keywordIds.length > 0) {
    params.set("with_keywords", filters.keywordIds.join(","));
  }
  if (filters.decade !== null) {
    params.set("primary_release_date.gte", `${filters.decade}-01-01`);
    params.set("primary_release_date.lte", `${filters.decade + 9}-12-31`);
  }
  if (filters.maxRuntime !== null) {
    params.set("with_runtime.lte", String(filters.maxRuntime));
  }
  return params;
}

/** Discovert einen zufälligen Film zu den Filtern: zufällige Seite, zufälliger Treffer darauf. */
export async function discoverRandomMovie(
  filters: RouletteFilters,
  token: string,
): Promise<RouletteResult> {
  const firstPage = await tmdbFetch<TmdbDiscoverResponse>(
    `/discover/movie?${buildDiscoverParams(filters, 1)}`,
    token,
  );

  const totalPages = Math.min(firstPage.total_pages ?? 1, TMDB_MAX_PAGE) || 1;
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  const page =
    randomPage === 1
      ? firstPage
      : await tmdbFetch<TmdbDiscoverResponse>(
          `/discover/movie?${buildDiscoverParams(filters, randomPage)}`,
          token,
        );

  const candidates = page.results ?? [];
  if (candidates.length === 0) {
    throw new Error("Keine Filme für diese Filter gefunden");
  }

  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const details = await tmdbFetch<TmdbMovieDetails>(
    `/movie/${picked.id}?append_to_response=credits`,
    token,
  );

  const director =
    details.credits?.crew?.find((member) => member.job === "Director")
      ?.name ?? "Unbekannt";

  return {
    id: details.id,
    title: details.title,
    year: details.release_date ? Number(details.release_date.slice(0, 4)) : 0,
    runtimeMinutes: details.runtime ?? 0,
    director,
    overview: details.overview || "Keine Beschreibung verfügbar.",
    posterUrl: details.poster_path
      ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
      : null,
    letterboxdUrl: `https://letterboxd.com/tmdb/${details.id}`,
  };
}
