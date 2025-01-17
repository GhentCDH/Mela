import { CreateLemaDto } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Lema } from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class LemaRepository extends AbstractRepository<Lema, CreateLemaDto> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.lema);
  }
}
