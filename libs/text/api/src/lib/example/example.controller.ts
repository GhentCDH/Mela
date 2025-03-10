import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';

import { ExampleDto } from '@ghentcdh/mela/generated/dtos';

import { CreateExampleDto } from './dto';
import { ExampleRepository } from './example-repository.service';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('example')
@ApiBearerAuth()
// @UseGuards(MelaGuard)
export class ExampleController extends AbstractController<
  ExampleDto,
  CreateExampleDto
> {
  constructor(repository: ExampleRepository) {
    super(repository);
  }

  @Get('/:id')
  @ApiCreatedResponse({
    type: CreateExampleDto,
  })
  protected override async get(dto: CreateExampleDto): Promise<ExampleDto> {
    return super.create(dto);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateExampleDto,
  })
  override create(dto: CreateExampleDto): Promise<ExampleDto> {
    return super.create(dto);
  }
}
