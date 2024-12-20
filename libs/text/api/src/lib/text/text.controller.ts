import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { CreateTextDto, ListTextDto } from '@mela/text/shared';
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

import { TextWithRelationsDto } from '@ghentcdh/mela/generated/dtos';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';
import { RequestDto } from '@ghentcdh/tools/form';

import { TextRepositoryService } from './text-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('text')
export class TextController extends AbstractController<
  TextWithRelations,
  CreateTextDto
> {
  constructor(repository: TextRepositoryService) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListTextDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListTextDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: TextWithRelationsDto,
  })
  override async create(
    @Body() dto: CreateTextDto
  ): Promise<TextWithRelations> {
    return super.create(dto);
  }

  @Patch('/:id')
  @ApiResponse({
    type: TextWithRelationsDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateTextDto
  ): Promise<TextWithRelations> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: TextWithRelationsDto,
  })
  override async delete(@Param('id') id: string): Promise<TextWithRelations> {
    return super.delete(id);
  }
}
