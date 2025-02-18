import type { Text, TextContent } from '@ghentcdh/mela/generated/types';

export const getTextUri = (text: Pick<Text, 'id'>) => `mela:text:${text['id']}`;
export const getTextContentUri = (content: Pick<TextContent, 'id'>) =>
  `mela:text-content:${content['id']}`;
