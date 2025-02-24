// eslint-disable @typescript-eslint/consistent-type-imports
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { TextFormSchema, textParseFileTypes } from '@mela/text/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';

import { RequestDto } from '@ghentcdh/json-forms/api';
import { TextWithRelationsDto } from '@ghentcdh/mela/generated/dtos';
import { TextWithRelations } from '@ghentcdh/mela/generated/types';

import { CreateTextDto, ListTextDto } from './dto';
import { TextUploadDto } from './file-upload.dto';
import { TextImportService } from './text-import.service';
import { TextRepositoryService } from './text-repository.service';
import { MelaGuard } from '../auth.guard';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('text')
@ApiBearerAuth()
@UseGuards(MelaGuard)
export class TextController extends AbstractController<
  TextWithRelations,
  CreateTextDto
> {
  constructor(
    repository: TextRepositoryService,
    private readonly textImportService: TextImportService,
  ) {
    super(repository);
  }

  @Post('/:id/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an excell with the text',
    type: TextUploadDto,
  })
  async upload(
    @Param('id') id: string,
    @UploadedFile()
    file: any,
  ): Promise<TextWithRelations> {
    if (!textParseFileTypes.some((type) => file?.mimetype))
      throw new UnprocessableEntityException('Invalid file type');

    return this.textImportService.parse(id, file);
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
    return super.findOneAndParse(id, TextFormSchema.dtoSchema);
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
