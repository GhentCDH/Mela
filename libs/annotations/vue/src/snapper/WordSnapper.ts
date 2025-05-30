import type { Snapper, UseSnapper } from './snapper';
import { tokenize } from './utils/text_utilities';

export class WordSnapper implements Snapper {
  private readonly mapStartCharIndexToToken: { [index: number]: number } = {};
  private readonly mapStopCharIndexToToken: { [index: number]: number } = {};

  constructor(text: string) {
    tokenize(text).forEach((token: any) => {
      const start = token.pos;
      const end = token.pos + token.value.length - 1;

      this.mapStartCharIndexToToken[start] = start;
      this.mapStopCharIndexToToken[end] = end;
    });

    for (let i = 0; i < text.length; i++) {
      if (!this.mapStartCharIndexToToken[i]) {
        // Find the closest previous start index
        this.mapStartCharIndexToToken[i] =
          i > 0 ? this.mapStartCharIndexToToken[i - 1] : 0;
      }
      if (!this.mapStopCharIndexToToken[i]) {
        // Find the closest previous end index
        this.mapStopCharIndexToToken[i] =
          i > 0 ? this.mapStopCharIndexToToken[i - 1] : 0;
      }
    }
  }

  fixOffset(newStart: number, newEnd: number) {
    const closestStart =
      this.mapStartCharIndexToToken[newStart] ??
      this.mapStartCharIndexToToken[newEnd];
    const closestEnd =
      this.mapStopCharIndexToToken[newEnd] ??
      this.mapStopCharIndexToToken[newStart];

    return {
      start: closestStart,
      end: closestEnd,
      modified: closestStart !== newStart || closestEnd !== newEnd,
    };
  }
}

export const useWordSnapper: UseSnapper<WordSnapper> = {
  initSnapper: (text: string) => new WordSnapper(text),
};
