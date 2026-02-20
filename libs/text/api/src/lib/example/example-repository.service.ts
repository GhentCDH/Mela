import { Injectable } from '@nestjs/common';
import { pick } from 'lodash-es';

import { PrismaService } from '@mela/generated-prisma';
import { Example, ExampleWithRelations } from '@mela/generated-types';

import { CreateExampleDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class ExampleRepository extends AbstractRepository<
  Example,
  CreateExampleDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.example);
  }

  override async create(dto: CreateExampleDto): Promise<ExampleWithRelations> {
    // const createdExample =  const connect = await this.connectCreate(dto);
    const createdExample = await this.prisma.example.create({
      data: {
        ...pick(dto, ['name']),
        register: await this.createOrConnectRegister(dto),
        textContent: { connect: { id: dto.textContent.id } },
      },
    });

    return this.prisma.example.findFirstOrThrow({
      where: { id: createdExample.id },
      include: { register: true },
    });
  }

  // 1. Delete the example
  // 2. Delete the example annotation
  override async delete(id: string): Promise<Example> {
    throw new Error('Use AnnotationtypeRepository.delete instead');
  }

  override async update(
    id: string,
    dto: CreateExampleDto,
  ): Promise<ExampleWithRelations> {
    await super.update(id, {
      ...pick(dto, ['name']),
      register: await this.createOrConnectRegister(dto),
    });

    return this.prisma.example.findFirstOrThrow({
      where: { id: id },
      include: { register: true },
    });
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
