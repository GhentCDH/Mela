import { createZodDto } from '@anatine/zod-nestjs';
import {
  AnnotationTypeSchema,
  MelaAnnotationReturnSchema,
} from '@mela/text/shared';

export class AnnotationTypeDto extends createZodDto(AnnotationTypeSchema) {}

export class MelaAnnotationReturnDto extends createZodDto(
  MelaAnnotationReturnSchema,
) {}
