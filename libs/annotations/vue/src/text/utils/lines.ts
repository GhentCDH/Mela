import type { TextLine } from '../../model';

export const textToLines = (text: string): TextLine[] => {
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
