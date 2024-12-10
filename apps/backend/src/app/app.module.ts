import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationApiModule } from '@ghentcdh/authentication/api';
import { HealthApiModule } from '@ghentcdh/tools/health/api';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthenticationApiModule, ConfigModule.forRoot(), HealthApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
