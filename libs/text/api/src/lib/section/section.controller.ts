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
import { SectionDto } from '@mela/generated-dtos';

import { SectionRepository } from './section.repository';
import { CreateSectionDto, SectionListDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('section')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
export class SectionController extends AbstractController<
  SectionDto,
  CreateSectionDto
> {
  constructor(repository: SectionRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: SectionListDto,
  })
  override async list(@Query() params: RequestDto): Promise<SectionListDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: SectionDto,
  })
  override async create(@Body() dto: CreateSectionDto): Promise<SectionDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: SectionDto,
  })
  override async findOne(@Param('id') id: string): Promise<SectionDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: SectionDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateSectionDto,
  ): Promise<SectionDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: SectionDto,
  })
  override async delete(@Param('id') id: string): Promise<SectionDto> {
    return super.delete(id);
  }
}
