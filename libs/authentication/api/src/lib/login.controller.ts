import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {GhentCdhGuard} from "./auth.guard";
import {User} from "./user";

@Controller()
export class LoginController {
    @UseGuards(GhentCdhGuard)
    @Post('auth/login')
    async login(@User() user: any, @Request() req: any) {
        return user;
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
