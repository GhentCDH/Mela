import { MelaAnnotation } from '../mela_annotation';
import { Line } from '@ghentcdh/vue-component-annotated-text';
import { cloneDeep } from 'lodash-es';

export const splitTextInLines = (text: string): Line[] => {
  const lines = text.split(`\n`);
  let start = 0;
  return lines.map((text, index) => {
    // Add additional 1 because the \n symbol consist of 2 characters
    const end = start + text.length + 1;
    const line = {
      start,
      end,
      id: `line-${index}`,
      text,
    };

    start = end;

    return line;
  });
};

const findAnnotationsForLine = (line: Line, annotations: MelaAnnotation_[]) => {
  return annotations
    .filter((annotation) => {
      const { end, start } = annotation.target.selector;
      return start >= line.start && end <= line.end;
    })
    .sort((a, b) => a.target.selector.start - b.target.selector.start);
};

const buildNewLineFromTranslations = (
  start: number,
  line: Line,
  annotations: MelaAnnotation_[],
) => {
  let newLine = '';
  const translatedAnnotations: MelaAnnotation[] = [];

  annotations.forEach((annotation) => {
    if (!annotation.translated) {
      console.log('no translation found for annotation', annotation);
      return;
    }

    const translatedText = annotation.translated.transcription.text;
    newLine += translatedText;

    // If there is no original annotation then we don't add it as annotation
    if (annotation.originalAnnotation) {
      const translated = cloneDeep(annotation.translated);
      translated.start = start;
      translated.end = start + translatedText.length;
      translatedAnnotations.push(translated);
    }

    start = start + translatedText.length;
  });
  console.table(translatedAnnotations);

  // TODO what if there are no translations lined to a part of the line

  return {
    text: newLine,
    annotations: translatedAnnotations,
  };
};

export const linkTranslationsToLines = (
  lines: Line[],
  annotations: MelaAnnotation_[],
) => {
  let prevOriginalStart = 0;
  let start = 0;
  let translatedText = '';
  const data = lines.map((line) => {
    const newLine = buildNewLineFromTranslations(
      start,
      line,
      findAnnotationsForLine(line, annotations),
    );

    start = start + newLine.text.length + (line.start - prevOriginalStart);
    prevOriginalStart = line.start;

    translatedText = translatedText + newLine.text + '\n';

    return newLine;
  });

  return {
    lines: splitTextInLines(translatedText),
    annotations: data.map((l) => l.annotations).flat(),
  };
};
