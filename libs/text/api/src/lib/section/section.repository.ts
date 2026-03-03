import { Injectable } from '@nestjs/common';
import { omit } from 'lodash-es';
import { ZodSchema } from 'zod';

import { PrismaService } from '@mela/generated-prisma';
import {
  type AnnotationNewWithRelations,
  Section,
  SectionSchema,
} from '@mela/generated-types';

import { mapToW3CAnnotation, SectionDto } from '@mela/text/shared';

import { AbstractRepository } from '../shared/repository.service';

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
  section_text: true,
  work: true,
};

@Injectable()
export class SectionRepository extends AbstractRepository<Section, SectionDto> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.section);
  }

  protected override selectDetail() {
    return selectDetail;
  }

  override async create(dto: SectionDto): Promise<Section> {
    const created = await this.prisma.section.create({
      data: { ...omit(dto, 'section_text'), work: { connect: dto.work } },
    });

    return this.update(created.id, omit(dto, 'work'));
  }

  protected override async connectUpdate(
    id: string,
    dto: SectionDto,
  ): Promise<Partial<SectionDto>> {
    return {
      section_text: {
        connect: await this.connectOrCreateSectionContent(id, dto),
      },
      work: { connect: dto.work },
    };
  }

  private async connectOrCreateSectionContent(
    section_id: string,
    dto: SectionDto,
  ) {
    const updates = await Promise.all(
      dto.section_text.map(async (section) =>
        this.prisma.sectionText.upsert({
          where: { id: section.id ?? '' },
          create: {
            ...omit(section, 'id'),
            section_id,
          },
          update: {
            content: section.content,
          },
        }),
      ),
    );
    return updates;
    // return updates.map((text) => ({ id: text.id }));
  }

  public findAnnotations(id: string) {
    //first get section text content ids
    //then get related text ids

    return this.prisma.section
      .findUnique({
        where: { id },
        include: {
          section_text: {
            select: {
              id: true,
            },
          },
        },
      })
      .then((section) => {
        if (!section) return [];
        const textIds = section.section_text.map((text) => text.id);

        return this.prisma.annotationNew
          .findMany({
            include: {
              textSelector: true,
              type: true,
            },
            where: { textSelector: { section_text_id: { in: textIds } } },
          })
          .then((annotations: AnnotationNewWithRelations[]) => {
            const mappedAnnotations = annotations.map(mapToW3CAnnotation);

            return mappedAnnotations;
          });
        // return this.prisma.annotationNew.findMany({
        //   where: {
        //     section_text_id: { in: textIds },
        //   },
        // });
      });
  }
}
