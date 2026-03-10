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
    // find relations that also should be deleted
    const annotation = await this.findOne(id);
    const relations = annotation.relationsTo.map((r) => r.annotation_from_id);

    const toDeleteIds = [id, relations].flat();

    if (annotation.relationsFrom.length || annotation.relationsTo.length) {
      await this.prisma.annotationRelation.deleteMany({
        where: {
          OR: [
            { annotation_from_id: { in: toDeleteIds } },
            { annotation_to_id: { in: toDeleteIds } },
          ],
        },
      });
    }

    return this.prisma.annotationNew.deleteMany({
      where: { id: { in: toDeleteIds } },
    });
  }
}
