import { Module } from '@nestjs/common';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { AuthorRepository } from './author/author-repository.service';
import { AuthorController } from './author/author.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AuthorController],
  providers: [AuthorRepository],
  exports: [AuthorRepository],
})
export class TextApiModule {}
