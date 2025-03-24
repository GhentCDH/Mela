import { PrismaService } from '@generated/prisma-client';
import { LemaWithRelations } from '@generated/types';
import { Injectable } from '@nestjs/common';

import { CreateLemaDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';
import { SpeechRepository } from '../speech/speech-repository.service';

@Injectable()
export class LemaRepository extends AbstractRepository<
  LemaWithRelations,
  CreateLemaDto
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly speechRepository: SpeechRepository,
  ) {
    super(prisma.lema);
  }

  protected override includeList(): Record<string, true> {
    return { speech: true };
  }

  override async create(dto: CreateLemaDto): Promise<LemaWithRelations> {
    return super.create({
      ...dto,
      speech: await this.createOrConnectSpeech(dto),
    });
  }

  override async update(
    id: string,
    dto: CreateLemaDto,
  ): Promise<LemaWithRelations> {
    return super.update(id, {
      ...dto,
      speech: await this.createOrConnectSpeech(dto),
    });
  }

  private async createOrConnectSpeech(dto: CreateLemaDto) {
    const { name, id } = dto.speech;

    const findSpeech = id
      ? await this.speechRepository.findOne(id)
      : await this.speechRepository.findOrCreate(name.trim());

    return {
      connect: { id: findSpeech.id },
    };
  }
}
