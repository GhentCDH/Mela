/**
 * FILEPATH: /Users/jansix/Documents/Projects/stack/frontend/server/routes/auth/[...].ts
 *
 * This file catches all requests to /api/auth/* and passes them to the NuxtAuthHandler.
 */

import { NuxtAuthHandler } from "#auth";

/**
 * Decodes an access token, refresh token or id_token.
 *
 * @param token - The token to decode.
 * @returns The decoded token.
 */
const decode = function (token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

// KeycloakProvider is a custom auth provider that extends the default provider
import KeycloakProvider from "next-auth/providers/keycloak";

console.log("");
console.log("---------------------------------------");
console.log("Nuxt AUTH_ORIGIN", process.env.AUTH_ORIGIN);
console.log("Nuxt NUXT_AUTH_SECRET", process.env.NUXT_AUTH_SECRET);
console.log(
  "Keycloak FRONTEND_KEYCLOAK_CLIENT_ID",
  process.env.FRONTEND_KEYCLOAK_CLIENT_ID,
);
console.log(
  "Keycloak FRONTEND_KEYCLOAK_CLIENT_SECRET",
  process.env.FRONTEND_KEYCLOAK_CLIENT_SECRET,
);
console.log(
  "Keycloak FRONTEND_KEYCLOAK_ISSUER",
  process.env.FRONTEND_KEYCLOAK_ISSUER,
);
console.log("---------------------------------------");
console.log("");

/**
 * Checks if a token is expired.
 *
 * @param token - The token which include token.exp, a timestamp in UNIX epoch seconds
 * @returns True if the access token is expired, false otherwise.
 */
const token_is_expired = function (token: { exp: number }) {
  const current_time = Math.round(Date.now() / 1000);
  const token_exp_time = token.exp;
  return token_exp_time < current_time;
};

/**
 * Refreshes tokens using the refresh token via the OpenID connect backend.
 *
 * @param refreshToken - The **encoded** refresh token.
 * @returns The refreshed tokens, a new refresh token, access token and id token.
 * Throws an Error if the request fails.
 */
const refresh_access_token = async function (refreshToken: string) {
  const res = await fetch(
    process.env.FRONTEND_KEYCLOAK_ISSUER + "/protocol/openid-connect/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        client_id: process.env.FRONTEND_KEYCLOAK_CLIENT_ID,
        refresh_token: refreshToken,
      } as Record<string, string>),
    },
  );

  if (!res.ok) {
    throw new Error(
      "Failed to refresh token " + JSON.stringify(decode(refreshToken)),
    );
  }

  const refreshedTokens = await res.json();
  //console.log("Refreshed Tokens:\t", refreshedTokens);

  return refreshedTokens;
};

export default NuxtAuthHandler({
  secret: process.env.NUXT_AUTH_SECRET,

  session: {
    strategy: "jwt", // Use JSON Web Tokens (JWT) for session management
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR.
    // May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.FRONTEND_KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.FRONTEND_KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.FRONTEND_KEYCLOAK_ISSUER,
      authorization: { params: { scope: "openid email roles" } },
    }),
  ],
  callbacks: {
    /**
     * Callback function for JWT.
     *
     * @param token - The JWT token.
     * @param user - The user object.
     * @param account - The account object.
     * @param profile - The profile object.
     * @returns The modified token.
     */
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;

        const decodedToken = decode(account.access_token as string);
        const sub = decodedToken.sub;
        const roles = decodedToken.realm_access.roles;
        const refreshToken = account.refresh_token;

        token.user = {
          ...user,
          sub,
          roles,
        };
        token.refreshToken = refreshToken;
      }

      return token;
    },

    /**
     * Callback function for session.
     *
     * @param session - The session object.
     * @param token - The JWT token.
     * @param user - The user object.
     * @returns The modified session object.
     */
    async session({ session, token, user }) {
      if (token.accessToken) {
        const decoded_access_token = decode(token.accessToken as string);
        if (token_is_expired(decoded_access_token)) {
          console.log(
            "Access Token is expired, requesting new access and refresh tokens.",
          );

          const new_tokens = await refresh_access_token(
            token.refreshToken as string,
          );
          token.accessToken = new_tokens.access_token;
          token.refreshToken = new_tokens.refresh_token;
        }
      }

      console.log("Session callback called.");

      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
});
