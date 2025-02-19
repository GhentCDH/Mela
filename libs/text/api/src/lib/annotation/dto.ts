import { createZodDto } from '@anatine/zod-nestjs';
import {
  MelaAnnotationPageSchema,
  MelaAnnotationSchema,
  getTextContentIdFromUri,
} from '@mela/text/shared';

import {
  W3CAnnotationBody,
  W3CAnnotationTarget,
  getBody,
  getTarget,
} from '@ghentcdh/annotations/core';
import { createResponseData } from '@ghentcdh/json-forms/api';
import {
  AnnotationBodyWithRelations,
  AnnotationTargetWithRelations,
} from '@ghentcdh/mela/generated/types';

const mapBody = (body: W3CAnnotationBody): AnnotationBodyWithRelations => {
  console.log(body);

  return {
    value: JSON.stringify(body),
    source_id: getTextContentIdFromUri((body as any).source),
  } as AnnotationBodyWithRelations;
};

const mapTarget = (
  target: W3CAnnotationTarget,
): AnnotationTargetWithRelations => {
  return {
    value: JSON.stringify(target),
    source_id: getTextContentIdFromUri(target.source),
  } as AnnotationTargetWithRelations;
};

const createSchema = MelaAnnotationSchema.transform((schema) => {
  return {
    ...schema,
    annotationBody: getBody(schema as any).map(mapBody),
    annotationTarget: getTarget(schema as any).map(mapTarget),
  };
});

export class CreateAnnotationDto extends createZodDto(createSchema) {}

export class MelaAnnotationPageDto extends createResponseData(
  MelaAnnotationPageSchema,
) {}
