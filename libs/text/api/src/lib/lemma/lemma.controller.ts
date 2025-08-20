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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { RequestDto } from '@ghentcdh/json-forms-api';
import { LemmaDto } from '@ghentcdh/mela/generated/dtos';
import { LemmaWithRelations } from '@ghentcdh/mela/generated/types';

import { CreateLemmaDto, ListLemmaDto } from './dto';
import { LemmaRepository } from './lemma-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('lemma')
@ApiBearerAuth()
// @UseGuards(GhentCdhGuard)
export class LemmaController extends AbstractController<
  LemmaWithRelations,
  CreateLemmaDto
> {
  constructor(repository: LemmaRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListLemmaDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListLemmaDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: LemmaDto,
  })
  override async create(
    @Body() dto: CreateLemmaDto,
  ): Promise<LemmaWithRelations> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: LemmaDto,
  })
  override async findOne(@Param('id') id: string): Promise<LemmaWithRelations> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: LemmaDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateLemmaDto,
  ): Promise<LemmaDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: LemmaDto,
  })
  override async delete(@Param('id') id: string): Promise<LemmaWithRelations> {
    return super.delete(id);
  }
}
