import type { AnnotationTypeType } from '@ghentcdh/mela/generated/types';

const prefixMap: Record<AnnotationTypeType, string> = {
  text: 'mela:text:',
  text_content: 'mela:text-content:',
  example: 'mela:example:',
  annotation: 'mela:annotation:',
};
type PrefixType = keyof typeof prefixMap;

export const createUri = <T extends { id?: string } = { id?: string }>(
  type: AnnotationTypeType,
) => {
  const prefix = prefixMap[type];

  return ({ id }: T) => {
    if (!id) return null;
    return `${prefix}${id}`;
  };
};

export const getIdFromUri = (type: PrefixType) => {
  const prefix = prefixMap[type];

  return (uri: string) => {
    if (!uri) return null;
    if (!isUri(type)(uri)) return null;

    return uri.split(':')[2] ?? null;
  };
};

const isUri = (type: PrefixType) => {
  const prefix = prefixMap[type];
  return (uri: string) => {
    return uri ? uri?.startsWith?.(prefix) : false;
  };
};

export const getTypeFromUri = (uri: string) => {
  if (!uri) return null;
  const split = uri.split(':');

  const type = split[1] as AnnotationTypeType;

  if (type === 'text-content') return 'text_content';

  return type;
};

export const getTextContentUri = createUri('text_content');
export const getTextContentIdFromUri = getIdFromUri('text_content');
export const isTextContentUri = isUri('text_content');

export const getExampleUri = createUri('example');
export const getExampleIdFromUri = getIdFromUri('example');
export const isExampleUri = isUri('example');

export const getAnnotationUri = createUri('annotation');
export const getAnnotationIdFromUri = getIdFromUri('annotation');
export const isAnnoationUri = isUri('annotation');
