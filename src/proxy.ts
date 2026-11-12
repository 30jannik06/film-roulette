import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js 16 hat "middleware" in "proxy" umbenannt (gleiche Funktionsweise).
 * Das ist nur die grobe, erste Schutzschicht: eine reine Cookie-Existenzprüfung
 * ohne Validierung. Die eigentliche Session-Prüfung passiert serverseitig in
 * /api/roulette und /api/suggest (siehe dort) sowie in jeder Better-Auth-Route.
 */
export function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
};
