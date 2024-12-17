import { Module } from '@nestjs/common';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';
import { TextRepositoryService } from './text/text-repository.service';
import { TextController } from './text/text.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorController, TextController],
  providers: [AuthorRepository, TextRepositoryService],
  exports: [AuthorRepository, TextRepositoryService],
})
export class TextApiModule {}
