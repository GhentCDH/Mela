import { Injectable } from '@nestjs/common';
import { omit } from 'lodash-es';
import { ZodSchema } from 'zod';

import { PrismaService } from '@mela/generated-prisma';
import {
  Section,
  SectionSchema,
  TextWithRelations,
} from '@mela/generated-types';

import { AbstractRepository } from '../shared/repository.service';
import { TextRepositoryService } from '../text/text-repository.service';

type CreateSection = any;

const createSelectFromSchema = (schema: ZodSchema) => {
  const selectDetail: Record<string, any> = {};
  Object.keys(SectionSchema.shape).forEach((key) => {
    selectDetail[key] = true;
  });

  return selectDetail;
};

const sectionSelect = createSelectFromSchema(SectionSchema);
const selectDetail = {
  ...sectionSelect,
  text: { include: { textContent: true } },
};

@Injectable()
export class SectionRepository extends AbstractRepository<
  Section,
  CreateSection
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly textRepository: TextRepositoryService,
  ) {
    super(prisma.section);
  }

  protected override selectDetail() {
    return selectDetail;
  }

  override async create(dto: CreateSection): Promise<Section> {
    const created = await this.prisma.section.create({
      data: { ...omit(dto, 'text'), work: { connect: dto.work } },
    });

    return this.update(created.id, omit(dto, 'work'));
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateSection,
  ): Promise<Partial<SectionDto>> {
    return {
      text: { connect: await this.connectOrCreateTexts(id, dto) },
    };
  }

  private async connectOrCreateTexts(section_id: string, dto: CreateSection) {
    const updates = await Promise.all(
      dto.text.map((text: TextWithRelations) =>
        text.id
          ? this.textRepository.update(text.id, { ...text, section_id })
          : this.textRepository.create({
              ...text,
              section_id,
            }),
      ),
    );

    return updates.map((text) => ({ id: text.id }));
  }
}
