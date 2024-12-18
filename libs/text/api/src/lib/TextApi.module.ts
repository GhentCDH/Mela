import { Module } from '@nestjs/common';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { PhraseController } from './phrase/phrase.controller';
import { PhraseRepository } from './phrase/phrase.repository';
import { TextRepositoryService } from './text/text-repository.service';
import { TextController } from './text/text.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorController, TextController, PhraseController],
  providers: [AuthorRepository, TextRepositoryService, PhraseRepository],
  exports: [AuthorRepository, TextRepositoryService, PhraseRepository],
})
export class TextApiModule {}
