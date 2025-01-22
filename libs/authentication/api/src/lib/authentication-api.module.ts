import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoginController } from './login.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [LoginController],
  providers: [],
  exports: [],
})
export class AuthenticationApiModule {}
