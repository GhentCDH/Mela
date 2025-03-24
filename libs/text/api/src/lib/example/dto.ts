import { createZodDto } from '@anatine/zod-nestjs';
import { ExampleSchema } from '@generated/types';
import { ExampleFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms/api';

export class CreateExampleDto extends createZodDto(
  ExampleFormSchema.dtoSchema,
) {}

export class ListExampleDto extends createResponseData(ExampleSchema) {}
