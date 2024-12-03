import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {firstValueFrom, Observable} from "rxjs";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

export const AUTH_NAME = 'keycloack';

@Injectable()
export class GhentCdhGuard implements CanActivate {
    constructor(private readonly httpService: HttpService,
                private readonly configService: ConfigService) {
    }


    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        if (authorization) {
            const keycloakHost = this.configService.get('KEYCLOAK_HOST')
            const realmName = this.configService.get('KEYCLOAK_REALM')

            const keycloakHost_ = "http://localhost:8080/"

            console.log(keycloakHost_)
            console.log(keycloakHost)
            console.log(realmName)
            console.log('http://localhost:8080/realms/mela-realm/protocol/openid-connect/userinfo')
            const url = `${keycloakHost}realms/${realmName}/protocol/openid-connect/userinfo`
            console.log(url)
            return firstValueFrom(this.httpService.get(url, {
                headers: {
                    // add the token you received to the userinfo request, sent to keycloak
                    Authorization: authorization,
                },
            })).then((response) => {
                // if the request status isn't "OK", the token is invalid
                if (response.status !== 200) {
                    throw new UnauthorizedException()
                }

                // the token is valid pass request onto your next function
                request.user = response.data;

                return true
            }).catch((error) => {
                console.log('error', error)
                throw new UnauthorizedException()
            });
        }


        throw new UnauthorizedException()


    }
}

