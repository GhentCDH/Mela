import { v4 as uuidv4 } from 'uuid';

import { W3CAnnotationSchema } from '@ghentcdh/annotated-text';

import type {
  SourceModel,
  TextAnnotation,
  W3CAnnotation} from '../model';
import {
  TextTargetSchema,
  TextualBodyClassifyingSchema,
  TextualBodySchema
} from '../model';
import { getBody, updateBody } from './body.utils';
import { getTarget, updateSelector } from './target.utils';

type AnnotationUpdate = Pick<TextAnnotation, 'start' | 'end'> & { id?: string };

export const createTextualBody = (
  text: string,
  sourceUri: string,
  language: string,
  annotation: Pick<TextAnnotation, 'start' | 'end'> & { id?: string },
) => {
  const textValue = text.substring(annotation.start, annotation.end + 1);
  return TextualBodySchema.parse({
    language: language,
    value: textValue,
    source: sourceUri,
  });
};

export const PREFIX_NEW = 'new-';
export const createTextPositionSelector = (
  sourceUri: string,
  language: string,
  annotation: AnnotationUpdate,
) => {
  return TextTargetSchema.parse({
    source: sourceUri,
    textDirection: 'ltr',
    type: 'Text',
    processingLanguage: language,
    selector: {
      type: 'TextPositionSelector',
      start: annotation.start,
      end: annotation.end,
    },
  });
};

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

export const createTextSelectionAnnotation = <TEXT_TYPE>(
  text: SourceModel,
  annotation: AnnotationUpdate,
  textType: TEXT_TYPE,
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

export const updateTextSelectionAnnotation = <TEXT_TYPE>(
  originalAnnotation: W3CAnnotation,
  text: SourceModel,
  annotation: AnnotationUpdate,
): W3CAnnotation => {
  // TODO add prefix and suffix from the text
  const { uri: sourceUri, content } = text;
  const { processingLanguage: language } = content;

  const textualBody = createTextualBody(
    content.text,
    sourceUri,
    language,
    annotation,
  );
  const textPositionSelector = createTextPositionSelector(
    sourceUri,
    language,
    annotation,
  );

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    ...originalAnnotation,
    body: getBody(originalAnnotation).map((b) =>
      b.type === textualBody.type ? textualBody : b,
    ),
    target: getTarget(originalAnnotation).map((t) =>
      t.type === textPositionSelector.type ? textPositionSelector : t,
    ),
  });
};

export const createTextSelectionFromText = <TYPE>(
  text: SourceModel,
  annotation: TextAnnotation,
  type: TYPE,
  prefix = PREFIX_NEW,
): W3CAnnotation => {
  const start = text.content.text.indexOf(annotation);
  const end = start + annotation.length;
  return createTextSelectionAnnotation(text, { start, end }, type, prefix);
};
