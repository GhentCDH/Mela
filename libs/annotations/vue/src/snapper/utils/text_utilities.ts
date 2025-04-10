import Tokenizr from 'tokenizr';

import { type Line } from '@ghentcdh/vue-component-annotated-text';

//returns an array of tokens for a text, uses a defined word boundry
export function tokenize(text: string) {
  const lexer = new Tokenizr();

  //ignore word boundries
  lexer.rule(/†/, (ctx: { accept: (arg0: string) => void }) => {
    //ctx.accept("start char")
    ctx.accept('start');
  });

  //ignore line numbers
  lexer.rule(/\d+\./, (ctx: { ignore: () => void }) => {
    //ctx.accept("gutter")
    ctx.ignore();
  });

  //ignore whitespace
  lexer.rule(/(\s+)|(,)|\./, (ctx: { ignore: () => void }) => {
    //ctx.accept("whitespace or typograpy")
    ctx.ignore();
  });

  //token
  /* eslint-disable */
  lexer.rule(/[^\s,\.]+/, (ctx: { accept: (arg0: string) => void }) => {
    ctx.accept('token');
  });

  //parse the text
  lexer.input(text);
  return lexer.tokens();
}

/**
 * Searches through a text and returns start index positions if the search query
 * is found.
 * @param text the text to search through
 * @param search the search query to find in the text
 * @returns the start index positions for the query. If no indexes are found then
 * an empty array is returned.
 */
export function findAllIndexesOf(text: string, search: string): number[] {
  if (
    !text ||
    !search ||
    typeof text !== 'string' ||
    typeof search !== 'string' ||
    text.length == 0 ||
    search.length == 0
  ) {
    return [];
  }
  let indexes = [];
  let index = text.indexOf(search, 0);
  while (index != -1) {
    indexes.push(index);
    index = text.indexOf(search, index + 1);
  }
  return indexes;
}

export interface AnnotationFix {
  start: number;
  end: number;
  modified: boolean;
}

/**
 * Tries to match the text associated with an annotation to the full text and modifies te char start and stop indexes.
 *
 * @param text The annotated text.
 * @param annotationText The text associated with the annotation.
 * @param annotationStartCharIndex The current, unfixed annotation start character index.
 * @param annotationStopCharIndex The current, unfixed annotation stop charactar index.
 * @returns An array in three parts: the fixed start and stop index and a boolean
 * representing if the annotation text has been found.
 *
 */
export function shiftToAnnotationMetaDataText(
  text: string,
  annotationText: string,
  annotationStartCharIndex: number,
  annotationStopCharIndex: number,
  maxShift: number,
): AnnotationFix {
  const annotationLength = annotationStopCharIndex - annotationStartCharIndex;
  if (annotationLength != annotationText.length) {
    console.log(
      'Warning: annotation text length',
      annotationText.length,
      ': ',
      annotationText,
      ' and annotation length do not match',
      annotationLength,
    );
  }

  //strict matching, no fuzzy search
  //let indexes = [...text.matchAll(new RegExp(annotationText, 'g'))].map(a => a.index);
  //finds only first
  let indexes = findAllIndexesOf(text, annotationText);

  //only keep indexes close to start
  let filteredIndexes = indexes.filter(
    (startIndex) => Math.abs(startIndex - annotationStartCharIndex) <= maxShift,
  );
  //console.log("Indexes",indexes,filteredIndexes);
  if (filteredIndexes.length == 1) {
    //use the annotation text to determine end char index
    //console.log("fixes",[filteredIndexes[0],filteredIndexes[0] + annotationText.length]);
    return {
      start: filteredIndexes[0],
      end: filteredIndexes[0] + annotationText.length - 1,
      modified: true,
    };
  }

  //no single clear acceptable result
  return {
    start: annotationStartCharIndex,
    end: annotationStopCharIndex,
    modified: false,
  };
}

/**
 * this function changes the stop index and/or start index of the annotation to match
 * a word boundry in the given text. The text is tokenized with https://github.com/rse/tokenizr
 * @param text The text to use for word boundries
 * @param annotationStartCharIndex The unfixed character start index.
 * @param annotationStopCharIndex The unfixed character stop index.
 * @returns An array in three parts: the fixed start and stop index and a boolean
 * representing if a nearby word boundry has been found.
 */
