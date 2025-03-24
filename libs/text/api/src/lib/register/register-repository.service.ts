import { PrismaService } from '@generated/prisma-client';
import { Register } from '@generated/types';
import { Injectable } from '@nestjs/common';

import { CreateRegisterDto } from './dto';
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
