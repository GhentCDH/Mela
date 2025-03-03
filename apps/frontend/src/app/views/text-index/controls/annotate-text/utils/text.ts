import type { AnnotationMetadataType, TextContentDto } from '@mela/text/shared';

import {
  SourceModel,
  SourceModelSchema,
  SourceTextSchema,
  TextualBodyClassifyingSchema,
  updateBody,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';

import { generateW3CAnnotationBlocks } from './generate-blocks';
import { pick } from 'lodash-es';
import { TextAnnotation } from '@ghentcdh/annotations/vue';
import { createTextSelectionAnnotation } from './edit/text-selection-annotation';

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

  private getSourceByUri(sourceUri: string): SourceModel | undefined {
    return this.sources.find((s) => s.uri === sourceUri);
  }

  public setAnnotations(annotations: W3CAnnotation[]): W3CAnnotation[] {
    this.annotations = annotations;

    return annotations;
  }

  public setAnnotation(annotation: W3CAnnotation): W3CAnnotation {
    this.annotations = this.annotations.map((a) =>
      a === a.id ? annotation : a,
    );

    return annotation;
  }

  public autoGenerateAnnotations(sourceId: string): W3CAnnotation[] {
    this.annotations = generateW3CAnnotationBlocks(
      this.getSource(sourceId),
      this.annotations,
    );

    return this.annotations;
  }

  public createAnnotation(
    sourceUri: string,
    annotation: TextAnnotation,
    type: AnnotationMetadataType,
  ) {
    const newAnnotation = createTextSelectionAnnotation(
      this.getSourceByUri(sourceUri),
      pick(annotation, ['start', 'end']),
      type,
    );

    this.annotations = [...this.annotations, newAnnotation];

    return newAnnotation;
  }

  public cancelAnnotations(prefix: string) {
    this.annotations = this.annotations.filter((a) => !a.id.startsWith(prefix));
    return this.annotations;
  }

  public getAnnotationsByPrefix(prefix: string) {
    return this.annotations.filter((a) => a.id.startsWith(prefix));
  }

  public getAnnotation(annotationId: string) {
    return this.annotations.find((a) => a.id === annotationId);
  }

  public getAnnotations() {
    return this.annotations;
  }

  public changeType(id: string, textType: AnnotationMetadataType) {
    let annotation: W3CAnnotation;

    const update = (a: W3CAnnotation) => {
      annotation = updateBody(
        a,
        TextualBodyClassifyingSchema.parse({ value: textType }),
      );

      return a;
    };

    this.annotations = this.annotations.map((a) =>
      a.id === id ? update(a) : a,
    );

    return annotation;
  }
}
