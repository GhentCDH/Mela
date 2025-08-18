<template>
  <LinkComponent
    title="Translations"
    entity="translation"
    :purpose="PURPOSE_TRANSLATION"
    :display-value="displayValue"
    :links="links"
    :new-link="linkedTranslation"
    @add-link="addLink"
    @delete="deleteAnnotation"
  >
    <p v-if="!linkedTranslation">
      Click on an annotation
    </p>
    <div v-else>
      {{ translatedText?.value }}
      <div class="flex gap-2 justify-end py-4">
        <Btn @click="saveTranslation">
          Save translation
        </Btn>
      </div>
    </div>
  </LinkComponent>
</template>

<script setup lang="ts">
import {
  PURPOSE_TRANSLATION,
  TranslationExampleSchema,
} from '@mela/text/shared';
import { computed, effect, ref } from 'vue';

import type { Text } from '@ghentcdh/mela/generated/types';
import { Btn } from '@ghentcdh/ui';
import type { W3CAnnotation } from '@ghentcdh/vue-component-annotated-text';

import type { AnnotationWithRelations } from '../props';
import LinkComponent from './link-component.vue';
import { useAnnotationListenerStore } from '../store/annotation-listener.store';
import { useAnnotationStore } from '../store/annotation.store';
import { useModeStore } from '../store/mode.store';
import { findTextValue } from '../utils/translation';

const listenerStore = useAnnotationListenerStore()();

const modeStore = useModeStore();

const linkTranslation = computed(() => modeStore.activeMode === 'translate');

type Properties = {
  annotation: W3CAnnotation;
  links: AnnotationWithRelations[];
  text: Text;
  storeId: string;
};
const properties = defineProps<Properties>();

const linkedTranslation = ref();
const annotationStore = useAnnotationStore(properties.storeId);

effect(() => {
  if (!linkTranslation.value) {
    linkedTranslation.value = null;
    return;
  }
  const clAnnotation = listenerStore.clickAnnotation;

  if (!clAnnotation) {
    linkedTranslation.value = null;
    return;
  }

  const activeAnnotation = properties.annotation.id;
  if (clAnnotation.id === activeAnnotation) {
    linkedTranslation.value = null;
    return;
  }
  linkedTranslation.value = listenerStore.clickAnnotation;
});

const displayValue = (link: AnnotationWithRelations): string => {
  const translation = link.relations.find(
    (r) => r.id !== properties.annotation.id,
  );

  return findTextValue(translation)?.value;
};
const translatedText = computed(() => findTextValue(linkedTranslation.value));

const addLink = () => {
  modeStore.changeMode('translate');
};

const deleteAnnotation = (annotation: W3CAnnotation) => {
  annotationStore.deleteAnnotation(annotation.id);
};

const saveTranslation = () => {
  const link = TranslationExampleSchema.parse({
    text: properties.text,
    annotations: [properties.annotation, linkedTranslation.value],
  });

  annotationStore.saveOrCreateAnnotation(null, link);

  linkedTranslation.value = null;
  modeStore.resetModeNoEffect();
};
</script>
