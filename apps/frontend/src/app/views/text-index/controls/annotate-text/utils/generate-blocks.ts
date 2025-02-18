import type { W3CAnnotation } from '@ghentcdh/annotations/core';
import { findSourceInTargets } from '@ghentcdh/annotations/core';
import type { TextContent } from '@ghentcdh/mela/generated/types';

import { parseAnnotationFromText } from './parse';

const getEqualIdentifier = (sourceUri: string, annotation: W3CAnnotation) => {
  const target = findSourceInTargets(sourceUri)(annotation) as any;

  if (!target) return null;

  return [target.source.start, target.source.end, target.type].join('-');
};

export const generateW3CAnnotationBlocks = (
  textContent: TextContent,
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
      parseAnnotationFromText(textContent, annotation, 'paragraph'),
    ),
    phrase.map((annotation) =>
      parseAnnotationFromText(textContent, annotation, 'phrase'),
    ),
  ]
    .flat()
    .filter(
      (a) => !originalEquals.includes(getEqualIdentifier(textContent.uri, a)),
    );

  return [originalAnnotations, generatedAnnotations].flat() as W3CAnnotation[];
};
