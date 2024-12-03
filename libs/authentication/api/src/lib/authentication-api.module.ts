import {Module} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {LoginController} from "./login.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule
    ],
    controllers: [LoginController],
    providers: [AuthService, LocalStrategy],
    exports: [],
})
export class AuthenticationApiModule {
}

