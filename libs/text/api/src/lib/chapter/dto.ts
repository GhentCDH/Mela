import { createZodDto } from '@anatine/zod-nestjs';
import { ChapterFormSchema } from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/json-forms-api';
import { ChapterSchema } from '@ghentcdh/mela/generated/types';

export class CreateChapterDto extends createZodDto(
  ChapterFormSchema.dtoSchema,
) {}

export class ListChapterDto extends createResponseData(ChapterSchema) {}
