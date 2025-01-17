import { CreateSpeechDto } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Speech } from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class SpeechRepository extends AbstractRepository<
  Speech,
  CreateSpeechDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.speech);
  }
}
