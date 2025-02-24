import { TextApiModule } from '@mela/text/api';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationApiModule } from '@ghentcdh/authentication-api';
import { HealthApiModule } from '@ghentcdh/tools-api';

@Module({
  imports: [
    AuthenticationApiModule,
    ConfigModule.forRoot(),
    HealthApiModule,
    TextApiModule,
  ],
})
export class AppModule {}
