import type {
  Annotation} from '@ghentcdh/annotations/core';
import {
  SpecificResourceSchema,
  TextualBodySchema,
} from '@ghentcdh/annotations/core';

export const createTextualBody = (
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

export const createSpecificResource = (sourceUri: string, metaData: any) => {
  return SpecificResourceSchema.parse({
    source: sourceUri,
    value: metaData,
  });
};
