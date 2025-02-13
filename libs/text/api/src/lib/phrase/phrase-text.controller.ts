import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, Param, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { RequestDto } from '@ghentcdh/json-forms/api';
import { PhraseDto } from '@ghentcdh/mela/generated/dtos';

import { CreatePhraseDto, ListPhraseDto } from './dto';
import { PhraseRepository } from './phrase.repository';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('text/:textId/phrase')
@ApiBearerAuth()
export class PhraseTextController extends AbstractController<
  PhraseDto,
  CreatePhraseDto
> {
  constructor(repository: PhraseRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListPhraseDto,
  })
  async listPhrases(
    @Param('textId') textId: string,
    @Query() params: RequestDto,
  ): Promise<ListPhraseDto> {
    params.filter.push(`text.id:${textId}:equals`);
    return super.list(params);
  }
}
