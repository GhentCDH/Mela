import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ExampleDto } from '@generated/dtos';
import { Controller, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateExampleDto } from './dto';
import { ExampleRepository } from './example-repository.service';
import { MelaGuard } from '../auth.guard';
import { AbstractController } from '../shared/controller';

@UsePipes(ZodValidationPipe)
@Controller('example')
@ApiBearerAuth()
@UseGuards(MelaGuard)
export class ExampleController extends AbstractController<
  ExampleDto,
  CreateExampleDto
> {
  constructor(repository: ExampleRepository) {
    super(repository);
  }
}
