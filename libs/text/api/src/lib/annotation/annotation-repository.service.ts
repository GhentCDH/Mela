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
    id: string,
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return {
      annotationTarget: await this.createOrConnectTarget(id, dto),
      annotationBody: await this.createOrConnectBody(id, dto),
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateAnnotationDto,
  ): Promise<Partial<CreateAnnotationDto>> {
    return {
      annotationTarget: await this.createOrConnectTarget(id, dto),
      annotationBody: await this.createOrConnectBody(id, dto),
    };
  }

  private async createOrConnectTarget(
    annotation_id: string,
    dto: CreateAnnotationDto,
  ) {
    await this.prisma.annotationTarget.deleteMany({
      where: {
        annotation_id,
      },
    });

    return { create: dto.annotationTarget };
  }

  private async createOrConnectBody(
    annotation_id: string,
    dto: CreateAnnotationDto,
  ) {
    await this.prisma.annotationBody.deleteMany({
      where: {
        annotation_id,
      },
    });

    return { create: dto.annotationBody };
  }
}
