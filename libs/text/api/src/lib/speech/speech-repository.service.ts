import { PrismaService } from '@generated/prisma-client';
import { Speech } from '@generated/types';
import { Injectable } from '@nestjs/common';

import { CreateSpeechDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class SpeechRepository extends AbstractRepository<
  Speech,
  CreateSpeechDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.speech);
  }

  public findOrCreate(name: string) {
    return this.prisma.speech.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
}
