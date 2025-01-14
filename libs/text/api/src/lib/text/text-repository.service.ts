import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';
import { RequestDto } from '@ghentcdh/tools/form';

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

  override include() {
    return { author: true };
  }

  override buildSort(request: Pick<RequestDto, 'sort' | 'sortDir'>) {
    if (request.sort === 'author.name') {
      return {
        author: { name: request.sortDir },
      };
    }
    return super.buildSort(request);
  }

  override async create(dto: CreateTextDto): Promise<TextWithRelations> {
    return super.create({
      ...dto,
      author: this.createOrConnectAuthor(dto),
    });
  }

  override async update(
    id: string,
    dto: CreateTextDto,
  ): Promise<TextWithRelations> {
    return super.update(id, {
      ...dto,
      author: this.createOrConnectAuthor(dto),
    });
  }

  private createOrConnectAuthor(dto: CreateTextDto) {
    return dto.author.id
      ? {
          connect: { id: dto.author.id },
        }
      : { create: { name: dto.author.name } };
  }
}
