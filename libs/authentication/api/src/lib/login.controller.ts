import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {GhentCdhGuard} from "./auth.guard";

@Controller()
export class LoginController {
    @UseGuards(GhentCdhGuard)
    @Post('auth/login')
    async login(@Request() req: any) {
        return req.user;
    }

    @Get('auth/login')
    async getLogin(@Request() req: any) {
        return 'Testje'
    }

    @UseGuards(GhentCdhGuard)
    @Post('auth/logout')
    async logout(@Request() req: any) {
        return req.user;
    }
}
