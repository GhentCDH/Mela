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
import { BookRepository } from './book/book-repository.service';
import { BookController } from './book/book.controller';
import { ChapterController } from './chapter/chapter.controller';
import { ChapterRepository } from './chapter/chapter.repository.service';
import { ExampleRepository } from './example/example-repository.service';
import { ExampleController } from './example/example.controller';
import { LemmaRepository } from './lemma/lemma-repository.service';
import { LemmaController } from './lemma/lemma.controller';
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
    LemmaController,
    SpeechController,
    BookController,
    ChapterController,
  ],
  providers: [
    AnnotationTypeRepository,
    AuthorRepository,
    TextRepositoryService,
    RegisterRepository,
    AnnotationRepository,
    ExampleRepository,
    LemmaRepository,
    SpeechRepository,
    BookRepository,
    ChapterRepository,
  ],
  exports: [AuthorRepository, TextRepositoryService],
})
export class TextApiModule {}
