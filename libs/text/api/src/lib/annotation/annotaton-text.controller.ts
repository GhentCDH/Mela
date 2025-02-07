import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { RequestDto } from '@ghentcdh/tools/form/api';

import { MelaAnnotationPageDto } from './dto';
import { AnnotationRepository } from './annotation-repository.service';
import { MelaAnnotationPage } from '@mela/text/shared';

@UsePipes(ZodValidationPipe)
@Controller('text/:textId/annotation')
export class AnnotationTextController {
  constructor(private readonly repository: AnnotationRepository) {}

  @Get()
  @ApiCreatedResponse({
    type: MelaAnnotationPageDto,
  })
  async listPhrases(
    @Param('textId') textId: string,
    @Query() params: RequestDto,
  ): Promise<MelaAnnotationPage> {
    const [data, count] = await Promise.all([
      this.repository.list(params),
      this.repository.count(params.filter),
    ]);

    return MelaAnnotationPage.parse({
      items: data,
    }) as unknown as MelaAnnotationPage;
  }
}
