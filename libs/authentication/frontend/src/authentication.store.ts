import { defineStore } from 'pinia';
import { ref, shallowRef, watch } from 'vue';

import { KeycloakAdapter } from './keycloak.adapter';

const AUTH_STORE_NAME = 'GHENT_CDH_AUTH_STORE';

export const useAuthenticationStore = defineStore(AUTH_STORE_NAME, () => {
  const isAuthenticated = shallowRef(false);

  const keycloackAdapter = ref<KeycloakAdapter>();

  // create a promise initeDone
  const initDone = ref(false);

  KeycloakAdapter.init().then((adapter) => {
    isAuthenticated.value = adapter.isAuthenticated;
    keycloackAdapter.value = adapter;
    initDone.value = true;
    return adapter;
  });

  const logout = () => {
    console.warn('logout');
  };

  return {
    token: () => keycloackAdapter.value?.token,
    user: () => keycloackAdapter.value?.userInfo,
    isAuthenticated: () => keycloackAdapter.value?.isAuthenticated,
    logout,
    updateToken: async () => {
      if (!initDone.value) {
        await new Promise<void>((resolve) => {
          const unwatch = watch(initDone, (newValue) => {
            if (newValue) {
              unwatch();
              resolve();
            }
          });
        });
      }
      return keycloackAdapter.value?.updateToken();
    },
  };
});
