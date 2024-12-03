import Keycloak from 'keycloak-js';


export class KeycloakAdapter extends Keycloak {
    private readonly keycloak: Keycloak

    private constructor() {
        super({
            // TODO through environment variables
            url: "http://localhost:8080/",
            realm: "mela-realm",
            clientId: "mela-client"
        })

        console.log(import.meta.env)
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
