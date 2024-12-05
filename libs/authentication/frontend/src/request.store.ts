import {defineStore} from "pinia";
import {useAuthenticationStore} from "./authentication.store";

const AUTH_STORE_NAME = 'GHENT_CDH_HTTP_REQUEST';

// TODO add white list of request
type RequestOptions = {
    skipAuth?: boolean,
    queryParams?: Record<string, any>
}

type Error = {
    status: number, content: any
}

export const useHttpStore = defineStore(AUTH_STORE_NAME, () => {
    const authStore = useAuthenticationStore();


    //try {
    //     await keycloak.updateToken(30);
    // } catch (error) {
    //     console.error('Failed to refresh token:', error);
    // }


    const makeRequest = async (url: string, requestInit: RequestInit,
                               options?: RequestOptions) => {

        const headers: Record<string, string> = {
            ...requestInit.headers ?? {},
            accept: 'application/json',
        } as Record<string, string>

        if (!options?.skipAuth) {
            await authStore.updateToken();
            headers['Authorization'] = `Bearer ${authStore.token()}`
        }

        console.log('url', url)
        const _url = new URL(url, window.location.href)

        console.log(_url.toString())

        if (options?.queryParams) {
            for (const [key, value] of Object.entries(options.queryParams)) {
                _url.searchParams.set(key, value)
            }
        }

        const response = await fetch(_url.toString(), {
            ...requestInit,
            headers
        });

        if (!response.ok) {

            if (!options?.skipAuth) {
                // TODO if response return 400 then redirect to login page
            }
            
            throw new Error({content: response.body, status: response.status} as any)
        }

        console.log(response.body)

        return response.json();

    }


    return {
        get: <T>(url: string, options?: RequestOptions): Promise<T> => makeRequest(url, {method: 'GET',}, options),
        post: <T>(url: string, data: any, options?: RequestOptions): Promise<T> => makeRequest(url, {
            method: 'POST',
            body: JSON.stringify(data)
        }, options),
        patch: <T>(url: string, data: any, options?: RequestOptions): Promise<T> => makeRequest(url, {
            method: 'PATCH',
            body: JSON.stringify(data)
        }, options),
        delete: <T>(url: string, data: any, options?: RequestOptions): Promise<T> => makeRequest(url, {
            method: 'DELETE',
            body: JSON.stringify(data)
        }, options)


    }
});
