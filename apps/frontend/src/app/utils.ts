import { inject } from 'vue';

export const auth_symbol = 'GHENTCDH_AUTHENTICATION';
type Auth = any;

export const useAuthenticate = () => {
  const auth = inject(auth_symbol) as Auth;
  if (!auth) {
    console.warn('No auth provided, authorized calls may not work');
  }

  console.log(auth);

  return {
    isAuthenticated: () => !!auth.user(),
    getUser: () => auth.user(),
  };
};
