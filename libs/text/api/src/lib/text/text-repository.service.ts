import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';

import { CreateTextDto } from './text.schema';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class TextRepositoryService extends AbstractRepository<
  TextWithRelations,
  CreateTextDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.text);
  }

  protected override include(): Record<string, true> {
    return { author: true };
  }

  protected override async connect(
    dto: CreateTextDto,
  ): Promise<Partial<CreateTextDto>> {
    return {
      author: await this.createOrConnectAuthor(dto),
    };
  }

  private async createOrConnectAuthor(dto: CreateTextDto) {
    if (dto.author.id) {
      return {
        connect: { id: dto.author.id },
      };
    }

    const { name } = dto.author;

    return {
      connect: await this.prisma.author.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    };
  }
}
