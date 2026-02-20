import { TextCreate } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { TextWithRelations } from '@mela/generated-types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class TextRepositoryService extends AbstractRepository<
  TextWithRelations,
  TextCreate
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.text);
  }

  protected override includeLDetail(): Record<string, true> {
    return { textContent: true };
  }

  protected override async connectCreate(
    dto: TextCreate,
  ): Promise<Partial<TextCreate>> {
    return {
      textContent: { create: dto.textContent },
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: TextCreate,
  ): Promise<Partial<TextCreate>> {
    return {
      textContent: { connect: await this.createOrConnectTextContent(id, dto) },
    };
  }

  private async createOrConnectTextContent(text_id: string, dto: TextCreate) {
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
}
