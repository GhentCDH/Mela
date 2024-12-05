import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthenticationApiModule} from "@ghentcdh/authentication/api";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [AuthenticationApiModule, ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

