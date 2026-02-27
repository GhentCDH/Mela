import type { AnnotationTypeType } from '@mela/generated-types';

const prefixMap: Record<AnnotationTypeType, string> = {
  section: 'mela:section:',
  section_text: 'mela:section-text:',
  example: 'mela:example:',
  annotation: 'mela:annotation:',
  lemma: 'mela:lemma:',
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

  if (type === 'text-section_text') return 'section_text';

  return type;
};

export const getSectionTextUri = createUri('section_text');
export const getSectionTextIdFromUri = getIdFromUri('section_text');
export const isSectionTextUri = isUri('section_text');

export const getExampleUri = createUri('example');
export const getLemmaUri = createUri('lemma');
export const isLemmaUri = isUri('lemma');

export const getExampleIdFromUri = getIdFromUri('example');
export const isExampleUri = isUri('example');

export const getAnnotationUri = createUri('annotation');
export const getAnnotationIdFromUri = getIdFromUri('annotation');
export const isAnnoationUri = isUri('annotation');
