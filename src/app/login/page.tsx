"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function LoginError() {
  const params = useSearchParams();
  if (!params.get("error")) return null;

  return (
    <p className="mt-4 text-sm text-accent">
      Anmeldung fehlgeschlagen: Dieser Discord-Account ist nicht freigeschaltet.
    </p>
  );
}

export default function LoginPage() {
  const [pending, setPending] = useState(false);

  async function handleDiscordSignIn() {
    setPending(true);
    await authClient.signIn.social({
      provider: "discord",
      callbackURL: "/",
    });
  }

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <span className="font-heading text-4xl tracking-wide text-primary sm:text-5xl">
        FILM ROULETTE
      </span>

      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 text-center">
        <h1 className="font-heading text-2xl tracking-wide text-foreground">
          Anmelden
        </h1>
        <p className="mt-2 text-sm text-muted">
          Dieser Automat ist privat – nur für einen einzelnen Discord-Account
          freigeschaltet.
        </p>

        <button
          type="button"
          onClick={handleDiscordSignIn}
          disabled={pending}
          className="font-heading mt-6 w-full rounded-full bg-primary py-3 text-lg tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "WEITERLEITUNG..." : "MIT DISCORD ANMELDEN"}
        </button>

        <Suspense fallback={null}>
          <LoginError />
        </Suspense>
      </div>
    </div>
  );
}
