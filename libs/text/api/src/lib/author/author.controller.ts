import { ZodValidationPipe } from '@anatine/zod-nestjs';
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
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';

import { AuthorDto } from '@ghentcdh/mela/generated/dtos';
import { ResponseData } from '@ghentcdh/tools/form';

import { AuthorRepository } from './author-repository.service';
import { CreateAuthorDto, authorSchema } from './author.schema';

@UsePipes(ZodValidationPipe)
@Controller('author')
export class AuthorController {
  constructor(private repository: AuthorRepository) {}

  @Get()
  async list(): Promise<ResponseData<AuthorDto>> {
    const data = await this.repository.list();

    return { data };
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AuthorDto,
  })
  async create(@Body() dto: CreateAuthorDto): Promise<AuthorDto> {
    return this.repository.create(dto);
  }

  @Patch('/:id')
  @ApiResponse({
    description: 'The record has been successfully updated.',
    type: AuthorDto,
  })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateAuthorDto
  ): Promise<AuthorDto> {
    return this.repository.update(id, dto);
  }

  @Delete('/:id')
  @ApiResponse({
    description: 'The record has been successfully updated.',
    type: AuthorDto,
  })
  async delete(@Param('id') id: string): Promise<AuthorDto> {
    return this.repository.delete(id);
  }

  @Get('schema')
  async schema() {
    return authorSchema;
  }
}
