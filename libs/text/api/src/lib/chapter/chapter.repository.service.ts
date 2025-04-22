import { Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

import { ChapterDto } from '@ghentcdh/mela/generated/dtos';
import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import {
  Chapter,
  ChapterSchema,
  TextWithRelations,
} from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';
import { TextRepositoryService } from '../text/text-repository.service';

type CreateChapter = any;

const createSelectFromSchema = (schema: ZodSchema) => {
  const selectDetail: Record<string, any> = {};
  Object.keys(ChapterSchema.shape).forEach((key) => {
    selectDetail[key] = true;
  });

  return selectDetail;
};

const chapterSelect = createSelectFromSchema(ChapterSchema);
const selectDetail = {
  ...chapterSelect,
  text: { include: { textContent: true } },
};

@Injectable()
export class ChapterRepository extends AbstractRepository<
  Chapter,
  CreateChapter
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly textRepository: TextRepositoryService,
  ) {
    super(prisma.chapter);
  }

  protected override selectDetail() {
    return selectDetail;
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateChapter,
  ): Promise<Partial<ChapterDto>> {
    return {
      text: { connect: await this.connectOrCreateTexts(id, dto) },
      // author: await this.createOrConnectAuthor(dto),
      // chapter: { connect: await this.createOrConnectChapter(id, dto) },
    };
  }

  private async connectOrCreateTexts(chapter_id: string, dto: CreateChapter) {
    const updates = await Promise.all(
      dto.text.map((text: TextWithRelations) =>
        text.id
          ? this.textRepository.update(text.id, { ...text, chapter_id })
          : this.textRepository.create({
              ...text,
              chapter_id,
            }),
      ),
    );

    return updates.map((text) => ({ id: text.id }));
  }
}
