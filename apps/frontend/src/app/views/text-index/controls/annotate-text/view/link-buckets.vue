<template>
  <LinkComponent
    title="Link buckets"
    entity="linkBucket"
    :purpose="PURPOSE_LINK_BUCKETS"
    :display-value="displayValue"
    :annotation="activeAnnotation"
    :links="links"
    :new-link="linkBucket"
    :text="text"
    @add-link="addLink"
    @delete="deleteAnnotation"
  >
    <p v-if="!linkedBucket">
      Click on an annotation
    </p>
    <div v-if="linkedBucket">
      {{ translatedText?.value }}
      <SelectComponent
        v-model="linkType"
        label="Annotation type"
        :options="linkTypes"
      />
      <div class="flex gap-2 justify-end py-4">
        <Btn @click="saveBucket">
          Save LinkBucket
        </Btn>
      </div>
    </div>
  </LinkComponent>
</template>

<script setup lang="ts">
import type { AnnotationType } from '@mela/text/shared';
import { LinkBucketsSchema, PURPOSE_LINK_BUCKETS } from '@mela/text/shared';
import { computed, effect, ref } from 'vue';

import type {
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import { findBodyType } from '@ghentcdh/annotations/core';
import { Btn, SelectComponent } from '@ghentcdh/ui';

import activeAnnotation from '../active-annotation.vue';
import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { useModeStore } from '../store/mode.store';
import type { AnnotationFilter } from '../utils/annotations.utils';
import { findTextValue } from '../utils/translation';

const listenerStore = useAnnotationListenerStore()();

const modeStore = useModeStore();

const linkBucket = computed(() => modeStore.activeMode === 'link_buckets');
const linkTypes = [
  { label: 'Synonymous', value: 'synonymous' },
  { label: 'Antonym', value: 'antonym' },
];
const linkType = ref(linkTypes[0]);
type Properties = {
  annotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
};
const properties = defineProps<Properties>();
const emits = defineEmits<{
  save: [string | null, AnnotationType];
  delete: [W3CAnnotation];
  changeSelectFilter: [Partial<AnnotationFilter>];
}>();

const linkedBucket = ref();

effect(() => {
  if (!linkBucket.value) {
    linkedBucket.value = null;
    return;
  }
  const clAnnotation = listenerStore.clickAnnotation;

  if (!clAnnotation) {
    linkedBucket.value = null;
    return;
  }

  const activeAnnotation = properties.annotation.id;
  if (clAnnotation.id === activeAnnotation) {
    linkedBucket.value = null;
    return;
  }
  linkedBucket.value = listenerStore.clickAnnotation;
});

const translatedText = computed(() => findTextValue(linkedBucket.value));

const displayValue = (link: AnnotationWithRelations): string => {
  const linked = link.relations.find((r) => r.id !== properties.annotation.id);
  const linkType = findBodyType<SpecificResource>(
    'SpecificResource',
    (body: SpecificResource) => !!body.value,
  )(link.annotation);

  return `${findTextValue(linked)?.value} (${linkType?.value.linkType})`;
};

const addLink = () => {
  modeStore.changeMode('link_buckets');
  emits('changeSelectFilter', { annotationType: ['example'] });
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  emits('delete', annotation);
};

const saveBucket = () => {
  const link = LinkBucketsSchema.parse({
    text: properties.text,
    annotations: [properties.annotation, linkedBucket.value],
    value: { linkType: linkType.value.value },
  });

  emits('save', null, link);

  modeStore.resetModeNoEffect();

  linkedBucket.value = null;
};
</script>
