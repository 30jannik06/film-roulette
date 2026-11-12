export type CategoryId =
  | "christmas"
  | "action"
  | "adventure"
  | "animation"
  | "comedy"
  | "crime"
  | "documentary"
  | "drama"
  | "family"
  | "fantasy"
  | "history"
  | "horror"
  | "music"
  | "mystery"
  | "romance"
  | "scifi"
  | "thriller"
  | "war"
  | "western";

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
  // TMDB-Genre-IDs: https://developer.themoviedb.org/reference/genre-movie-list
  { id: "action", label: "Action", genreId: 28 },
  { id: "adventure", label: "Abenteuer", genreId: 12 },
  { id: "animation", label: "Animation", genreId: 16 },
  { id: "comedy", label: "Komödie", genreId: 35 },
  { id: "crime", label: "Krimi", genreId: 80 },
  { id: "documentary", label: "Dokumentarfilm", genreId: 99 },
  { id: "drama", label: "Drama", genreId: 18 },
  { id: "family", label: "Familie", genreId: 10751 },
  { id: "fantasy", label: "Fantasy", genreId: 14 },
  { id: "history", label: "Historie", genreId: 36 },
  { id: "horror", label: "Horror", genreId: 27 },
  { id: "music", label: "Musik", genreId: 10402 },
  { id: "mystery", label: "Mystery", genreId: 9648 },
  { id: "romance", label: "Liebesfilm", genreId: 10749 },
  { id: "scifi", label: "Sci-Fi", genreId: 878 },
  { id: "thriller", label: "Thriller", genreId: 53 },
  { id: "war", label: "Kriegsfilm", genreId: 10752 },
  { id: "western", label: "Western", genreId: 37 },
];
