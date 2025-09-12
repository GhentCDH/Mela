import type { SourceModel, TextContentDto } from '@mela/text/shared';
import { SourceModelSchema, SourceTextSchema } from '@mela/text/shared';

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
        label: c.text_type.toLocaleLowerCase(),
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
