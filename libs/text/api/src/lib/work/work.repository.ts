import { CreateWork } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { Section, Work } from '@mela/generated-types';

import { AuthorRepository } from '../author/author-repository.service';
import { AbstractRepository, IncludeType } from '../shared/repository.service';
import { CreateTextDto } from '../text/dto';

@Injectable()
export class WorkRepository extends AbstractRepository<Work, CreateWork> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorRepository: AuthorRepository,
  ) {
    super(prisma.work);
  }

  protected override includeList(): IncludeType {
    return {
      author: true,
      section: true,
    };
  }

  protected override includeLDetail(): IncludeType {
    return {
      author: true,
      section: {
        select: {
          text: true,
          id: true,
          name: true,
          section_number: true,
          section_order: true,
        },
      },
    };
  }

  protected override async connectCreate(
    dto: CreateWork,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      section: { create: dto.section },
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateWork,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      section: { connect: await this.createOrConnectChapter(id, dto) },
    };
  }

  private async createOrConnectAuthor(dto: CreateWork) {
    const { name, id } = dto.author;

    return this.authorRepository.createOrConnect(id, name);
  }

  private findChaptersForBook(work_id: string) {
    return this.prisma.section.findMany({ where: { work_id } });
  }

  private updateChapter(section: Section) {
    return this.prisma.section.update({
      where: { id: section.id },
      data: {
        ...section,
      },
    });
  }

  private async createOrConnectChapter(work_id: string, dto: CreateWork) {
    const existingChapters = await this.findChaptersForBook(work_id);

    const sections = await Promise.all(
      dto.section.map((section) => {
        if (section.id) return this.updateChapter(section);

        existingChapters.find((c) => c.id === section.id);
        return this.prisma.section.create({
          data: {
            work_id,
            title: section.title,
          },
        });
      }),
    );

    const newChapterIds = sections.map((c) => c.id as string);
    const existingChapterIds = existingChapters.map((c) => c.id);
    const notUsedAny = existingChapterIds.filter(
      (c) => !newChapterIds.includes(c),
    );

    if (notUsedAny)
      await this.prisma.section.deleteMany({
        where: { id: { in: notUsedAny } },
      });

    return sections;
  }
}
