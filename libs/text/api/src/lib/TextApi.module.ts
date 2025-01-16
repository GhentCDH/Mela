import { Module } from '@nestjs/common';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { PhraseTextController } from './phrase/phrase-text.controller';
import { PhraseController } from './phrase/phrase.controller';
import { PhraseRepository } from './phrase/phrase.repository';
import { TextImportService } from './text/text-import.service';
import { TextRepositoryService } from './text/text-repository.service';
import { TextController } from './text/text.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    AuthorController,
    TextController,
    PhraseController,
    PhraseTextController,
  ],
  providers: [
    AuthorRepository,
    TextRepositoryService,
    PhraseRepository,
    TextImportService,
  ],
  exports: [AuthorRepository, TextRepositoryService, PhraseRepository],
})
export class TextApiModule {}
