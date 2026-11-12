import { Reel } from "@/components/Reel";

export type ReelFinalValues = {
  category: string | null;
  decade: string | null;
  movie: string | null;
};

const CATEGORY_CANDIDATES = [
  "RANDOM",
  "HORROR",
  "SCI-FI",
  "KOMÖDIE",
  "THRILLER",
  "ANIMATION",
  "CHRISTMAS",
];
const DECADE_CANDIDATES = ["1970er", "1980er", "1990er", "2000er", "2010er", "2020er"];
const MOVIE_CANDIDATES = ["FILM", "KINO", "SZENE", "ROLLE", "TAKE", "SPULE"];

export function SlotMachine({
  values,
  spinning,
  spinId,
  onSpin,
}: {
  values: ReelFinalValues;
  spinning: boolean;
  /** Bumped on every spin so each reel remounts with a clean initial state. */
  spinId: number;
  onSpin: () => void;
}) {
  return (
    <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Reel
          key={`category-${spinId}`}
          label="Kategorie"
          finalValue={values.category}
          spinning={spinning}
          candidates={CATEGORY_CANDIDATES}
          stopDelayMs={500}
        />
        <Reel
          key={`decade-${spinId}`}
          label="Jahrzehnt"
          finalValue={values.decade}
          spinning={spinning}
          candidates={DECADE_CANDIDATES}
          stopDelayMs={800}
        />
        <Reel
          key={`movie-${spinId}`}
          label="Film"
          finalValue={values.movie}
          spinning={spinning}
          candidates={MOVIE_CANDIDATES}
          stopDelayMs={1100}
        />
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

export const SLOT_MACHINE_TOTAL_SPIN_MS = 1100;
