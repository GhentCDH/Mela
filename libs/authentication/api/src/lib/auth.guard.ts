import {Injectable} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

export const AUTH_NAME = 'keycloack';

@Injectable()
export class GhentCdhGuard extends AuthGuard(AUTH_NAME) {}

