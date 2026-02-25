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
import { WorkDto } from '@mela/generated-dtos';

import { WorkRepository } from './work.repository';
import { CreateWorkDto, ListWorkDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('work')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
export class WorkController extends AbstractController<WorkDto, CreateWorkDto> {
  constructor(repository: WorkRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListWorkDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListWorkDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: WorkDto,
  })
  override async create(@Body() dto: CreateWorkDto): Promise<WorkDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: WorkDto,
  })
  override async findOne(@Param('id') id: string): Promise<WorkDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: WorkDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateWorkDto,
  ): Promise<WorkDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: WorkDto,
  })
  override async delete(@Param('id') id: string): Promise<WorkDto> {
    return super.delete(id);
  }
}
