import { Injectable } from '@nestjs/common';

import { TextDto } from '@ghentcdh/mela/generated/dtos';
import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Author } from '@ghentcdh/mela/generated/types';

import { CreateTextDto } from './text.schema';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class TextRepositoryService extends AbstractRepository<
  TextDto,
  CreateTextDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.text);
  }

  override async list(): Promise<Author[]> {
    return this.prisma.text.findMany({ include: { author: true } });
  }
}
