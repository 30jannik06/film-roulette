import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { pickRandomMockMovie } from "@/lib/mockRoulette";
import { discoverRandomMovie } from "@/lib/tmdb";
import type { RouletteFilters } from "@/lib/types";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const filters = (await request.json()) as RouletteFilters;

  const token = process.env.TMDB_READ_TOKEN;
  if (!token) {
    return NextResponse.json(pickRandomMockMovie());
  }

  try {
    const result = await discoverRandomMovie(filters, token);
    return NextResponse.json(result);
  } catch (error) {
    console.error("TMDB-Anfrage fehlgeschlagen", error);
    return NextResponse.json(
      { error: "Konnte keinen Film ermitteln." },
      { status: 502 },
    );
  }
}
