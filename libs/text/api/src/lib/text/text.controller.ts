// eslint-disable @typescript-eslint/consistent-type-imports
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { TextFormSchema } from '@mela/text/shared';
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
import { TextWithRelationsDto } from '@mela/generated-dtos';
import { TextWithRelations } from '@mela/generated-types';

import { CreateTextDto, ListTextDto } from './dto';
import { TextRepositoryService } from './text-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('text')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
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

  @Get('/:id')
  @ApiCreatedResponse({
    type: TextWithRelationsDto,
  })
  override async findOne(@Param('id') id: string) {
    return super.findOneAndParse(id, TextFormSchema.responseSchema);
  }

  @Post()
  @ApiCreatedResponse({
    type: TextWithRelationsDto,
  })
  override async create(
    @Body() dto: CreateTextDto,
  ): Promise<TextWithRelations> {
    return super.create(dto);
  }

  @Patch('/:id')
  @ApiResponse({
    type: TextWithRelationsDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateTextDto,
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
