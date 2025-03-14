import { Injectable } from '@nestjs/common';
import { LemaCreateManyInput } from '@prisma/client';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { LemaWithRelations } from '@ghentcdh/mela/generated/types';

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

  public createMany(lemas: LemaCreateManyInput[]) {
    // First create the speeches
    return Promise.all(
      lemas.map(async (l) => {
        const lema = {
          ...l,
          speech: (await this.createOrConnectSpeech(l)) as LemaCreateManyInput,
        };

        return this.prisma.lema.upsert({
          where: { word: l.word },
          update: lema,
          create: lema,
        });
      }),
    );
  }
}
