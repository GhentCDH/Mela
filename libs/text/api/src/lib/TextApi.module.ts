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
import { RegisterRepository } from './register/register-repository.service';
import { RegisterController } from './register/register.controller';
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
  ],
  providers: [
    AnnotationTypeRepository,
    AuthorRepository,
    TextRepositoryService,
    RegisterRepository,
    AnnotationRepository,
    ExampleRepository,
  ],
  exports: [AuthorRepository, TextRepositoryService],
})
export class TextApiModule {}
