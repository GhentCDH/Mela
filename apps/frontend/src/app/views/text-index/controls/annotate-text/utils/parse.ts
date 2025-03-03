import type { AnnotationMetadataType, TextContentDto } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';

import type { Annotation, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  TextualBodyClassifyingSchema,
  W3CAnnotationSchema,
  findTagging,
  updateBody,
  updateSelector,
} from '@ghentcdh/annotations/core';
import type { TextContent } from '@ghentcdh/mela/generated/types';

import { createTextualBody } from './edit/body.utils';
import type { ExampleMetadata} from './edit/edit-metadata';
import { updateExampleMetaData } from './edit/edit-metadata';
import { createTextPositionSelector } from './edit/target.utils';
import { PREFIX_GENERATED } from './generate-blocks';

export const PREFIX_NEW = 'new-';

export const parseAnnotationFromText = (
  text: TextContent,
  annotation: Annotation,
  type: AnnotationMetadataType,
  prefix = PREFIX_NEW,
): W3CAnnotation => {
  const start = text.content.indexOf(annotation);
  const end = start + annotation.length;
  return parseAnnotation(text, { start, end }, type, prefix);
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
    createTextPositionSelector(sourceUri, language, annotation),
  );
  updatedAnnotation = updateBody(
    updatedAnnotation,
    createTextualBody(text, sourceUri, language, annotation),
  );

  return updatedAnnotation;
};

export type EditableAnnotation = {
  isNew: () => boolean;
  hasChanges: () => boolean;
  getId: () => string;
  getType: () => string;
  getAnnotation: () => W3CAnnotation;
  getSource: () => TextContentDto;
  getTarget: () => TextContentDto;
  updatePurpose: (textType: AnnotationMetadataType) => W3CAnnotation;
  updateTranslation: (annotationToUpdate: AnnotationUpdate) => W3CAnnotation;
  updateSource: (annotationToUpdate: AnnotationUpdate) => W3CAnnotation;
  undoChanges: () => W3CAnnotation;
  updateExampleMetaData: (metaData: ExampleMetadata) => W3CAnnotation;
};

export const editableAnnotation = (
  annotation: W3CAnnotation,
  source: TextContentDto,
  translation: TextContentDto,
): EditableAnnotation => {
  // TODO add some validation if type = example then body should not be able to translate

  const originalAnnotation = W3CAnnotationSchema.parse(annotation);
  let hasChanges = false;
  const undoChanges = () => {
    annotation = W3CAnnotationSchema.parse(originalAnnotation);
    return originalAnnotation;
  };

  return {
    isNew: () =>
      annotation.id.startsWith(PREFIX_NEW) ||
      annotation.id.startsWith(PREFIX_GENERATED),
    getId: () => annotation.id,
    getType: () => findTagging(annotation)?.value ?? 'phrase',
    getSource: () => source,
    getTarget: () => translation,
    getAnnotation: () => annotation,
    hasChanges: () => hasChanges,
    undoChanges,
    updatePurpose: (textType: AnnotationMetadataType) => {
      hasChanges = true;
      return updatePurpose(annotation, textType);
    },
    updateTranslation: (annotationToUpdate: AnnotationUpdate) => {
      hasChanges = true;
      return updateTextSelection(
        translation.uri,
        annotation,
        annotationToUpdate,
        translation.content,
        translation.language,
      );
    },
    updateSource: (annotationToUpdate: AnnotationUpdate) => {
      hasChanges = true;
      return updateTextSelection(
        source.uri,
        annotation,
        annotationToUpdate,
        source.content,
        source.language,
      );
    },
    updateExampleMetaData: (metaData: ExampleMetadata) => {
      hasChanges = true;
      return updateExampleMetaData(annotation, metaData);
    },
  };
};

export const parseAnnotation = (
  text: TextContentDto,
  annotation: Pick<Annotation, 'start' | 'end'> & { id?: string },
  textType: AnnotationMetadataType,
  prefix = PREFIX_NEW,
): W3CAnnotation => {
  // TODO add prefix and suffix from the text
  const { language, uri: sourceUri, content } = text;

  return W3CAnnotationSchema.parse({
    // The W3C Annotation model
    id: annotation.id ?? `${prefix}${uuidv4()}`,
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    body: [
      TextualBodyClassifyingSchema.parse({ value: textType }),
      createTextualBody(content, sourceUri, language, annotation),
    ],
    target: [createTextPositionSelector(sourceUri, language, annotation)],
  });
};
