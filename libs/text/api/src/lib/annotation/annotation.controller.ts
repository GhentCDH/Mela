import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Delete, Param, Patch, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { AnnotationDto } from '@ghentcdh/mela/generated/dtos';

import { AnnotationRepository } from './annotation-repository.service';
import { CreateAnnotationDto, MelaAnnotationPageDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('annotation')
@ApiBearerAuth()
// @UseGuards(GhentCdhGuard)
export class AnnotationController extends AbstractController<
  AnnotationDto,
  CreateAnnotationDto
> {
  constructor(repository: AnnotationRepository) {
    super(repository);
  }

  @Delete(':id')
  override delete(@Param('id') id: string): Promise<AnnotationDto> {
    return super.delete(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({
    type: MelaAnnotationPageDto,
  })
  override async update(
    @Param('id') id: string,
    dto: CreateAnnotationDto,
  ): Promise<AnnotationDto> {
    return super.update(id, dto);
  }
}
