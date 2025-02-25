import type { TextContentDto } from '@mela/text/shared';

import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';

import { parseAnnotationFromText } from './parse';

export const PREFIX_GENERATED = 'generated-';

const getEqualIdentifier = (sourceUri: string, annotation: W3CAnnotation) => {
  const target = findTextPositionSelector(sourceUri)(annotation) as any;

  if (!target) return null;

  const tag = findTagging(annotation)?.value;
  return [target.selector.start, target.selector.end, target.type, tag].join(
    '-',
  );
};

export const generateW3CAnnotationBlocks = (
  textContent: TextContentDto,
  originalAnnotations: W3CAnnotation[],
): W3CAnnotation[] => {
  const paragraphs = textContent.content
    .split('\n')
    .filter((a) => a.length > 0);

  // TODO define if this is really the end of a phrase
  const phrase = paragraphs
    .map((text, index) => text.split('.'))
    .flat()
    .filter((a) => a.length > 0);

  const originalEquals = originalAnnotations
    .map((a) => getEqualIdentifier(textContent.uri, a))
    .filter((a) => !!a);

  const generatedAnnotations: W3CAnnotation[] = [
    paragraphs.map((annotation) =>
      parseAnnotationFromText(
        textContent,
        annotation,
        'paragraph',
        PREFIX_GENERATED,
      ),
    ),
    phrase.map((annotation) =>
      parseAnnotationFromText(
        textContent,
        annotation,
        'phrase',
        PREFIX_GENERATED,
      ),
    ),
  ]
    .flat()
    .filter(
      (a) => !originalEquals.includes(getEqualIdentifier(textContent.uri, a)),
    );

  return [originalAnnotations, generatedAnnotations].flat() as W3CAnnotation[];
};
