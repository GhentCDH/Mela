import { PrismaService } from '@generated/prisma-client';
import { Author } from '@generated/types';
import { Injectable } from '@nestjs/common';

import { CreateAuthorDto } from './dto';
import { AbstractRepository } from '../shared/repository.service';

@Injectable()
export class AuthorRepository extends AbstractRepository<
  Author,
  CreateAuthorDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.author);
  }
}
