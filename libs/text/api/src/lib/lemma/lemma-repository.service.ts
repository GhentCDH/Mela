import { Injectable } from '@nestjs/common';
import { LemmaCreateManyInput } from '@prisma/client';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { LemmaWithRelations } from '@ghentcdh/mela/generated/types';

import { CreateLemmaDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';
import { SpeechRepository } from '../speech/speech-repository.service';

@Injectable()
export class LemmaRepository extends AbstractRepository<
  LemmaWithRelations,
  CreateLemmaDto
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly speechRepository: SpeechRepository,
  ) {
    super(prisma.lemma);
  }

  protected override includeList(): Record<string, true> {
    return { speech: true };
  }

  override async create(dto: CreateLemmaDto): Promise<LemmaWithRelations> {
    return super.create({
      ...dto,
      speech: await this.createOrConnectSpeech(dto),
    });
  }

  override async update(
    id: string,
    dto: CreateLemmaDto,
  ): Promise<LemmaWithRelations> {
    return super.update(id, {
      ...dto,
      speech: await this.createOrConnectSpeech(dto),
    });
  }

  private async createOrConnectSpeech(dto: CreateLemmaDto) {
    const { name, id } = dto.speech;

    return this.speechRepository.createOrConnect(id, name);
  }

  public createMany(lemmas: LemmaCreateManyInput[]) {
    // First create the speeches
    return Promise.all(
      lemmas.map(async (l) => {
        const lemma = {
          ...l,
          speech: (await this.createOrConnectSpeech(l)) as LemmaCreateManyInput,
        };

        return this.prisma.lemma.upsert({
          where: { word: l.word },
          update: lemma,
          create: lemma,
        });
      }),
    );
  }
}