export function shiftToWordBoundary(
  text: string,
  annotationStartCharIndex: number,
  annotationStopCharIndex: number,
  max_shift: number,
): AnnotationFix {
  //max shift dependent on annotation length (with a min of two characters)
  //shift goes in two directions -2 to +2 characters
  const maxAnnotationIndexShift = max_shift;

  // Create two maps:
  // one with the character index of each starting word
  // one with the character index of the end of each word
  const mapStartCharIndexToToken: { [index: number]: number } = {};
  const mapStopCharIndexToToken: { [index: number]: number } = {};

  tokenize(text).forEach((token: any) => {
    mapStartCharIndexToToken[token['pos']] = token;
    mapStopCharIndexToToken[token['pos'] + token['value'].length - 1] = token;
  });

  let newAnnotationStartCharIndex = -1;
  let newAnnotationStopCharIndex = -1;

  //search for closest token start or stop index by shifting the start and stop indexes and
  //doing a lookup in the maps.
  for (let shift = 0; shift < maxAnnotationIndexShift; shift++) {
    if (
      newAnnotationStartCharIndex == -1 &&
      mapStartCharIndexToToken[annotationStartCharIndex + shift]
    )
      newAnnotationStartCharIndex = annotationStartCharIndex + shift;

    if (
      newAnnotationStartCharIndex == -1 &&
      mapStartCharIndexToToken[annotationStartCharIndex - shift]
    )
      newAnnotationStartCharIndex = annotationStartCharIndex - shift;

    if (
      newAnnotationStopCharIndex == -1 &&
      mapStopCharIndexToToken[annotationStopCharIndex + shift]
    )
      newAnnotationStopCharIndex = annotationStopCharIndex + shift;
    if (
      newAnnotationStopCharIndex == -1 &&
      mapStopCharIndexToToken[annotationStopCharIndex - shift]
    )
      newAnnotationStopCharIndex = annotationStopCharIndex - shift;
  }

  //return if the start or stop have been modified
  let fixed = true;
  let fixedStart = true;
  let fixedStop = true;

  //no word boundry found in range at start
  if (newAnnotationStartCharIndex == -1) {
    newAnnotationStartCharIndex = annotationStartCharIndex;
    fixedStart = false;
  }

  //no word boundry found in range at stop
  if (newAnnotationStopCharIndex == -1) {
    newAnnotationStopCharIndex = annotationStopCharIndex;
    fixedStop = false;
  }
  fixed = fixedStart || fixedStop;

  return {
    start: newAnnotationStartCharIndex,
    end: newAnnotationStopCharIndex,
    modified: fixed,
  };
}

export const textToLines = (text: string): Line[] => {
  text = text.replace(/\r\n/g, '\n').replace(/\u000b/g, '\n');
  const regLineNumber = /^([0-9/]+[a-z]?)\./g;
  let lineStart = 0;
  let lineEnd = 0;
  let gutter = '';

  // split text into lines
  const lines = text.split('\n');
  const lineObjects = [] as Line[];

  // split lines into line number, text, start and end
  for (let i = 0; i < lines.length; i++) {
    lineEnd = lineStart + (lines[i].length - 1);
    let matchArray = lines[i].match(regLineNumber);

    if (matchArray) {
      gutter = matchArray[0];
    } else {
      gutter = '';
    }

    let lineObject: Line = {
      gutter: gutter,
      text: lines[i].replace(regLineNumber, ''),
      start: lineStart + gutter.length,
      end: lineEnd,
    } as Line;
    lineObjects.push(lineObject);
    lineStart = lineEnd + 2;

    //empty lines:
    lineObjects[i].end = Math.max(lineObjects[i].end, lineObjects[i].start);
  }
  return lineObjects;
};

export function shiftUpdateToWordBoundary(
  newStart: number,
  newEnd: number,
  mapStartCharIndexToToken: { [index: number]: number },
  mapStopCharIndexToToken: { [index: number]: number },
): AnnotationFix {
  const newAnnotationStartCharIndex =
    mapStartCharIndexToToken[newStart] ?? newStart;
  const newAnnotationStopCharIndex = mapStopCharIndexToToken[newEnd] ?? newEnd;
  console.log(
    'New Start:',
    newStart,
    'Mapped Start:',
    newAnnotationStartCharIndex,
  );
  console.log('New End:', newEnd, 'Mapped End:', newAnnotationStopCharIndex);

  const closestStart =
    mapStartCharIndexToToken[newStart] || mapStartCharIndexToToken[newEnd];
  const closestEnd =
    mapStopCharIndexToToken[newEnd] || mapStopCharIndexToToken[newStart];
  const modified = closestStart !== newStart || closestEnd !== newEnd;
  console.log('Closest Start:', closestStart);
  console.log('Closest End:', closestEnd);

  return {
    start: newAnnotationStartCharIndex,
    end: newAnnotationStopCharIndex,
    modified: modified,
  };
}

export function createWordBoundaryMaps(text: string): {
  mapStartCharIndexToToken: { [index: number]: number };
  mapStopCharIndexToToken: { [index: number]: number };
} {
  const mapStartCharIndexToToken: { [index: number]: number } = {};
  const mapStopCharIndexToToken: { [index: number]: number } = {};
  tokenize(text).forEach((token: any) => {
    const start = token.pos;
    const end = token.pos + token.value.length - 1;

    mapStartCharIndexToToken[start] = start;
    mapStopCharIndexToToken[end] = end;
  });

  for (let i = 0; i < text.length; i++) {
    if (!mapStartCharIndexToToken[i]) {
      // Find the closest previous start index
      mapStartCharIndexToToken[i] = i > 0 ? mapStartCharIndexToToken[i - 1] : 0;
    }
    if (!mapStopCharIndexToToken[i]) {
      // Find the closest previous end index
      mapStopCharIndexToToken[i] = i > 0 ? mapStopCharIndexToToken[i - 1] : 0;
    }
  }

  return { mapStartCharIndexToToken, mapStopCharIndexToToken };
}
