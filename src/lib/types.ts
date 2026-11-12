export type RouletteFilters = {
  genreIds: number[];
  keywordIds: number[];
  decade: number | null;
  maxRuntime: number | null;
};

export type RouletteResult = {
  id: number;
  title: string;
  year: number;
  runtimeMinutes: number;
  director: string;
  overview: string;
  posterUrl: string | null;
  letterboxdUrl: string;
};
