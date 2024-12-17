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
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { AuthorDto } from '@ghentcdh/mela/generated/dtos';
import { RequestDto } from '@ghentcdh/tools/form';

import { AuthorRepository } from './author-repository.service';
import { CreateAuthorDto, ListAuthorDto, authorSchema } from './author.schema';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('author')
export class AuthorController extends AbstractController<
  AuthorDto,
  CreateAuthorDto
> {
  constructor(repository: AuthorRepository) {
    super(repository, authorSchema);
  }

  @Get()
  @ApiCreatedResponse({
    type: ListAuthorDto,
  })
  override async list(@Query() params: RequestDto): Promise<ListAuthorDto> {
    return super.list(params);
  }

  @Post()
  @ApiCreatedResponse({
    type: AuthorDto,
  })
  override async create(@Body() dto: CreateAuthorDto): Promise<AuthorDto> {
    return super.create(dto);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: AuthorDto,
  })
  override async findOne(@Param('id') id: string): Promise<AuthorDto> {
    return super.findOne(id);
  }

  @Patch('/:id')
  @ApiResponse({
    type: AuthorDto,
  })
  override async update(
    @Param('id') id: string,
    @Body() dto: CreateAuthorDto
  ): Promise<AuthorDto> {
    return super.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    type: AuthorDto,
  })
  override async delete(@Param('id') id: string): Promise<AuthorDto> {
    return super.delete(id);
  }
}
