import { inject } from 'vue';

export const auth_symbol = 'GHENTCDH_AUTHENTICATION';
type Auth = any;

export const useAuthenticate = () => {
  const auth = inject(auth_symbol) as Auth;
  if (!auth) {
    console.warn('No auth provided, authorized calls may not work');
  }

  return {
    isAuthenticated: () => !!auth.user(),
    getUser: () => auth.user(),
    logout: () => auth.logout(),
  };
};

export const mela_env = (window['_env_'] ?? {}) as {
  KEYCLOAK_HOST: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_CLIENT_ID: string;
  VERSION: string;
  ENV: string;
};
