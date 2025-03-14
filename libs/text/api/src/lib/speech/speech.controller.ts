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

import { RequestDto } from '@ghentcdh/json-forms/api';
import { SpeechDto } from '@ghentcdh/mela/generated/dtos';

import { CreateSpeechDto, ListSpeechDto } from './dto';
import { SpeechRepository } from './speech-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('speech')
@ApiBearerAuth()
// @UseGuards(GhentCdhGuard)
export class SpeechController extends AbstractController<
  SpeechDto,
  CreateSpeechDto
> {
  constructor(repository: SpeechRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListSpeechDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListSpeechDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: SpeechDto,
  })
  override async create(@Body() dto: CreateSpeechDto): Promise<SpeechDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: SpeechDto,
  })
  override async findOne(@Param('id') id: string): Promise<SpeechDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: SpeechDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateSpeechDto,
  ): Promise<SpeechDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: SpeechDto,
  })
  override async delete(@Param('id') id: string): Promise<SpeechDto> {
    return super.delete(id);
  }
}
