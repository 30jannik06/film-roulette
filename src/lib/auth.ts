import { betterAuth } from "better-auth";

/**
 * Stateless Setup: keine `database`-Option, Better Auth hält Sessions
 * ausschließlich in einem signierten/verschlüsselten Cookie
 * (siehe Better-Auth-Doku "Stateless Session Management").
 */
export const auth = betterAuth({
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  user: {
    // Läuft bei jedem Discord-Login (auch im Stateless-Modus) und lehnt
    // jeden Login ab, der nicht von ALLOWED_DISCORD_ID kommt – bevor
    // überhaupt eine Session ausgestellt wird.
    validateUserInfo: ({ source }) => {
      if (source.oauth?.providerId !== "discord") return;

      const profile = source.oauth.profile as { id?: string } | undefined;
      if (profile?.id !== process.env.ALLOWED_DISCORD_ID) {
        return {
          error: "not_allowed",
          errorDescription: "Dieser Discord-Account ist nicht freigeschaltet.",
        };
      }
    },
  },
});
