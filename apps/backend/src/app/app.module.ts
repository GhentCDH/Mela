import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthenticationApiModule} from "@ghentcdh/authentication/api";
import {ConfigModule} from "@nestjs/config";
import {HealthApiModule} from "@ghentcdh/tools/health/api";

@Module({
    imports: [AuthenticationApiModule, ConfigModule.forRoot(), HealthApiModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

