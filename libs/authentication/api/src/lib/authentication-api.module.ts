import {Module} from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {LoginController} from "./login.controller";

@Module({
  imports:[ PassportModule,

    // JwtModule.register({
    //   secret:'abc',
    //   signOptions: { expiresIn: '60s' },
    // }),
  ],
  controllers: [LoginController],
  providers: [ AuthService, LocalStrategy],
  exports: [],
})
export class AuthenticationApiModule {}

