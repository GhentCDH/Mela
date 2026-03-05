import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { mapToW3CAnnotation } from '@mela/text/shared';
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
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { string } from 'zod';

import { AnnotationTypeRepository } from './annotation-repository.service';
import {
  AnnotationTypeDto,
  LinkTypeDto,
  MelaAnnotationReturnDto,
} from './annotation-type.schema';
import { AnnotationRepository } from '../annotation-repository.service';

@UsePipes(ZodValidationPipe)
@Controller('annotation/type')
@ApiBearerAuth()
export class AnnotationTypeController {
  constructor(
    private annotationTypeRepository: AnnotationTypeRepository,
    private annotationRepository: AnnotationRepository,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: MelaAnnotationReturnDto,
  })
  async create(@Body() annotationType: AnnotationTypeDto) {
    const result = await this.annotationTypeRepository.create(annotationType);

    return mapToW3CAnnotation(result);
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: MelaAnnotationReturnDto,
  })
  async get(@Param('id') id: string) {
    const annotation = await this.annotationRepository.findOne(id);

    return mapToW3CAnnotation(annotation);
  }
  @Patch(':id')
  @ApiCreatedResponse({
    type: MelaAnnotationReturnDto,
  })
  async patch(
    @Param('id') id: string,
    @Body() annotationType: AnnotationTypeDto,
  ) {
    const result = await this.annotationTypeRepository.update(
      id,
      annotationType,
    );
    return mapToW3CAnnotation(result);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: string,
  })
  async delete(@Param('id') id: string) {
    return this.annotationTypeRepository.delete(id);
  }

  @Post(':id')
  @ApiCreatedResponse({
    type: MelaAnnotationReturnDto,
  })
  async createLink(@Body() link: LinkTypeDto) {
    return this.annotationTypeRepository.updateLink(null, link);
  }

  @Patch('link/:id')
  @ApiCreatedResponse({
    type: MelaAnnotationReturnDto,
  })
  async patchLink(@Param('id') id: string, @Body() link: LinkTypeDto) {
    return this.annotationTypeRepository.updateLink(id, link);
  }
}
