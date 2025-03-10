import { Injectable } from '@nestjs/common';
import { pick } from 'lodash-es';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Example, TextContent } from '@ghentcdh/mela/generated/types';

import { CreateExampleDto } from './dto';
import { createExampleAnnotation } from './example';
import { AnnotationRepository } from '../annotation/annotation-repository.service';
import { AbstractRepository } from '../shared/repository.service';
import { CreateTextDto } from '../text/dto';

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
    const [annotationTarget, textContent, text] = await Promise.all([
      this.prisma.annotation.findUnique({
        where: { id: dto['annotationTarget'].id },
      }),
      this.prisma.textContent.findUnique({
        where: { id: dto['textContent'].id },
      }),
      this.prisma.text.findUnique({ where: { id: dto['text'].id } }),
    ]);

    // const createdExample =  const connect = await this.connectCreate(dto);
    const createdExample = await this.prisma.example.create({
      data: {
        ...pick(dto, ['name', 'register']),
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
      annotationTarget,
      text,
      textContent,
    );

    await this.annotationRepository.create(annotation);

    return createdExample;
  }

  // 1. Delete the example
  // 2. Delete the example annotation
  override async delete(id: string): Promise<Example> {
    return super.delete(id);
  }

  // 1. Update the example
  // 2. Update the example anotation metadata?
  override async update(id: string, dto: CreateExampleDto): Promise<Example> {
    return super.update(id, dto);
  }

  protected override async connectCreate(
    dto: CreateTextDto,
  ): Promise<Partial<CreateTextDto>> {
    return {
      register: await this.createOrConnectRegister(dto),
      textContent: { connect: dto.textContent as TextContent },
    };
  }

  protected override async connectUpdate(
    id: string,
    dto: CreateTextDto,
  ): Promise<Partial<CreateTextDto>> {
    return {
      register: await this.createOrConnectRegister(dto),
      textContent: { connect: dto.textContent as TextContent },
    };
  }

  private async createOrConnectRegister(dto: CreateExampleDto) {
    if (dto.register.id) {
      return {
        connect: { id: dto.register.id },
      };
    }

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
