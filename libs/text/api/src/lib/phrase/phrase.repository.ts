import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Phrase } from '@ghentcdh/mela/generated/types';
import { RequestDto } from '@ghentcdh/tools/form';

import { CreatePhraseDto } from './phrase.schema';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class PhraseRepository extends AbstractRepository<
  Phrase,
  CreatePhraseDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.phrase);
  }

  override async list(request: RequestDto) {
    return this.prisma.phrase.findMany({
      take: request.pageSize,
      skip: request.offset,
    });
  }

  override async count() {
    return this.prisma.phrase.count();
  }
}
