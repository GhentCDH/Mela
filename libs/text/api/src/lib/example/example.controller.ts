import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { Controller, UsePipes } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ExampleDto } from '@mela/generated-dtos';

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
}
