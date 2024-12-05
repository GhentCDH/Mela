import {createParamDecorator, ExecutionContext, SetMetadata} from '@nestjs/common';


export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
});
