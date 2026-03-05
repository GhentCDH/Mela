import { createZodDto } from '@anatine/zod-nestjs';
import { annotationDto, LinkSchema } from '@mela/text/shared';
import { W3CAnnotationSchema } from '@ghentcdh/annotated-text';

export class AnnotationTypeDto extends createZodDto(annotationDto) {}
export class LinkTypeDto extends createZodDto(LinkSchema) {}

export class MelaAnnotationReturnDto extends createZodDto(
  W3CAnnotationSchema,
) {}
