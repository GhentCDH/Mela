import {defineStore} from "pinia";
import {ref} from "vue";

import {KeycloakAdapter} from "./keycloak.adapter";


const AUTH_STORE_NAME = 'GHENT_CDH_AUTH_STORE';


export const useAuthenticationStore = defineStore(AUTH_STORE_NAME, () => {

    const isAuthenticated = ref(false);


    const keycloackAdapter = ref<KeycloakAdapter>();

    KeycloakAdapter.init().then(adapter => {
        isAuthenticated.value = adapter.isAuthenticated;
        keycloackAdapter.value = adapter;

        return adapter;
    })


    const logout = () => {
        console.warn('logout')
    }

    return {
        token: () => keycloackAdapter.value?.token,
        user: () => keycloackAdapter.value?.userInfo,
        isAuthenticated: () => keycloackAdapter.value?.isAuthenticated,
        logout,
        updateToken: () => keycloackAdapter.value?.updateToken()
    };
})
