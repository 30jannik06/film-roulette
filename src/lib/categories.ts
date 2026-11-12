export type CategoryId =
  | "christmas"
  | "horror"
  | "scifi"
  | "comedy"
  | "thriller"
  | "animation";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "christmas", label: "Christmas" },
  { id: "horror", label: "Horror" },
  { id: "scifi", label: "Sci-Fi" },
  { id: "comedy", label: "Komödie" },
  { id: "thriller", label: "Thriller" },
  { id: "animation", label: "Animation" },
];
