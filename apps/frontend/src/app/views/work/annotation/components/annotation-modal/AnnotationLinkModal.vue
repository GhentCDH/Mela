<template>
  <Modal
    modal-title="Link annotation"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <div class="flex flex-col gap-2">
        <Collapse
          v-for="text in texts"
          :key="text.id"
          :title="text.text?.content.label"
        >
          <div :id="editId + '_' + text.id" />
        </Collapse>
      </div>
    </template>
    <template #actions>
      <Btn
        color="secondary"
        :outline="true"
        @click="onCancel"
      >
        Cancel
      </Btn>
      <slot name="custom-actions" />
      <Btn @click="onSubmit">
        Save
      </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Btn, Collapse, Modal } from '@ghentcdh/ui';
import {
  createAnnotatedText,
  findTextPositionSelector,
  getTarget,
  MarkdownTextAdapter,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { useAnnotationStore } from '../../store/anntotation.store';
import { useSectionStore } from '../../../section-store';
import { computed, onMounted, ref } from 'vue';
import { useAnnotationLink } from './useAnnotationLink';
import { annotationDto } from '@mela/text/shared';

export type AnnotationTranslationModalProps = {
  annotation: W3CAnnotation;
  annotation1: W3CAnnotation;
  storeId: string;
  type: string;
};
const properties = defineProps<AnnotationTranslationModalProps>();
const annotationStore = useAnnotationStore(properties.storeId);
const sectionStore = useSectionStore();
const formData = ref(null);

const editId = `edit-annotation-${Date.now()}--`;
const emits = defineEmits(['closeModal']);
const annotationLink = useAnnotationLink();

const onCancel = () => {
  annotationLink.cancel();
  emits('closeModal', null);
};

const onSubmit = async () => {
  annotationStore.saveOrCreateAnnotation(
    null,
    annotationDto.parse({
      type: 'translation',
      relations: [properties.annotation.id, properties.annotation1.id],
      value: formData.value,
    }),
  );
  emits('closeModal', { valid: true });
  annotationLink.cancel();
};

const texts = computed(() => {
  return [properties.annotation, properties.annotation1].map((a) => {
    const sourceUri = getTarget(a).find((t) => t.source)?.source;
    const textPositionSelector = findTextPositionSelector(sourceUri)(a)!;
    const text = sectionStore.sources.find((s) => s.uri === sourceUri)!;

    return {
      id: a.id,
      text: text,
      limit: { ...textPositionSelector, ignoreLines: true },
    };
  });
});

onMounted(() => {
  texts.value.forEach((text) => {
    createAnnotatedText(editId + '_' + text.id)
      .setTextAdapter(
        MarkdownTextAdapter({
          textDirection: text.text.content.textDirection,
          limit: text.limit,
        }),
      )
      .setText(text.text.content.text);
  });
});
</script>
