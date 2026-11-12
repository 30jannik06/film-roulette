import { Reel } from "@/components/Reel";

export type ReelValues = {
  category: string;
  decade: string;
  movie: string;
};

export function SlotMachine({
  values,
  spinning,
  onSpin,
}: {
  values: ReelValues;
  spinning: boolean;
  onSpin: () => void;
}) {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Reel label="Kategorie" value={values.category} />
        <Reel label="Jahrzehnt" value={values.decade} />
        <Reel label="Film" value={values.movie} />
      </div>

      <button
        type="button"
        onClick={onSpin}
        disabled={spinning}
        className="font-heading mt-5 w-full rounded-full bg-primary py-3 text-xl tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:mt-6"
      >
        {spinning ? "DREHT..." : "DREHEN"}
      </button>
    </div>
  );
}
