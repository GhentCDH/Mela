import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AnnotationRepository } from './annotation/annotation-repository.service';
import { AnnotationTextController } from './annotation/annotaton-text.controller';
import { AnnotationTypeRepository } from './annotation/type/annotation-repository.service';
import { AnnotationTypeController } from './annotation/type/annotation-type.controller';
import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { ExampleRepository } from './example/example-repository.service';
import { ExampleController } from './example/example.controller';
import { LemaRepository } from './lema/lema-repository.service';
import { LemaController } from './lema/lema.controller';
import { RegisterRepository } from './register/register-repository.service';
import { RegisterController } from './register/register.controller';
import { SpeechRepository } from './speech/speech-repository.service';
import { SpeechController } from './speech/speech.controller';
import { TextRepositoryService } from './text/text-repository.service';
import { TextController } from './text/text.controller';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [
    AuthorController,
    RegisterController,
    AnnotationTextController,
    AnnotationTypeController,
    TextController,
    ExampleController,
    LemaController,
    SpeechController,
  ],
  providers: [
    AnnotationTypeRepository,
    AuthorRepository,
    TextRepositoryService,
    RegisterRepository,
    AnnotationRepository,
    ExampleRepository,
    LemaRepository,
    SpeechRepository,
  ],
  exports: [AuthorRepository, TextRepositoryService],
})
export class TextApiModule {}
