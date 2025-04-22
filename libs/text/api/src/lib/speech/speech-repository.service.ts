import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Speech } from '@ghentcdh/mela/generated/types';

import { CreateSpeechDto } from './dto';
import { AbstractNameRepository } from '../shared/name.repository.service';

@Injectable()
export class SpeechRepository extends AbstractNameRepository<
  Speech,
  CreateSpeechDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.speech);
  }
}
