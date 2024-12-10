/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger as MyLogger} from '@ghentcdh/tools/logging/api';

const globalPrefix = 'api';

async function bootstrapApp() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);


    //#region Add swagger
    const config = new DocumentBuilder()
        .setTitle('Mela backend')
        .setDescription(`
        A text tagging and translation platform developed for the research.
        
        `)
        .setExternalDoc('MELA: The MEning of Language - A digital grammar of the Greek taught at schools in late Constantinople',
            'https://research.flw.ugent.be/en/projects/mela-meaning-language-digital-grammar-greek-taught-schools-late-constantinopl')
        .setVersion('1.0')
        .addTag('Mela')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('doc', app, documentFactory);
    //#endregion

    // Add logger
    app.useLogger(MyLogger.init())


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

// This is only for dev purpose
export const viteNodeApp = bootstrapApp()
