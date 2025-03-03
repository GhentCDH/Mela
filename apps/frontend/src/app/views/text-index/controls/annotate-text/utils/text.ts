import type { TextContentDto } from '@mela/text/shared';

import type {
  SourceModel,
  W3CAnnotation} from '@ghentcdh/annotations/core';
import {
  SourceModelSchema,
  SourceTextSchema
} from '@ghentcdh/annotations/core';

import { generateW3CAnnotationBlocks } from './generate-blocks';

export class TextWithAnnotations {
  private annotations: W3CAnnotation[];
  public readonly sources: SourceModel[];

  constructor(sources: TextContentDto[]) {
    this.sources = sources.map((c) => {
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
  }

  private getSource(sourceId: string): SourceModel | undefined {
    return this.sources.find((s) => s.id === sourceId);
  }

  public setAnnotations(annotations: W3CAnnotation[]): W3CAnnotation[] {
    this.annotations = annotations;

    return annotations;
  }

  public autoGenerateAnnotations(sourceId: string): W3CAnnotation[] {
    this.annotations = generateW3CAnnotationBlocks(
      this.getSource(sourceId),
      this.annotations,
    );

    return this.annotations;
  }

  public cancelAnnotations(prefix: string) {
    this.annotations = this.annotations.filter((a) => !a.id.startsWith(prefix));
    return this.annotations;
  }

  public getAnnotationsByPrefix(prefix: string) {
    return this.annotations.filter((a) => a.id.startsWith(prefix));
  }
}
