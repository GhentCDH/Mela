import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { PhraseDto } from '@ghentcdh/mela/generated/dtos';
import { RequestDto } from '@ghentcdh/tools/form';

import { PhraseRepository } from './phrase.repository';
import { CreatePhraseDto, ListPhraseDto, phraseSchema } from './phrase.schema';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('phrase')
export class PhraseController extends AbstractController<
  PhraseDto,
  CreatePhraseDto
> {
  constructor(repository: PhraseRepository) {
    super(repository, phraseSchema);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListPhraseDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListPhraseDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: PhraseDto,
  })
  override async create(@Body() dto: CreatePhraseDto): Promise<PhraseDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: PhraseDto,
  })
  override async findOne(@Param('id') id: string): Promise<PhraseDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: PhraseDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreatePhraseDto
  ): Promise<PhraseDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: PhraseDto,
  })
  override async delete(@Param('id') id: string): Promise<PhraseDto> {
    return super.delete(id);
  }
}
