import { parseAnnotationFromText } from '../parse';

export const generateBlocks = (text: string) => {
  const paragraphs = text.split('\n');
  const phrase = paragraphs.map((text, index) => text.split('\.')).flat();

  //

  return [
    paragraphs.map((annotation) =>
      parseAnnotationFromText(text, annotation, 'paragraph'),
    ),
    phrase.map((annotation) =>
      parseAnnotationFromText(text, annotation, 'phrase'),
    ),
  ];
};
