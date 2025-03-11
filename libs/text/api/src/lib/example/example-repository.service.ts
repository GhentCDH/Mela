import { Injectable } from '@nestjs/common';
import { pick } from 'lodash-es';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Example } from '@ghentcdh/mela/generated/types';

import { CreateExampleDto } from './dto';
import { createExampleAnnotation } from './example';
import { AnnotationRepository } from '../annotation/annotation-repository.service';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class ExampleRepository extends AbstractRepository<
  Example,
  CreateExampleDto
> {
  constructor(
    private readonly prisma: PrismaService,
    private readonly annotationRepository: AnnotationRepository,
  ) {
    super(prisma.example);
  }

  // 1. Create the example
  // 2. Create the example annotation
  override async create(dto: CreateExampleDto): Promise<Example> {
    // Search for dependencies if they exist
    const [textContent] = await Promise.all([
      this.prisma.textContent.findUnique({
        where: { id: dto['textContent'].id },
      }),
    ]);

    // const createdExample =  const connect = await this.connectCreate(dto);
    const createdExample = await this.prisma.example.create({
      data: {
        ...pick(dto, ['name']),
        register: await this.createOrConnectRegister(dto),
        textContent: { connect: textContent },
      },
    });

    const example = await this.prisma.example.findFirstOrThrow({
      where: { id: createdExample.id },
      include: { register: true },
    });

    const annotation = createExampleAnnotation(
      example,
      textContent,
      dto.annotation,
    );

    if (dto.annotation.id)
      await this.annotationRepository.update(dto.annotation.id, annotation);
    else await this.annotationRepository.create(annotation);

    return createdExample;
  }

  // 1. Delete the example
  // 2. Delete the example annotation
  override async delete(id: string): Promise<Example> {
    const relatedAnnotation = await this.findRelatedAnnotation(id);
    await this.prisma.annotation.delete(relatedAnnotation.id);
    return super.delete(id);
  }

  // 1. Update the example
  // 2. Update the example anotation metadata?
  override async update(id: string, dto: CreateExampleDto): Promise<Example> {
    const [relatedAnnotation, textContent] = await Promise.all([
      this.findRelatedAnnotation(id),
      this.prisma.textContent.findUnique({
        where: { id: dto['textContent'].id },
      }),
    ]);

    console.log(dto);

    const updated = super.update(id, {
      ...pick(dto, ['name']),
      register: await this.createOrConnectRegister(dto),
    });

    const example = await this.prisma.example.findFirstOrThrow({
      where: { id: id },
      include: { register: true },
    });

    const annotation = createExampleAnnotation(
      example,
      textContent,
      dto.annotation,
    );

    return Promise.all([
      await this.annotationRepository.update(relatedAnnotation.id, annotation),
      updated,
    ]);
  }

  private async findRelatedAnnotation(exampleId: string) {
    const body = await this.prisma.annotationBody.findFirstOrThrow({
      where: { source_id: exampleId, source_type: 'example' },
      include: { annotation: true },
    });
    return body.annotation;
  }

  private async createOrConnectRegister(dto: CreateExampleDto) {
    const { name } = dto.register;

    return {
      connectOrCreate: {
        where: {
          name,
        },
        create: {
          name,
        },
      },
    };
  }
}
