import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Author } from '@ghentcdh/mela/generated/types';

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
