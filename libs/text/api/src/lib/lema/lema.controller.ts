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

import { LemaDto } from '@ghentcdh/mela/generated/dtos';
import { LemaWithRelations } from '@ghentcdh/mela/generated/types';
import { RequestDto } from '@ghentcdh/tools/form/api';

import { CreateLemaDto, ListLemaDto } from './dto';
import { LemaRepository } from './lema-repository.service';
import { AbstractController } from '../shared/controller';
import { GhentCdhGuard } from '@ghentcdh/authentication/api';

@UsePipes(ZodValidationPipe)
@Controller('lema')
@ApiBearerAuth()
@UseGuards(GhentCdhGuard)
export class LemaController extends AbstractController<
  LemaWithRelations,
  CreateLemaDto
> {
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
  override async create(
    @Body() dto: CreateLemaDto,
  ): Promise<LemaWithRelations> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: LemaDto,
  })
  override async findOne(@Param('id') id: string): Promise<LemaWithRelations> {
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
  override async delete(@Param('id') id: string): Promise<LemaWithRelations> {
    return super.delete(id);
  }
}
