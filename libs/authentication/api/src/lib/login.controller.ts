import {Controller, Post, Request, UseGuards} from '@nestjs/common';
import {GhentCdhGuard} from "./auth.guard";
import {User} from "./user";

@Controller()
export class LoginController {
    @UseGuards(GhentCdhGuard)
    @Post('auth/login')
    async login(@User() user: any, @Request() req: any) {
        return user;
    }
}


