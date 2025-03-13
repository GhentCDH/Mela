import type { TextContentDto } from '@mela/text/shared';

import type { SourceModel } from '@ghentcdh/annotations/core';
import {
  SourceModelSchema,
  SourceTextSchema,
} from '@ghentcdh/annotations/core';

const getSource = (
  sources: SourceModel[],
  sourceId: string,
): SourceModel | undefined => {
  return sources.find((s) => s.id === sourceId);
};

const getSourceByUri = (
  sources: SourceModel[],
  sourceId: string,
): SourceModel | undefined => {
  return sources.find((s) => s.uri === sourceId);
};

export const createSourceFromTextContent = (
  sources: TextContentDto[],
): SourceModel[] => {
  return sources.map((c) => {
    return SourceModelSchema.parse({
      content: SourceTextSchema.parse({
        text: c.content,
        processingLanguage: c.language,
      }),
      id: c.id,
      type: 'text',
      uri: c.uri,
    });
  });
};

export const SourceUtils = (sources: SourceModel[]) => {
  return {
    getSource: (sourceId: string) => getSource(sources, sourceId),
    getSourceByUri: (sourceId: string) => getSourceByUri(sources, sourceId),
  };
};
