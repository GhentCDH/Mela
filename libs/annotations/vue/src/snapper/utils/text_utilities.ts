import Tokenizr from 'tokenizr';

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
