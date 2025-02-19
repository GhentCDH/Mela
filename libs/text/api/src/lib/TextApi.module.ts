import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AnnotationRepository } from './annotation/annotation-repository.service';
import { AnnotationController } from './annotation/annotation.controller';
import { AnnotationTextController } from './annotation/annotaton-text.controller';
import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { LemaRepository } from './lema/lema-repository.service';
import { LemaController } from './lema/lema.controller';
import { RegisterRepository } from './register/register-repository.service';
import { RegisterController } from './register/register.controller';
import { SpeechRepository } from './speech/speech-repository.service';
import { SpeechController } from './speech/speech.controller';
import { TextImportService } from './text/text-import.service';
import { TextRepositoryService } from './text/text-repository.service';
import { TextController } from './text/text.controller';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [
    AuthorController,
    RegisterController,
    LemaController,
    SpeechController,
    AnnotationController,
    AnnotationTextController,

    TextController,
  ],
  providers: [
    AuthorRepository,
    TextRepositoryService,
    TextImportService,
    RegisterRepository,
    LemaRepository,
    SpeechRepository,
    AnnotationRepository,
  ],
  exports: [AuthorRepository, TextRepositoryService],
})
export class TextApiModule {}
