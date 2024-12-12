import { Injectable } from '@nestjs/common';

import { PrismaService } from '@ghentcdh/mela/generated/prisma';

@Injectable()
export class TextApiRepository {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<Text[]> {
    return this.prisma.text.findMany();
  }
}
