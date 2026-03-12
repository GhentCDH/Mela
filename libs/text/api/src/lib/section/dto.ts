import { createZodDto } from '@anatine/zod-nestjs';
import { SectionFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { SectionSchema } from '@mela/generated-types';

export class CreateSectionDto extends createZodDto(
  SectionFormSchema.dtoSchema,
) {}

export class SectionListDto extends createResponseData(SectionSchema) {}

export class MoveSectionDto extends createZodDto(
  SectionSchema.pick({ section_order: true }),
) {}
