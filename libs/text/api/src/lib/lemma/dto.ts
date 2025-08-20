import { createZodDto } from '@anatine/zod-nestjs';
import { LemmaFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { LemmaWithRelationsSchema } from '@ghentcdh/mela/generated/types';

export class CreateLemmaDto extends createZodDto(LemmaFormSchema.dtoSchema) {}

export class ListLemmaDto extends createResponseData(
  LemmaWithRelationsSchema,
) {}
