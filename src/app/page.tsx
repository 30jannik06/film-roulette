"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RouletteApp } from "@/components/RouletteApp";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } =
    authClient.useSession();

  // Die Proxy-Prüfung (middleware) schaut nur, ob irgendein Session-Cookie
  // existiert, nicht ob es gültig ist. Ist die Session ungültig/abgelaufen,
  // landen wir sonst mit kaputter Seite hier statt auf /login.
  useEffect(() => {
    if (!sessionPending && !session) {
      router.replace("/login");
    }
  }, [sessionPending, session, router]);

  if (sessionPending || !session) {
    return <div className="min-h-full flex-1 bg-background" />;
  }

  return <RouletteApp />;
}
