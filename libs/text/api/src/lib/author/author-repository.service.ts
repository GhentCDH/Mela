import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';
import { Author } from '@ghentcdh/mela/generated/types';

import { CreateAuthorDto } from './author.schema';

@Injectable()
export class AuthorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  async create(dto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.create({
      data: dto,
    });
  }

  async update(id: string, dto: CreateAuthorDto): Promise<Author> {
    return this.prisma.author.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete(id: string): Promise<Author> {
    return this.prisma.author.delete({
      where: {
        id,
      },
    });
  }
}
