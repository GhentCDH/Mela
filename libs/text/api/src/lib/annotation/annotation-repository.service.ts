import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { Annotation, AnnotationNew } from '@mela/generated-types';

import { CreateAnnotationDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class AnnotationRepository extends AbstractRepository<
  AnnotationNew,
  null
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.annotationNew);
  }

  protected override async connect(
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return super.connect(dto);
  }

  protected override includeLDetail(): Record<string, true> {
    return { textSelector: true, type: true };
  }

  protected override includeList(): Record<string, true> {
    return { textSelector: true, type: true };
  }

  override async delete(id: string): Promise<AnnotationNew> {
    throw new Error('Use AnnotationtypeRepository.delete instead');
  }

  public findAnnotations(annotations: Array<Pick<Annotation, 'id'>>) {
    return this.prisma.annotation.findMany({
      where: {
        id: { in: annotations.map((a) => a.id) },
      },
    });
  }
}
