/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';

const globalPrefix = 'api';

async function bootstrapApp() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);

    return app;
}


async function bootstrap() {
    const app = await bootstrapApp();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );

    // return app
}

if (import.meta.env.PROD) {
    bootstrap();
}

export const viteNodeApp = bootstrapApp()
