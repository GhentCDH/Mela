import type { W3CAnnotation } from '@ghentcdh/annotated-text';
import type { AnnotationNewWithRelations } from '@mela/generated-types';
import { getSectionTextUri } from '../utils/uri';

const mapBody = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['body'] => {
  return [
    {
      type: 'TextualBody',
      purpose: 'tagging',
      value: annotation.type.name,
    },
  ];
};

const mapTarget = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation['target'] => {
  const { textSelector } = annotation;
  const section_text_id = annotation.section_text_id;
  return {
    type: 'Text',
    source: section_text_id
      ? getSectionTextUri({ id: section_text_id })
      : undefined,
    selector: {
      type: 'TextPositionSelector',
      start: textSelector.start,
      end: textSelector.end,
    },
  };
};

export const mapToW3CAnnotation = (
  annotation: AnnotationNewWithRelations,
): W3CAnnotation => {
  return {
    id: annotation.id,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    motivation: 'tagging',
    body: mapBody(annotation),
    target: mapTarget(annotation),
  };
};
