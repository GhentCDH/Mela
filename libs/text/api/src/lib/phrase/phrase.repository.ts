import { CreatePhraseDto } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';
import { PhraseCreateManyInput } from '@prisma/client';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Phrase } from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class PhraseRepository extends AbstractRepository<
  Phrase,
  CreatePhraseDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.phrase);
  }

  createPhrases(phrases: PhraseCreateManyInput[]) {
    return this.prisma.phrase.createManyAndReturn({ data: phrases });
  }
}
