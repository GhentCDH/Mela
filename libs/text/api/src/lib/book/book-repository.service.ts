import { CreateBook } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { Book, Chapter } from '@mela/generated-types';

import { AuthorRepository } from '../author/author-repository.service';
import { AbstractRepository, IncludeType } from '../shared/repository.service';
import { CreateTextDto } from '../text/dto';

@Injectable()
export class BookRepository extends AbstractRepository<Book, CreateBook> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authorRepository: AuthorRepository,
  ) {
    super(prisma.book);
  }

  protected override includeList(): IncludeType {
    return {
      author: true,
      chapter: true,
    };
  }

  protected override includeLDetail(): IncludeType {
    return {
      author: true,
      chapter: {
        select: {
          text: true,
          id: true,
          name: true,
          chapter_number: true,
          chapter_order: true,
        },
      },
    };
  }

  protected override async connectCreate(
    dto: CreateBook,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      chapter: { create: dto.chapter },
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateBook,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      chapter: { connect: await this.createOrConnectChapter(id, dto) },
    };
  }

  private async createOrConnectAuthor(dto: CreateBook) {
    const { name, id } = dto.author;

    return this.authorRepository.createOrConnect(id, name);
  }

  private findChaptersForBook(book_id: string) {
    return this.prisma.chapter.findMany({ where: { book_id } });
  }

  private updateChapter(chapter: Chapter) {
    return this.prisma.chapter.update({
      where: { id: chapter.id },
      data: {
        ...chapter,
      },
    });
  }

  private async createOrConnectChapter(book_id: string, dto: CreateBook) {
    const existingChapters = await this.findChaptersForBook(book_id);

    const chapters = await Promise.all(
      dto.chapter.map((chapter) => {
        if (chapter.id) return this.updateChapter(chapter);

        existingChapters.find((c) => c.id === chapter.id);
        return this.prisma.chapter.create({
          data: {
            book_id,
            name: chapter.name,
          },
        });
      }),
    );

    const newChapterIds = chapters.map((c) => c.id as string);
    const existingChapterIds = existingChapters.map((c) => c.id);
    const notUsedAny = existingChapterIds.filter(
      (c) => !newChapterIds.includes(c),
    );

    if (notUsedAny)
      await this.prisma.chapter.deleteMany({
        where: { id: { in: notUsedAny } },
      });

    return chapters;
  }
}
