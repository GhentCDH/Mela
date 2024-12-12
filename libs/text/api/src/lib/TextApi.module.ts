import { Module } from '@nestjs/common';

import { PrismaModule } from '@ghentcdh/mela/generated/prisma';

import { TextApiController } from './TextApi.controller';
import { TextApiRepository } from './text-api-repository.service';

@Module({
  imports: [PrismaModule],
  controllers: [TextApiController],
  providers: [TextApiRepository],
  exports: [TextApiRepository],
})
export class TextApiModule {}
