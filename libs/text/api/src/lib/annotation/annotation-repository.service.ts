import { Injectable } from '@nestjs/common';

import { PrismaService } from '@mela/generated-prisma';
import { Annotation } from '@mela/generated-types';

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

  protected override async connect(
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return super.connect(dto);
  }

  protected override includeLDetail(): Record<string, true> {
    return { annotationTarget: true, annotationBody: true };
  }

  protected override includeList(): Record<string, true> {
    return { annotationTarget: true, annotationBody: true };
  }

  protected override async connectCreate(
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return {
      annotationTarget: await this.createOrConnectTarget(null, dto),
      annotationBody: await this.createOrConnectBody(null, dto),
    };
  }

  protected override async connectUpdate(
    id: string | null,
    dto: CreateAnnotationDto | null,
  ): Promise<Partial<CreateAnnotationDto>> {
    return {
      annotationTarget: await this.createOrConnectTarget(id, dto),
      annotationBody: await this.createOrConnectBody(id, dto),
    };
  }

  private async createOrConnectTarget(
    annotation_id: string | null,
    dto: CreateAnnotationDto,
  ) {
    if (annotation_id)
      // TODO decide if this is the best to do?
      await this.prisma.annotationTarget.deleteMany({
        where: {
          annotation_id,
        },
      });

    return { create: dto.annotationTarget };
  }

  private async createOrConnectBody(
    annotation_id: string | null,
    dto: CreateAnnotationDto,
  ) {
    if (annotation_id)
      // TODO decide if this is the best to do?
      await this.prisma.annotationBody.deleteMany({
        where: {
          annotation_id,
        },
      });

    return { create: dto.annotationBody };
  }

  override async delete(id: string): Promise<Annotation> {
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
