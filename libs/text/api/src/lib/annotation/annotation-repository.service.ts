import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { AnnotationNew } from '@mela/generated-types';

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

  public getDefs() {
    return this.prisma.annotationDef.findMany();
  }

  protected override async connect(
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return super.connect(dto);
  }

  protected override includeLDetail(): Record<string, true> {
    return {
      textSelector: true,
      type: true,
      relationsTo: true,
      relationsFrom: true,
    };
  }

  protected override includeList(): Record<string, true> {
    return {
      textSelector: true,
      type: true,
      textSelector: true,
      type: true,
      relationsTo: true,
      relationsFrom: true,
    };
  }

  override async delete(id: string): Promise<AnnotationNew> {
    await this.prisma.annotationRelation.deleteMany({
      where: {
        OR: [
          { annotation_from_id: id },
          { annotation_to_id: id },
        ],
      },
    });

    return this.prisma.annotationNew.delete({ where: { id } });
  }
}
