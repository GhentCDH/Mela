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
import { BookDto } from '@ghentcdh/mela/generated/dtos';

import { BookRepository } from './book-repository.service';
import { CreateBookDto, ListBookDto } from './dto';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('book')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
export class BookController extends AbstractController<BookDto, CreateBookDto> {
  constructor(repository: BookRepository) {
    super(repository);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListBookDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListBookDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: BookDto,
  })
  override async create(@Body() dto: CreateBookDto): Promise<BookDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: BookDto,
  })
  override async findOne(@Param('id') id: string): Promise<BookDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: BookDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateBookDto,
  ): Promise<BookDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: BookDto,
  })
  override async delete(@Param('id') id: string): Promise<BookDto> {
    return super.delete(id);
  }
}
