import type {
  AnnotationMetadataType,
  AnnotationSelector,
  ExampleDto,
} from '@mela/text/shared';

export type AnnotationMetadataModel = {
  annotationType: { label: string; id: AnnotationMetadataType };
  example: ExampleDto;
  annotation: AnnotationSelector['annotation'];
};
