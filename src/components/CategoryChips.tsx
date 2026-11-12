import { CATEGORIES, type CategoryId } from "@/lib/categories";

export function CategoryChips({
  selected,
  onToggle,
}: {
  selected: CategoryId[];
  onToggle: (id: CategoryId) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {CATEGORIES.map((category) => {
        const isActive = selected.includes(category.id);
        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onToggle(category.id)}
            aria-pressed={isActive}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted hover:border-primary hover:text-foreground"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
