"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function Header() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="font-heading text-2xl tracking-wide text-primary sm:text-3xl">
          FILM ROULETTE
        </span>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted sm:text-sm">
            Letterboxd nicht verbunden
          </span>

          <button
            type="button"
            className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary sm:text-sm"
          >
            CSV hochladen
          </button>

          {session ? (
            <>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted sm:text-sm">
                Angemeldet als {session.user.name}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-accent hover:text-accent sm:text-sm"
              >
                Abmelden
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary sm:text-sm"
            >
              Anmelden
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
