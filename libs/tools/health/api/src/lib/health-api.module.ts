import {Module} from '@nestjs/common';
import {TerminusModule} from "@nestjs/terminus";
import {HealthController} from "./health.controller";
import {HttpModule} from "@nestjs/axios";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [TerminusModule,
        HttpModule,
        ConfigModule
        // PrismaModule
    ],
    controllers: [HealthController],
    providers: [],
    exports: [],
})
export class HealthApiModule {
}
