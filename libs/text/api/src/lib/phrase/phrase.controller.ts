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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { GhentCdhGuard } from '@ghentcdh/authentication/api';
import { RequestDto } from '@ghentcdh/json-forms/api';
import { PhraseDto } from '@ghentcdh/mela/generated/dtos';

import { CreatePhraseDto, ListPhraseDto } from './dto';
import { PhraseRepository } from './phrase.repository';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('phrase')
@ApiBearerAuth()
@UseGuards(GhentCdhGuard)
export class PhraseController extends AbstractController<
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
    @Body() dto: CreatePhraseDto,
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
