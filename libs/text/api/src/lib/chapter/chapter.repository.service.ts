import { Injectable } from '@nestjs/common';
import { omit } from 'lodash-es';
import { ZodSchema } from 'zod';

import { ChapterDto } from '@mela/generated-dtos';
import { PrismaService } from '@mela/generated-prisma';
import { Chapter, ChapterSchema, TextWithRelations } from '@mela/generated-types';

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

  override async create(dto: CreateChapter): Promise<Chapter> {
    const created = await this.prisma.chapter.create({
      data: { ...omit(dto, 'text'), book: { connect: dto.book } },
    });

    return this.update(created.id, omit(dto, 'book'));
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateChapter,
  ): Promise<Partial<ChapterDto>> {
    return {
      text: { connect: await this.connectOrCreateTexts(id, dto) },
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
