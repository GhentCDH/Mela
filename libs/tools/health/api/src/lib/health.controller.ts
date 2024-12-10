import {Controller, Get} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HealthCheck, HealthCheckService, HttpHealthIndicator} from '@nestjs/terminus';

import {KEYCLOACK} from "@ghentcdh/authentication/api";


// import {
//     HealthCheck,
//     HealthCheckService,
//     PrismaHealthIndicator,
// } from '@nestjs/terminus';
// import { PrismaService } from 'src/prisma/prisma.service';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private http: HttpHealthIndicator,
        private readonly configService: ConfigService
        // private prismaHealth: PrismaHealthIndicator,
        // private prisma: PrismaService,
    ) {
    }

    @Get()
    @HealthCheck()
    check() {
        const keycloakHost = this.configService.get(KEYCLOACK.HOST)!
        return this.health.check([
            () => this.http.pingCheck('Keycloak', `${keycloakHost}heatlh`),
            // async () => this.prismaHealth.pingCheck('prisma', this.prisma),
        ]);
    }
}
