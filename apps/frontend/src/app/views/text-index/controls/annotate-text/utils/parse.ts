import type { AnnotationMetadataType, TextContentDto } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type { Annotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTagging,
  TextTargetSchema,
  TextualBodyClassifyingSchema,
  TextualBodySchema,
  updateBody,
  updateSelector,
  W3CAnnotationSchema,
} from '@ghentcdh/annotations/core';
import type { TextContent } from '@ghentcdh/mela/generated/types';

export const PREFIX_NEW = 'new-';

export const parseAnnotationFromText = (
  text: TextContent,
  annotation: Annotation,
  type: AnnotationMetadataType,
): W3CAnnotation => {
  const start = text.content.indexOf(annotation);
  const end = start + annotation.length;
  return parseAnnotation(text, { start, end }, type);
};

export const createTarget = (
  sourceUri: string,
  language: string,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
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

export const createBody = (
  text: string,
  sourceUri: string,
  language: string,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
) => {
  const textValue = text.substring(annotation.start, annotation.end);
  return TextualBodySchema.parse({
    language: language,
    value: textValue,
    source: sourceUri,
  });
};

const updatePurpose = (
  w3CAnnotation: W3CAnnotation,
  textType: AnnotationMetadataType,
) => {
  return updateBody(
    w3CAnnotation,
    TextualBodyClassifyingSchema.parse({ value: textType }),
  );
};

type AnnotationUpdate = Pick<Annotation, 'start' | 'end'> & { id?: string };

const updateTextSelection = (
  sourceUri: string,
  w3CAnnotation: W3CAnnotation,
  annotation: AnnotationUpdate,
  text: string,
  language = 'en',
) => {
  let updatedAnnotation = updateSelector(
    w3CAnnotation,
    createTarget(sourceUri, language, annotation),
  );
  updatedAnnotation = updateBody(
    updatedAnnotation,
    createBody(text, sourceUri, language, annotation),
  );

  return updatedAnnotation;
};

export type EditableAnnotation = {
  getId: () => string;
  getType: () => string;
  getAnnotation: () => W3CAnnotation;
  getSource: () => TextContentDto;
  getTarget: () => TextContentDto;
  updatePurpose: (textType: AnnotationMetadataType) => W3CAnnotation;
  updateTranslation: (annotationToUpdate: AnnotationUpdate) => W3CAnnotation;
  updateSource: (annotationToUpdate: AnnotationUpdate) => W3CAnnotation;
};

export const editableAnnotation = (
  annotation: W3CAnnotation,
  source: TextContentDto,
  translation: TextContentDto,
): EditableAnnotation => {
  return {
    getId: () => annotation.id,
    getType: () => findTagging(annotation)?.value ?? 'phrase',
    getSource: () => source,
    getTarget: () => translation,
    getAnnotation: () => annotation,
    updatePurpose: (textType: AnnotationMetadataType) =>
      updatePurpose(annotation, textType),
    updateTranslation: (annotationToUpdate: AnnotationUpdate) =>
      updateTextSelection(
        translation.uri,
        annotation,
        annotationToUpdate,
        translation.content,
        translation.language,
      ),
    updateSource: (annotationToUpdate: AnnotationUpdate) =>
      updateTextSelection(
        translation.uri,
        annotation,
        annotationToUpdate,
        source.content,
        source.language,
      ),
  };
};

export const parseAnnotation = (
  text: TextContent,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
  textType: AnnotationMetadataType,
): W3CAnnotation => {
  // TODO add prefix and suffix from the text
  const { language, uri: sourceUri, content } = text;

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: annotation.id ?? `${PREFIX_NEW}${uuidv4()}`,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      TextualBodyClassifyingSchema.parse({ value: textType }),
      createBody(content, sourceUri, language, annotation),
    ],
    target: [createTarget(sourceUri, language, annotation)],
  });
};
