import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Annotation } from '@ghentcdh/mela/generated/types';

import { CreateAnnotationDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class AnnotationRepository extends AbstractRepository<
  Annotation,
  CreateAnnotationDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.annotation);
  }
}
