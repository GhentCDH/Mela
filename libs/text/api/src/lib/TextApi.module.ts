import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@mela/generated-prisma';

import { AnnotationRepository } from './annotation/annotation-repository.service';
import { AnnotationTextController } from './annotation/annotaton-text.controller';
import { AnnotationTypeRepository } from './annotation/type/annotation-repository.service';
import { AnnotationTypeController } from './annotation/type/annotation-type.controller';
import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { WorkRepository } from './work/work.repository';
import { WorkController } from './work/work.controller';
import { SectionController } from './section/section.controller';
import { SectionRepository } from './section/section.repository';
import { ExampleRepository } from './example/example-repository.service';
import { ExampleController } from './example/example.controller';
import { LemmaRepository } from './lemma/lemma-repository.service';
import { LemmaController } from './lemma/lemma.controller';
import { RegisterRepository } from './register/register-repository.service';
import { RegisterController } from './register/register.controller';
import { SpeechRepository } from './speech/speech-repository.service';
import { SpeechController } from './speech/speech.controller';

@Module({
  imports: [PrismaModule, HttpModule, ConfigModule],
  controllers: [
    AuthorController,
    RegisterController,
    AnnotationTextController,
    AnnotationTypeController,
    ExampleController,
    LemmaController,
    SpeechController,
    WorkController,
    SectionController,
  ],
  providers: [
    AnnotationTypeRepository,
    AuthorRepository,
    RegisterRepository,
    AnnotationRepository,
    ExampleRepository,
    LemmaRepository,
    SpeechRepository,
    WorkRepository,
    SectionRepository,
  ],
  exports: [AuthorRepository],
})
export class TextApiModule {}
