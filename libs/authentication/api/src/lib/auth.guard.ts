import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {firstValueFrom, Observable} from "rxjs";
import {HttpService} from "@nestjs/axios";

export const AUTH_NAME = 'keycloack';

const keycloakHost = "http://localhost:8080/"
const realmName = "mela-realm";

@Injectable()
export class GhentCdhGuard implements CanActivate {
    constructor(private readonly httpService: HttpService) {
    }


    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const authorization = request.headers.authorization;

        if (authorization) {


            return firstValueFrom(this.httpService.get(`${keycloakHost}realms/${realmName}/protocol/openid-connect/userinfo`, {
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

