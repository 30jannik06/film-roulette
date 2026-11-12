# Film Roulette

Persönlicher Film-Slot-Automat: Walzen für Kategorie/Jahrzehnt/Film, gespeist aus TMDB,
Zugriff nur für einen einzelnen Discord-Account.

Stack: Next.js 16 (App Router, TypeScript), Tailwind v4, Framer Motion, Better Auth
(stateless, kein DB-Server nötig).

## Setup (lokal)

1. Abhängigkeiten installieren:

   ```bash
   npm install
   ```

2. `.env.example` nach `.env.local` kopieren und ausfüllen (siehe unten).

3. Dev-Server starten:

   ```bash
   npm run dev
   ```

   Läuft unter [http://localhost:3000](http://localhost:3000). Ohne `TMDB_READ_TOKEN`
   liefert `/api/roulette` Mock-Filme – die App funktioniert also auch ohne TMDB-Account
   zum Ausprobieren des UI/der Spin-Logik. Ohne gültige Discord-Zugangsdaten leitet
   `/login` zu Discord weiter, der Callback schlägt dann dort fehl (erwartet).

### Umgebungsvariablen

| Variable | Pflicht | Zweck |
| --- | --- | --- |
| `TMDB_READ_TOKEN` | nein (sonst Mock-Daten) | TMDB "API Read Access Token" (v4) |
| `BETTER_AUTH_SECRET` | ja | Mind. 32 Zeichen, z. B. `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | ja | Basis-URL der App (lokal `http://localhost:3000`) |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | ja | aus dem Discord Developer Portal |
| `ALLOWED_DISCORD_ID` | ja | Deine Discord-User-ID; jeder andere Login wird abgelehnt |
| `AI_PROVIDER`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` | nein | Platzhalter für Phase 2 (KI-Modus), aktuell ohne Funktion |

### TMDB-Token holen

1. Account auf [themoviedb.org](https://www.themoviedb.org) anlegen.
2. Einstellungen → API → "API Read Access Token (v4 auth)" kopieren.
3. Als `TMDB_READ_TOKEN` eintragen.

### Discord Developer Portal einrichten

1. [discord.com/developers/applications](https://discord.com/developers/applications) →
   "New Application".
2. Unter **OAuth2 → General**: Client ID und Client Secret kopieren
   (→ `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET`).
3. Unter **OAuth2 → General → Redirects** folgende Redirect-URIs eintragen:
   - Lokal: `http://localhost:3000/api/auth/callback/discord`
   - Produktion (Vercel): `https://<deine-domain>/api/auth/callback/discord`
     (bei beiden Umgebungen eintragen, nicht nur bei der aktuell genutzten)
4. Eigene Discord-User-ID ermitteln: Discord-Einstellungen → Erweitert →
   Entwicklermodus aktivieren, dann Rechtsklick auf den eigenen Namen →
   "ID kopieren" → als `ALLOWED_DISCORD_ID` eintragen.

Jeder Login-Versuch mit einer anderen Discord-ID wird serverseitig abgelehnt
(`user.validateUserInfo` in `src/lib/auth.ts`), nicht nur in der UI.

## Deploy (Vercel)

1. Repo zu Vercel verbinden (oder `vercel` CLI nutzen).
2. Alle Variablen aus `.env.example` in den Vercel-Projekteinstellungen unter
   **Settings → Environment Variables** eintragen (für Production und Preview).
   `BETTER_AUTH_URL` dabei auf die echte Vercel-Domain setzen.
3. Im Discord Developer Portal die Produktions-Redirect-URI ergänzen (siehe oben).
4. Deploy auslösen (Push auf den verbundenen Branch oder `vercel --prod`).

### Rollback

Jeder Schritt dieses Projekts ist ein eigener Commit. Einen Schritt zurückrollen:

```bash
git log --oneline
git revert <commit-hash>
git push
```

Das erzeugt einen neuen Commit, der die Änderung rückgängig macht, und löst auf
Vercel automatisch ein neues Deployment aus. Alternativ in Vercel unter
**Deployments** ein älteres Deployment auswählen und "Promote to Production".

## Umfang / Stand

Enthalten: Grundlayout, Slot-Maschine mit deterministischer Spin-Logik,
`/api/roulette` (TMDB-Discover + Mock-Fallback), Christmas-Kategorie über ein
TMDB-Keyword, Discord-Login via Better Auth (stateless, auf eine ID beschränkt),
`/api/suggest` als 501-Platzhalter für Phase 2.

Nicht enthalten (bewusst außerhalb dieses Durchlaufs): Letterboxd-CSV-Import,
echter KI-Aufruf.
