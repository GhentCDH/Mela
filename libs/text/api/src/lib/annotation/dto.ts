import { createZodDto } from '@anatine/zod-nestjs';
import {
  getIdFromUri,
  getTextContentIdFromUri,
  getTypeFromUri,
  MelaAnnotationPageSchema,
  MelaAnnotationSchema,
} from '@mela/text/shared';
import { pick } from 'lodash-es';

import {
  getBody,
  getTarget,
  W3CAnnotationBody,
  W3CAnnotationTarget,
} from '@ghentcdh/annotated-text';
import { createResponseData } from '@ghentcdh/json-forms-api';
import {
  AnnotationBodyWithRelations,
  AnnotationTargetWithRelations,
} from '@mela/generated-types';

const mapBody = (body: W3CAnnotationBody): AnnotationBodyWithRelations => {
  // const source_id = getSourceIdFromUri(uri);

  return {
    value: body as any,
    // text_content_id: getTextContentIdFromUri(uri),
    // example_id: getExampleIdFromUri(uri),
    // source_id,
  } as AnnotationBodyWithRelations;
};

const getSourceId = (target: W3CAnnotationTarget) => {
  if (target.source) return getTextContentIdFromUri(target.source);

  return null;
};

const mapTarget = (
  target: W3CAnnotationTarget,
): AnnotationTargetWithRelations => {
  const uri = target.source;
  const source_type = getTypeFromUri(uri);
  const source_id = getIdFromUri(source_type)(uri);

  return {
    value: target as any,
    source_id,
    source_type,
  } as AnnotationTargetWithRelations;
};

const createSchema = MelaAnnotationSchema.transform((schema) => {
  return {
    // ...schema,
    ...pick(schema, ['id', 'motivation', 'text_id']),
    annotationBody: getBody(schema as any).map(mapBody),
    annotationTarget: getTarget(schema as any).map(mapTarget),
  };
});

export class CreateAnnotationDto extends createZodDto(createSchema) {}

export class MelaAnnotationPageDto extends createResponseData(
  MelaAnnotationPageSchema,
) {}
