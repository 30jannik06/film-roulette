import { CATEGORIES, type CategoryId } from "@/lib/categories";
import type { DecadeValue, RatingValue, RuntimeValue } from "@/lib/filterOptions";
import type { RouletteFilters } from "@/lib/types";
import type { RouletteMode } from "@/components/ModeSwitch";

export function buildRouletteFilters({
  mode,
  selectedCategories,
  decade,
  maxRuntime,
  minRating,
}: {
  mode: RouletteMode;
  selectedCategories: CategoryId[];
  decade: DecadeValue;
  maxRuntime: RuntimeValue;
  minRating: RatingValue;
}): RouletteFilters {
  const filters: RouletteFilters = {
    genreIds: [],
    keywordIds: [],
    decade: decade === "any" ? null : Number(decade),
    maxRuntime: maxRuntime === "any" ? null : Number(maxRuntime),
    minRating: minRating === "any" ? null : Number(minRating),
  };

  if (mode !== "category") {
    return filters;
  }

  for (const id of selectedCategories) {
    const category = CATEGORIES.find((entry) => entry.id === id);
    if (!category) continue;
    if (category.genreId !== undefined) filters.genreIds.push(category.genreId);
    if (category.keywordId !== undefined)
      filters.keywordIds.push(category.keywordId);
  }

  return filters;
}
