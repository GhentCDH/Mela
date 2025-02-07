import { createZodDto } from '@anatine/zod-nestjs';
import { createResponseData } from '@ghentcdh/tools/form/api';
import { MelaAnnotationPage, MelaAnnotationSchema } from '@mela/text/shared';

export class CreateAnnotationDto extends createZodDto(MelaAnnotationSchema) {}

export class MelaAnnotationPageDto extends createResponseData(
  MelaAnnotationPage,
) {}
