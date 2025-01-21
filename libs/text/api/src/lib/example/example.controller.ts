import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateExampleDto, ListExampleDto } from '@mela/text/shared';
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

import { ExampleDto } from '@ghentcdh/mela/generated/dtos';
import { RequestDto } from '@ghentcdh/tools/form';

import { ExampleRepository } from './example-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('example')
export class ExampleController extends AbstractController<
  ExampleDto,
  CreateExampleDto
> {
  constructor(repository: ExampleRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListExampleDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListExampleDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: ExampleDto,
  })
  override async create(@Body() dto: CreateExampleDto): Promise<ExampleDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: ExampleDto,
  })
  override async findOne(@Param('id') id: string): Promise<ExampleDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: ExampleDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateExampleDto,
  ): Promise<ExampleDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: ExampleDto,
  })
  override async delete(@Param('id') id: string): Promise<ExampleDto> {
    return super.delete(id);
  }
}
