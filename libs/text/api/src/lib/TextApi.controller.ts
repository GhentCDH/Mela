import { Controller, Get, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';

import { TextDto } from '@ghentcdh/mela/generated/dtos';

import { TextApiRepository } from './text-api-repository.service';

@UsePipes(ZodValidationPipe)
@Controller('text')
export class TextApiController {
  constructor(private repository: TextApiRepository) {}

  @Get()
  async list(): Promise<TextDto[]> {
    return this.repository.list();
  }
}
