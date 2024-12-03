import Keycloak from 'keycloak-js';


export class KeycloackAdapter {

    private constructor(private readonly keycloak: Keycloak) {
    }

    private async initKeycloack() {
        try {
            const authenticated = await this.keycloak.init(
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


    static async init(): Promise<KeycloackAdapter> {
        const instance = new KeycloackAdapter(new Keycloak({
            // TODO through environment variables
            url: "http://localhost:8080/",
            realm: "mela-realm",
            clientId: "mela-client"
        }));

        await instance.initKeycloack();
        return instance;
    }


    get token() {
        return this.keycloak.token;
    }

    get userInfo() {
        return this.keycloak.idTokenParsed
    }

    updateToken() {
        return this.keycloak.updateToken(30)
    }

    get isAuthenticated() {
        return this.keycloak.authenticated ?? false;
    }
}
