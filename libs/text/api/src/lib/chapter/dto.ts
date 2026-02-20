import { createZodDto } from '@anatine/zod-nestjs';
import { ChapterFormSchema } from '@mela/text/shared';
import { z } from 'zod';

import { createResponseData } from '@ghentcdh/json-forms-api';
import {
  ChapterSchema,
  TextWithRelationsSchema,
} from '@mela/generated-types';

export class CreateChapterDto extends createZodDto(
  ChapterFormSchema.dtoSchema,
) {}

export const ChapterListSchema = ChapterSchema.extend({
  text: z.lazy(() => TextWithRelationsSchema).array(),
});

export class ListChapterDto extends createResponseData(ChapterListSchema) {}
