import { createZodDto } from '@anatine/zod-nestjs';
import { AnnotationTypeSchema, LinkSchema } from '@mela/text/shared';
import { W3CAnnotationSchema } from '@ghentcdh/annotated-text';

export class AnnotationTypeDto extends createZodDto(AnnotationTypeSchema) {}
export class LinkTypeDto extends createZodDto(LinkSchema) {}

export class MelaAnnotationReturnDto extends createZodDto(
  W3CAnnotationSchema,
) {}
