import { CATEGORIES, type CategoryId } from "@/lib/categories";
import type { RouletteFilters } from "@/lib/types";
import type { RouletteMode } from "@/components/ModeSwitch";

export function buildRouletteFilters(
  mode: RouletteMode,
  selectedCategories: CategoryId[],
): RouletteFilters {
  const filters: RouletteFilters = {
    genreIds: [],
    keywordIds: [],
    decade: null,
    maxRuntime: null,
  };

  if (mode === "random") {
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
