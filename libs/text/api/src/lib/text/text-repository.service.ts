import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';

import { CreateTextDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class TextRepositoryService extends AbstractRepository<
  TextWithRelations,
  CreateTextDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.text);
  }

  protected override includeList(): Record<string, true> {
    return { author: true };
  }

  protected override includeLDetail(): Record<string, true> {
    return { author: true, textContent: true };
  }

  protected override async connectCreate(
    dto: CreateTextDto,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      textContent: { create: dto.textContent },
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateTextDto,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
      textContent: { connect: await this.createOrConnectTextContent(id, dto) },
    };
  }

  private async createOrConnectTextContent(
    text_id: string,
    dto: CreateTextDto,
  ) {
    const createOrUpdate = await Promise.all(
      dto.textContent.map((textContent) => {
        return this.prisma.textContent.upsert({
          where: { id: textContent.id ?? '' },
          create: {
            ...textContent,
            text_id,
          },
          update: {
            ...textContent,
          },
        });
      }),
    );

    return createOrUpdate.map((c) => ({ id: c.id }));
  }

  private async createOrConnectAuthor(dto: CreateTextDto) {
    if (dto.author.id) {
      return {
        connect: { id: dto.author.id },
      };
    }

    const { name } = dto.author;
    return {
      connectOrCreate: {
        where: {
          name,
        },
        create: {
          name,
        },
      },
    };
  }
}
