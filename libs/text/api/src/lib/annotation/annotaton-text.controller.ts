import { ZodValidationPipe } from '@anatine/zod-nestjs';
import {
  MelaAnnotationPage,
  MelaAnnotationPageSchema,
} from '@mela/text/shared';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { GhentCdhGuard } from '@ghentcdh/authentication/api';
import { RequestDto } from '@ghentcdh/json-forms/api';

import { AnnotationRepository } from './annotation-repository.service';
import { CreateAnnotationDto, MelaAnnotationPageDto } from './dto';
import { TextRepositoryService } from '../text/text-repository.service';

@UsePipes(ZodValidationPipe)
@Controller('text/:textId/annotation')
@ApiBearerAuth()
@UseGuards(GhentCdhGuard)
export class AnnotationTextController {
  constructor(
    private readonly repository: AnnotationRepository,
    private readonly textRepository: TextRepositoryService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    type: MelaAnnotationPageDto,
  })
  async listPhrases(
    @Param('textId') textId: string,
    @Query() params: RequestDto,
  ): Promise<MelaAnnotationPage> {
    params.filter.push(`text.id:${textId}:equals`);

    const [data, count] = await Promise.all([
      this.repository.list(params),
      this.repository.count(params.filter),
    ]);

    return MelaAnnotationPageSchema.parse({
      items: data,
    }) as unknown as MelaAnnotationPage;
  }

  @Post()
  @ApiCreatedResponse({
    type: MelaAnnotationPageDto,
  })
  async create(
    @Param('textId') textId: string,
    @Body() dto: CreateAnnotationDto,
  ): Promise<MelaAnnotationPageDto> {
    const text = await this.textRepository.findOne(textId);
    if (!text) {
      throw new Error('Text not found');
    }
    (dto as any).text_id = textId;

    return this.repository.create(dto);
  }
}
