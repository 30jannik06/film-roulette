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
  // TMDB-Keyword "christmas", ermittelt über https://www.themoviedb.org/keyword/207317-christmas
  { id: "christmas", label: "Christmas", keywordId: 207317 },
  { id: "horror", label: "Horror", genreId: 27 },
  { id: "scifi", label: "Sci-Fi", genreId: 878 },
  { id: "comedy", label: "Komödie", genreId: 35 },
  { id: "thriller", label: "Thriller", genreId: 53 },
  { id: "animation", label: "Animation", genreId: 16 },
];
