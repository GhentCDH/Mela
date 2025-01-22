// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { HttpService } from '@nestjs/axios';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';
import type { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

import { Debugger } from '@ghentcdh/tools/logging/frontend';

import { KEYCLOACK } from './auth.const';

export const AUTH_NAME = 'keycloack';

@Injectable()
export class GhentCdhGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    if (authorization) {
      const keycloakHost = this.configService.get(KEYCLOACK.HOST);
      const realmName = this.configService.get(KEYCLOACK.REALM);

      Debugger.log('keycloak: ', keycloakHost, realmName);

      const url = `${keycloakHost}realms/${realmName}/protocol/openid-connect/userinfo`;

      return firstValueFrom(
        this.httpService.get(url, {
          headers: {
            // add the token you received to the userinfo request, sent to keycloak
            Authorization: authorization,
            ' X-Forwarded-Host': 'localhost:8080',
          },
        }),
      )
        .then((response) => {
          Debugger.log(response.status);
          // if the request status isn't "OK", the token is invalid
          if (response.status !== 200) {
            throw new UnauthorizedException();
          }

          // the token is valid pass request onto your next function
          request.user = response.data;

          return true;
        })
        .catch((error) => {
          Debugger.log('an error');
          Debugger.error(error);
          throw new UnauthorizedException();
        });
    }

    throw new UnauthorizedException();
  }
}
