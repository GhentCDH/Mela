import { CreateRegisterDto } from '@mela/text/shared';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Register } from '@ghentcdh/mela/generated/types';

import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class RegisterRepository extends AbstractRepository<
  Register,
  CreateRegisterDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.register);
  }
}
