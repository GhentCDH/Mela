<template>
  <Modal
    :modal-title="title"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <div class="flex flex-col gap-2">
        <AnnotationText
          :store-id="storeId"
          :annotation="properties.annotation"
          :show-source="true"
        />
        <AnnotationText
          :store-id="storeId"
          :annotation="properties.annotation1"
          :show-source="true"
        />
        <AnnotationForm
          v-model="formData"
          :annotation="properties.annotation"
          :annotation-type="type"
        />
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
import { Btn, Modal } from '@ghentcdh/ui';
import { W3CAnnotation } from '@ghentcdh/annotated-text';
import { useAnnotationStore } from '../../store/anntotation.store';
import { computed, ref } from 'vue';
import { useAnnotationLink } from './useAnnotationLink';
import { annotationDto } from '@mela/text/shared';
import { useAnnotationDefStore } from '../../store/annotation-def.store';
import AnnotationText from '../annotation-detail/Annotation-text.vue';
import AnnotationForm from './AnnotationForm.vue';

export type AnnotationTranslationModalProps = {
  annotation: W3CAnnotation;
  annotation1: W3CAnnotation;
  storeId: string;
  type: string;
};
const properties = defineProps<AnnotationTranslationModalProps>();
const annotationStore = useAnnotationStore(properties.storeId);
const annotationDefStore = useAnnotationDefStore();
const formData = ref(null);
const annotationDef = computed(
  () => annotationDefStore.definition[properties.type],
);
const title = computed(
  () => `Link ${annotationDef.value?.label ?? properties.type}`,
);

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
</script>
