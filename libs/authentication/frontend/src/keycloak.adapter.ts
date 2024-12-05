import Keycloak from 'keycloak-js';


export class KeycloakAdapter extends Keycloak {


    private constructor() {
        const {VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_HOST, VITE_KEYCLOAK_CLIENT_ID} = import.meta.env;

        super({
            url: VITE_KEYCLOAK_HOST,
            realm: VITE_KEYCLOAK_REALM,
            clientId: VITE_KEYCLOAK_CLIENT_ID
        })

    }

    private async initialize() {
        try {
            const authenticated = await this.init(
                {
                    onLoad: 'login-required'
                }
            );
            if (authenticated) {
                console.log('User is authenticated');
            }
            console.log('User is not authenticated');

        } catch (error) {
            console.error('Failed to initialize adapter:', error);
        }
    }


    static async init(): Promise<KeycloakAdapter> {
        const instance = new KeycloakAdapter();

        await instance.initialize();
        return instance;
    }


    get userInfo() {
        return this.idTokenParsed
    }

    updateToken() {
        return this.updateToken(30)
    }

    get isAuthenticated() {
        return this.authenticated ?? false;
    }
}
