import {Module} from '@nestjs/common';
import {LoginController} from "./login.controller";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [LoginController],
    providers: [],
    exports: [],
})
export class AuthenticationApiModule {
}

