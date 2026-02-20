import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Author } from '@mela/generated-types';

import { CreateAuthorDto } from './dto';
import { AbstractNameRepository } from '../shared/name.repository.service';

@Injectable()
export class AuthorRepository extends AbstractNameRepository<
  Author,
  CreateAuthorDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(prisma.author);
  }
}
