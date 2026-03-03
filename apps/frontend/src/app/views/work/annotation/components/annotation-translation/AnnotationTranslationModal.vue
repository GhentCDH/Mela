<template>
  <Modal
    modal-title="Translate annotation"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <Collapse
        v-for="source in sectionStore.sources"
        :key="source.id"
        :title="source.content.label"
      >
        <div :id="editId + '_' + source.content.label" />
      </Collapse>
    </template>
    <template #actions>
      <Btn color="secondary" :outline="true" @click="onCancel"> Cancel </Btn>
      <slot name="custom-actions" />
      <Btn @click="onSubmit"> Save </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Btn, Collapse, Modal } from '@ghentcdh/ui';
import {
  createAnnotatedText,
  findTextPositionSelector,
  hasSourceInTargets,
  MarkdownTextAdapter,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { useAnnotationStore } from '../../store/anntotation.store';
import { useSectionStore } from '../../../section-store';
import { onMounted } from 'vue';
import { useAnnotationTranslation } from './useAnnotationTranslation';

export type AnnotationTranslationModalProps = {
  annotation: W3CAnnotation;
  translation: W3CAnnotation;
  storeId: string;
};
const properties = defineProps<AnnotationTranslationModalProps>();
const annotationStore = useAnnotationStore(properties.storeId);
const sectionStore = useSectionStore();

console.log('the translation modal');
const editId = `edit-annotation-${Date.now()}--`;
const emits = defineEmits(['closeModal']);

const onCancel = () => {
  useAnnotationTranslation().cancel();
  emits('closeModal', null);
};

const onSubmit = async () => {
  alert('implement me please');
  emits('closeModal', { valid: true });
  useAnnotationTranslation().cancel();
};

onMounted(() => {
  sectionStore.sources.forEach((source) => {
    const sourceId = source.id;
    const isAnnotation = hasSourceInTargets(sourceId)(properties.annotation);
    const annotation = isAnnotation
      ? properties.annotation
      : properties.translation;
    console.table(properties.annotation.target);
    console.table(properties.translation.target);
    const textPositionSelector = findTextPositionSelector()(annotation);

    console.log('textPositionSelector', textPositionSelector);
    if (!textPositionSelector) return;

    createAnnotatedText(editId + '_' + source.content.label)
      .setTextAdapter(
        MarkdownTextAdapter({
          textDirection: source.content.textDirection,
          limit: {
            start: textPositionSelector!.start,
            end: textPositionSelector!.end,
            ignoreLines: true,
          },
        }),
      )
      .setText(source.content.text);
    console.log('mounted', source);
    // .setAnnotations([annotation]);
  });
});
</script>
