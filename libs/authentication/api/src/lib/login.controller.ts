import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { GhentCdhGuard } from './auth.guard';
import { User } from './user';

@Controller()
export class LoginController {
  @ApiBearerAuth()
  @UseGuards(GhentCdhGuard)
  @Post('auth/login')
  async login(@User() user: any, @Request() req: any) {
    return user;
  }

  @Get('auth/login')
  getLogin() {
    return { test: 'Login abc' };
  }
}
