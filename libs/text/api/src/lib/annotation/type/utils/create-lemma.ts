import {
  AnnotationSelector,
  PURPOSE_LEMA,
  getLemmaUri,
} from '@mela/text/shared';
import { pick } from 'lodash-es';

import { SpecificResourceSchema } from '@ghentcdh/annotations/core';
import {
  AnnotationBody,
  LemmaWithRelations,
  TextContent,
} from '@ghentcdh/mela/generated/types';

import { createSelector } from './create-selector';
import { CreateAnnotationDto } from '../../dto';

export const createLemma = (
  lemma: LemmaWithRelations,
  textContent: TextContent,
  annotation: AnnotationSelector['annotation'],
): CreateAnnotationDto => {
  annotation.tagging = PURPOSE_LEMA;

  return createSelector(textContent, annotation, () => {
    return [
      {
        value: SpecificResourceSchema.parse({
          // TODO define what should go here, do we store the metadata or do we rebuild it later?
          value: pick(lemma, 'id', 'word'),

          source: getLemmaUri(lemma),
        }),
        source_id: lemma.id,
        source_type: 'lemma',
      } as unknown as AnnotationBody,
    ];
  });
};
