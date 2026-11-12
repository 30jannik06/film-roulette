export type CategoryId =
  | "christmas"
  | "horror"
  | "scifi"
  | "comedy"
  | "thriller"
  | "animation";

type Category = {
  id: CategoryId;
  label: string;
  /** TMDB genre id, see https://developer.themoviedb.org/reference/genre-movie-list */
  genreId?: number;
  /** TMDB keyword id, used instead of a genre (e.g. "Christmas" has no genre). */
  keywordId?: number;
};

export const CATEGORIES: Category[] = [
  // Keyword id filled in once determined via TMDB /search/keyword.
  { id: "christmas", label: "Christmas" },
  { id: "horror", label: "Horror", genreId: 27 },
  { id: "scifi", label: "Sci-Fi", genreId: 878 },
  { id: "comedy", label: "Komödie", genreId: 35 },
  { id: "thriller", label: "Thriller", genreId: 53 },
  { id: "animation", label: "Animation", genreId: 16 },
];
