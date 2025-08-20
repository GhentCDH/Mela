import { createZodDto } from '@anatine/zod-nestjs';
import { ExampleFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { ExampleSchema } from '@ghentcdh/mela/generated/types';

export class CreateExampleDto extends createZodDto(
  ExampleFormSchema.dtoSchema,
) {}

export class ListExampleDto extends createResponseData(ExampleSchema) {}
