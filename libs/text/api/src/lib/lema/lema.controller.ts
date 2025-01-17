import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateLemaDto, ListLemaDto } from '@mela/text/shared';
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

import { LemaDto } from '@ghentcdh/mela/generated/dtos';
import { RequestDto } from '@ghentcdh/tools/form';

import { LemaRepository } from './lema-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('lema')
export class LemaController extends AbstractController<LemaDto, CreateLemaDto> {
  constructor(repository: LemaRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListLemaDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListLemaDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: LemaDto,
  })
  override async create(@Body() dto: CreateLemaDto): Promise<LemaDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: LemaDto,
  })
  override async findOne(@Param('id') id: string): Promise<LemaDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: LemaDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateLemaDto,
  ): Promise<LemaDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: LemaDto,
  })
  override async delete(@Param('id') id: string): Promise<LemaDto> {
    return super.delete(id);
  }
}
