import { createZodDto } from '@anatine/zod-nestjs';
import { SectionFormSchema } from '@mela/text/shared';
import { z } from 'zod';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { SectionSchema, TextWithRelationsSchema } from '@mela/generated-types';

export class CreateSectionDto extends createZodDto(
  SectionFormSchema.dtoSchema,
) {}

export const SectionListSchema = SectionSchema.extend({
  text: z.lazy(() => TextWithRelationsSchema).array(),
});

export class SectionListDto extends createResponseData(SectionListSchema) {}
