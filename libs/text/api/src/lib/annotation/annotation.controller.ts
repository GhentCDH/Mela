import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';

import { AnnotationDto } from '@ghentcdh/mela/generated/dtos';

import { AnnotationRepository } from './annotation-repository.service';
import { CreateAnnotationDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('annotation')
export class AnnotationController extends AbstractController<
  AnnotationDto,
  CreateAnnotationDto
> {
  constructor(repository: AnnotationRepository) {
    super(repository);
  }

  // @Get()
  // @ApiCreatedResponse({
  //   type: ListAnnotationDto,
  // })
  // override async list(@Query() params: RequestDto): Promise<ListAnnotationDto> {
  //   return super.list(params);
  // }

  @Post()
  @ApiCreatedResponse({
    type: AnnotationDto,
  })
  override async create(
    @Body() dto: CreateAnnotationDto,
  ): Promise<AnnotationDto> {
    return super.create(dto);
  }

  // @Get('/:id')
  // @ApiCreatedResponse({
  //   type: AnnotationDto,
  // })
  // override async findOne(@Param('id') id: string): Promise<AnnotationDto> {
  //   return super.findOne(id);
  // }
  //
  // @Patch('/:id')
  // @ApiResponse({
  //   type: AnnotationDto,
  // })
  // override async update(
  //   @Param('id') id: string,
  //   @Body() dto: CreateAnnotationDto,
  // ): Promise<AnnotationDto> {
  //   return super.update(id, dto);
  // }
  //
  // @Delete('/:id')
  // @ApiResponse({
  //   type: AnnotationDto,
  // })
  // override async delete(@Param('id') id: string): Promise<AnnotationDto> {
  //   return super.delete(id);
  // }
}
