import { v4 as uuidv4 } from 'uuid';

import type { type SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';
import {
  MarkdownTextAdapter,
  TextualBodyClassifyingSchema,
  createTextSelectionAnnotation,
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/annotated-text';

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

  const markdownTextAdapater = MarkdownTextAdapter({});

  const lines = markdownTextAdapater.parse(textContent.content.text);
  const sourceUri = textContent.uri;
  const language = textContent.content.processingLanguage || 'en';

  const createW3CAnnotation = (
    a: {
      start: number;
      end: number;
      text: string;
    },
    type: string,
  ) => {
    const w3c = createTextSelectionAnnotation(sourceUri, language, a.text, {
      id: `${PREFIX_GENERATED}${uuidv4()}`,
      ...a,
    });

    w3c.body.push(TextualBodyClassifyingSchema.parse({ value: type }));

    return w3c;
  };
  const paragraphs = lines.map((a) => createW3CAnnotation(a, 'paragraph'));

  const phrases = lines
    .map((paragraph) => {
      const { flatText, start: paragraphStart } = paragraph;
      const sentences = flatText.split('.');

      let offset = 0;

      return sentences.map((rawSentence, index) => {
        const trimmed = rawSentence.trimStart();

        if (trimmed.length === 0) {
          offset += rawSentence.length + 1; // +1 for the dot
          return null;
        }

        const leadingSpaces = rawSentence.length - trimmed.length;
        const start = paragraphStart + offset + leadingSpaces;
        const end = start + trimmed.length;
        const text = trimmed + (index < sentences.length - 1 ? '.' : '');

        offset += rawSentence.length + 1; // original sentence length + dot

        return createW3CAnnotation({ start, end, text }, 'phrase');
      });
    })
    .flat()
    .filter(Boolean); // remove nulls

  const originalEquals = originalAnnotations
    .map((a) => getEqualIdentifier(textContent.uri, a))
    .filter((a) => !!a);
  const generatedAnnotations: W3CAnnotation[] = [paragraphs, phrases]
    .filter(
      (a) =>
        Boolean(a) &&
        !originalEquals.includes(getEqualIdentifier(textContent.uri, a)),
    )
    .flat();

  return generatedAnnotations;
};
