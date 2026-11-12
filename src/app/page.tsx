import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-4 py-12 sm:px-6">
        <p className="font-heading text-4xl text-foreground sm:text-5xl">
          Die Walzen kommen als Nächstes
        </p>
        <p className="max-w-md text-center text-sm text-muted">
          Spielautomat, Modus-Umschalter und Ergebnis-Karte folgen im nächsten
          Schritt.
        </p>
      </main>

      <Footer />
    </div>
  );
}
