import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * KI-Vorbereitung ohne Funktion: liefert erst nach erfolgreicher
 * Session-Prüfung einen 501, bis der echte KI-Aufruf in Phase 2 kommt.
 */
export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  return NextResponse.json(
    {
      error: "not_implemented",
      message: "Der KI-Modus kommt erst in Phase 2.",
    },
    { status: 501 },
  );
}
