/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const globalPrefix = 'api';

async function bootstrapApp() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix(globalPrefix);

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
    // documentFactory().addBearerAuth()
    SwaggerModule.setup('doc', app, documentFactory);

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
