import { AnnotationSelector, getExampleUri } from '@mela/text/shared';
import { pick } from 'lodash-es';

import { SpecificResourceSchema } from '@ghentcdh/annotated-text';
import type {
  AnnotationBody,
  ExampleWithRelations,
  TextContent,
} from '@ghentcdh/mela/generated/types';

import { createSelector } from './create-selector';
import { CreateAnnotationDto } from '../../dto';

export const createExample = (
  example: ExampleWithRelations,
  textContent: TextContent,
  annotation: AnnotationSelector['annotation'],
): CreateAnnotationDto => {
  annotation.tagging = 'example';

  return createSelector(textContent, annotation, () => {
    return [
      {
        value: SpecificResourceSchema.parse({
          // TODO define what should go here, do we store the metadata or do we rebuild it later?
          value: {
            register: pick(example.register, 'id', 'name'),
          },
          source: getExampleUri(example),
        }),
        source_id: example.id,
        source_type: 'example',
      } as unknown as AnnotationBody,
    ];
  });
};
