import { createZodDto } from '@anatine/zod-nestjs';
import {
  MelaAnnotationPageSchema,
  MelaAnnotationSchema,
} from '@mela/text/shared';

import { createResponseData } from '@ghentcdh/tools/form/api';

export class CreateAnnotationDto extends createZodDto(MelaAnnotationSchema) {}

export class MelaAnnotationPageDto extends createResponseData(
  MelaAnnotationPageSchema,
) {}
