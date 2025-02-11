import type { TranslatedAnnotation } from './mela_annotation';
import { TranslatedAnnotationInstance } from './mela_annotation';
import { parseAnnotationFromText } from './parse';

export const generateAnnotationBlocks = (
  sourceText: string,
  translatedText: string,
  originalAnnotations: TranslatedAnnotation[],
) => {
  const paragraphs = sourceText.split('\n').filter((a) => a.length > 0);

  // TODO define if this is really the end of a phrase
  const phrase = paragraphs
    .map((text, index) => text.split('.'))
    .flat()
    .filter((a) => a.length > 0);

  //

  const originalEquals = originalAnnotations.map((a) => a.equals());

  const generatedAnnotations = [
    paragraphs.map((annotation) =>
      TranslatedAnnotationInstance.parse(
        parseAnnotationFromText(sourceText, annotation, 'paragraph'),
        sourceText,
        translatedText,
      ),
    ),
    phrase.map((annotation) =>
      TranslatedAnnotationInstance.parse(
        parseAnnotationFromText(sourceText, annotation, 'phrase'),
        sourceText,
        translatedText,
      ),
    ),
  ]
    .flat()
    .filter((a) => !originalEquals.includes(a.equals()));

  return [originalAnnotations, generatedAnnotations].flat();
};
