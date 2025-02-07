import { createZodDto } from '@anatine/zod-nestjs';
import { createResponseData } from '@ghentcdh/tools/form/api';
import { MelaAnnotationSchema } from '@mela/text/shared';

export class CreateAnnotationDto extends createZodDto(
  MelaAnnotationSchema.dtoSchema,
) {}

export class ListAnnotationDto extends createResponseData(
  MelaAnnotationSchema,
) {}
