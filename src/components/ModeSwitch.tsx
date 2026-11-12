export type RouletteMode = "random" | "category";

export function ModeSwitch({
  mode,
  onChange,
}: {
  mode: RouletteMode;
  onChange: (mode: RouletteMode) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-border bg-card p-1">
      {(
        [
          { value: "random", label: "Full Random" },
          { value: "category", label: "Kategorie wählen" },
        ] as const
      ).map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            mode === option.value
              ? "bg-primary text-primary-foreground"
              : "text-muted hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
