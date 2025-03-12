<template>
  <h2>Link buckets</h2>

  <ul class="list">
    <li v-for="t in linkBuckets" :key="t.link.id" class="list-row !px-0 !gap-2">
      <div>
        <small>{{ t.translation }}</small> ({{ t.linkType }})
      </div>
      <Btn
        :color="Color.secondary"
        :icon="IconEnum.Delete"
        @click="deleteAnnotation(t.link)"
      />
    </li>
  </ul>
  <fieldset v-if="linkBucket" class="fieldset">
    <legend class="fieldset-legend">Selected LinkBucket</legend>
    <p v-if="!linkedBucket">Click on an annotation</p>
    <div v-if="linkedBucket">
      {{ translatedText?.value }}
      <SelectComponent
        v-model="linkType"
        label="Annotation type"
        :options="linkTypes"
      />
      <div class="flex gap-2 justify-end py-4">
        <Btn @click="saveBucket"> Save LinkBucket</Btn>
      </div>
    </div>
  </fieldset>
  <Btn v-if="!linkBucket" @click="addLink"> Add LinkBucket</Btn>
</template>

<script setup lang="ts">
import {
  AnnotationType,
  LinkBucketsSchema,
  PURPOSE_LINK_BUCKETS,
} from '@mela/text/shared';
import { computed, effect, ref } from 'vue';

import {
  findBodyType,
  findByPurposeValue,
  SpecificResource,
  W3CAnnotation,
} from '@ghentcdh/annotations/core';
import {
  Btn,
  Color,
  IconEnum,
  ModalService,
  SelectComponent,
} from '@ghentcdh/ui';

import type { AnnotationWithRelations } from '../props';
import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { useModeStore } from '../store/mode.store';
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

const linkBuckets = computed(() =>
  properties.links
    .filter((link) => findByPurposeValue(PURPOSE_LINK_BUCKETS)(link.annotation))
    .map((link) => {
      console.log(properties.annotation.id);
      const linked = link.relations.find(
        (r) => r.id !== properties.annotation.id,
      );
      console.table(link.relations);
      console.table(link);
      console.table(linked.body);
      const linkType = findBodyType<SpecificResource>(
        'SpecificResource',
        (body: SpecificResource) => !!body.value,
      )(link.annotation);

      console.log(linkType.value);

      return {
        link: link.annotation,
        translation: findTextValue(linked)?.value,
        linkType: linkType?.value.linkType,
      };
    }),
);
const addLink = () => {
  modeStore.changeMode('link_buckets');
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  ModalService.showConfirm({
    title: 'Delete link',
    message: 'Are you sure to delete this LinkBucket',
    onClose: (result) => {
      if (result.confirmed) {
        emits('delete', annotation);
      }
    },
  });
};

const saveBucket = () => {
  const link = LinkBucketsSchema.parse({
    text: properties.text,
    annotations: [properties.annotation, linkedBucket.value],
    value: { linkType: linkType.value.value },
  });

  emits('save', null, link);

  linkedBucket.value = null;
};
</script>
