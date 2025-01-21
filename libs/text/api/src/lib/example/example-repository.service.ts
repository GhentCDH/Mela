import { CreateExampleDto } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { ExampleWithRelations } from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class ExampleRepository extends AbstractRepository<
  ExampleWithRelations,
  CreateExampleDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.example);
  }

  // public createMany(Examples: ExampleCreateManyInput[]) {
  //   // First create the speeches
  //   return Promise.all(
  //     Examples.map(async (l) => {
  //       const Example = {
  //         ...l,
  //         speech: (await this.createOrConnectSpeech(
  //           l,
  //         )) as ExampleCreateManyInput,
  //       };
  //
  //       return this.prisma.Example.upsert({
  //         where: { word: l.word },
  //         update: Example,
  //         create: Example,
  //       });
  //     }),
  //   );
  // }
}
