import type { SourceModel, W3CAnnotation } from '@ghentcdh/annotations/core';
import {
  createTextSelectionFromText,
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotations/core';

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
  textContent: SourceModel | undefined,
  originalAnnotations: W3CAnnotation[],
): W3CAnnotation[] => {
  if (!textContent) {
    throw new Error('textContent is undefined');
  }
  const paragraphs = textContent.content.text
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
      createTextSelectionFromText(
        textContent,
        annotation,
        'paragraph',
        PREFIX_GENERATED,
      ),
    ),
    phrase.map((annotation) =>
      createTextSelectionFromText(
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

  return generatedAnnotations as W3CAnnotation[];
};
