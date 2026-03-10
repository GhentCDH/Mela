import {
  SpecificResourceSchema,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import type {
  AnnotationNewWithRelations,
  AnnotationRelation,
} from '@mela/generated-types';
import { getAnnotationUri, getSectionTextUri } from '../utils/uri';

const mapTextualBody = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['body'] => {
  return {
    type: 'TextualBody',
    purpose: 'tagging',
    value: annotation.type.id,
  };
};

const mapValue = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['body'] => {
  const value = annotation.value as Record<string, unknown> | null;

  if (!value || Object.keys(value).length < 1)
    return [] as W3CAnnotation['body'];

  return SpecificResourceSchema.parse({
    value,
  });
};

const mapBody = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['body'] => {
  const body: W3CAnnotation['body'] = [
    mapTextualBody(annotation),
    mapValue(annotation),
  ].flat();

  return body;
};

const mapTextTarget = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['target'][] => {
  const { textSelector } = annotation;
  if (!textSelector) {
    return [];
  }

  const section_text_id = annotation.textSelector?.section_text_id;
  return [
    {
      type: 'Text',
      source: getSectionTextUri({ id: section_text_id }),
      selector: {
        type: 'TextPositionSelector',
        start: textSelector.start,
        end: textSelector.end,
      },
    },
  ];
};

const mapRelationToTarget = (
  relation: AnnotationRelation,
): W3CAnnotation['target'] => {
  return {
    source_id: relation.annotation_to_id,
    source: getAnnotationUri({ id: relation.annotation_to_id }),
    source_type: 'annotation',
  };
};

const mapAnnotationTarget = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['target'][] => {
  const { relationsFrom } = annotation;
  if (!relationsFrom) {
    return [];
  }

  return relationsFrom.map(mapRelationToTarget);
};

export const mapToW3CAnnotation = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation => {
  return {
    id: annotation.id,
    uri: getAnnotationUri(annotation),
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    motivation: 'tagging',
    body: mapBody(annotation),
    target: [mapTextTarget(annotation), mapAnnotationTarget(annotation)].flat(),
  };
};
