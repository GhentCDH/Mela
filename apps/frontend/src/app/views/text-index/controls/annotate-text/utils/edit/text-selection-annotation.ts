import type { AnnotationMetadataType } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type {
  Annotation,
  SourceModel,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import {
  TextualBodyClassifyingSchema,
  updateBody,
  updateSelector,
  W3CAnnotationSchema,
} from '@ghentcdh/annotations/core';

import { createTextualBody } from './body.utils';
import { createTextPositionSelector } from './target.utils';

type AnnotationUpdate = Pick<Annotation, 'start' | 'end'> & { id?: string };
export const PREFIX_NEW = 'new-';

export const updateTextSelection = (
  sourceUri: string,
  w3CAnnotation: W3CAnnotation,
  annotation: AnnotationUpdate,
  text: string,
  language = 'en',
) => {
  let updatedAnnotation = updateSelector(
    w3CAnnotation,
    createTextPositionSelector(sourceUri, language, annotation),
  );
  updatedAnnotation = updateBody(
    updatedAnnotation,
    createTextualBody(text, sourceUri, language, annotation),
  );

  return updatedAnnotation;
};

export const createTextSelectionAnnotation = (
  text: SourceModel,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
  textType: AnnotationMetadataType,
  prefix = PREFIX_NEW,
): W3CAnnotation => {
  // TODO add prefix and suffix from the text
  const { uri: sourceUri, content } = text;
  const { processingLanguage: language } = content;

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: annotation.id ?? `${prefix}${uuidv4()}`,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      TextualBodyClassifyingSchema.parse({ value: textType }),
      createTextualBody(content.text, sourceUri, language, annotation),
    ],
    target: [createTextPositionSelector(sourceUri, language, annotation)],
  });
};

export const createTextSelectionFromText = (
  text: SourceModel,
  annotation: Annotation,
  type: AnnotationMetadataType,
  prefix = PREFIX_NEW,
): W3CAnnotation => {
  const start = text.content.text.indexOf(annotation);
  const end = start + annotation.length;
  return createTextSelectionAnnotation(text, { start, end }, type, prefix);
};
