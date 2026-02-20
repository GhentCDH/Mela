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
import { ChapterDto } from '@mela/generated-dtos';

import { ChapterRepository } from './chapter.repository.service';
import { CreateChapterDto, ListChapterDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('chapter')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
export class ChapterController extends AbstractController<
  ChapterDto,
  CreateChapterDto
> {
  constructor(repository: ChapterRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListChapterDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListChapterDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: ChapterDto,
  })
  override async create(@Body() dto: CreateChapterDto): Promise<ChapterDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: ChapterDto,
  })
  override async findOne(@Param('id') id: string): Promise<ChapterDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: ChapterDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateChapterDto,
  ): Promise<ChapterDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: ChapterDto,
  })
  override async delete(@Param('id') id: string): Promise<ChapterDto> {
    return super.delete(id);
  }
}
