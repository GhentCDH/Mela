import { Injectable } from '@nestjs/common';
import { maxBy, omit } from 'lodash-es';
import { ZodSchema } from 'zod';

import { PrismaService } from '@mela/generated-prisma';
import {
  Section,
  SectionSchema,
  WorkWithRelations,
} from '@mela/generated-types';

import { mapToW3CAnnotation, SectionDto } from '@mela/text/shared';

import { AbstractRepository } from '../shared/repository.service';
import { WorkRepository } from '../work/work.repository';

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
  constructor(
    private readonly prisma: PrismaService,
    private readonly workRepository: WorkRepository,
  ) {
    super(prisma.section);
  }

  protected override selectDetail() {
    return selectDetail;
  }

  private async getWorkSectionsSorted(sectionId: string) {
    const section = await this.findOne(sectionId);
    const work: WorkWithRelations = await this.workRepository.findOne(
      section.work_id,
    );

    const sections = work.section.sort(
      (s1, s2) => s1.section_order - s2.section_order,
    );

    return sections;
  }

  override async create(dto: SectionDto): Promise<Section> {
    const sections = await this.getWorkSectionsSorted(dto.work.id);
    const section_order = maxBy(sections, 'section_order')?.section_order ?? -1;
    const created = await this.prisma.section.create({
      data: {
        ...omit(dto, 'section_text'),
        work: { connect: dto.work },
        section_order: section_order + 1,
      },
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

  public async findAnnotations(id: string) {
    //first get section text content ids
    //then get related text ids

    const section = await this.prisma.section.findUnique({
      where: { id },
      include: {
        section_text: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!section) return [];
    const textIds = section.section_text.map((text) => text.id);

    const annotations = await this.prisma.annotationNew.findMany({
      include: {
        textSelector: true,
        type: true,
        relationsTo: true,
        relationsFrom: true,
      },
      where: { textSelector: { section_text_id: { in: textIds } } },
    });
    const relationIds = annotations
      .map((s) => s.relationsTo.map((r) => r.annotation_from_id))
      .flat();

    const relatedAnnotations = await this.prisma.annotationNew.findMany({
      include: {
        textSelector: true,
        type: true,
        relationsTo: true,
        relationsFrom: true,
      },
      where: { id: { in: relationIds } },
    });

    return [annotations, relatedAnnotations].flat().map(mapToW3CAnnotation);
  }

  async moveSection(sectionId: string, newOrder: number) {
    const [section, sections] = await Promise.all([
      this.findOne(sectionId),
      this.getWorkSectionsSorted(sectionId),
    ]);
    const maxSectionOrder =
      maxBy(sections, 'section_order')?.section_order ?? -1;

    const sectionsToSave = [] as { id: string; section_order: number }[];
    console.log(maxSectionOrder, newOrder, sections.length);

    const [prevPosition] = sections.splice(section.section_order, 1);
    sections.splice(newOrder, 0, prevPosition);

    sections.forEach((section, index) => {
      if (section.section_order !== index) {
        sectionsToSave.push({ id: section.id, section_order: index });
      }
    });

    await Promise.all(
      sectionsToSave.map((s) =>
        this.prisma.section.update({
          where: { id: s.id },
          data: { section_order: s.section_order },
        }),
      ),
    );
    console.log(sections);

    return this.findOne(sectionId);
  }
}
