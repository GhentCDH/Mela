import {HttpModule} from "@nestjs/axios";
import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TerminusModule} from "@nestjs/terminus";

import {HealthController} from "./health.controller";


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
