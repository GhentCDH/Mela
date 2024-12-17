import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { TextDto } from '@ghentcdh/mela/generated/dtos';
import { ResponseData } from '@ghentcdh/tools/form';

import { TextRepositoryService } from './text-repository.service';
import { CreateTextDto, textSchema } from './text.schema';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('text')
export class TextController extends AbstractController<TextDto, CreateTextDto> {
  constructor(repository: TextRepositoryService) {
    super(repository, textSchema);
  }

  @Get()
  override async list(): Promise<ResponseData<CreateTextDto>> {
    const data = await this.repository.list();

    return { data };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: TextDto,
  })
  override async create(@Body() dto: CreateTextDto): Promise<TextDto> {
    return super.create(dto);
  }

  @Patch('/:id')
  @ApiResponse({
    description: 'The record has been successfully updated.',
    type: TextDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateTextDto
  ): Promise<TextDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    description: 'The record has been successfully updated.',
    type: TextDto,
  })
  override async delete(@Param('id') id: string): Promise<TextDto> {
    return super.delete(id);
  }
}
