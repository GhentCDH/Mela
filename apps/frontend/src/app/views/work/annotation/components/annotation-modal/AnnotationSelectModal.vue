<template>
  <Modal
    :modal-title="label.title"
    :open="true"
    :disable-close="false"
    width="lg"
    @close-modal="onCancel"
  >
    <template #content>
      <div class="flex flex-col gap-2">
        <Collapse :title="label.selectLabel">
          <div :id="editId" />
          <Btn :outline="true" class="mt-2" @click="selectAll">
            Select all text
          </Btn>
        </Collapse>

        <AnnotationForm
          v-model="formData"
          :annotation="properties.annotation"
          :annotation-type="type"
        />
      </div>
    </template>
    <template #actions>
      <Btn color="secondary" :outline="true" @click="onCancel"> Cancel </Btn>
      <Btn @click="onSubmit"> Save </Btn>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Btn, Collapse, Modal } from '@ghentcdh/ui';
import {
  AnnotatedText,
  createAnnotatedText,
  createTextSelectionAnnotation,
  findTextPositionSelector,
  MarkdownTextAdapter,
  updateTextSelectionAnnotation,
  W3CAnnotation,
  W3CAnnotationAdapter,
  WordSnapper,
} from '@ghentcdh/annotated-text';
import { useAnnotationStore } from '../../store/anntotation.store';
import { useSectionStore } from '../../../section-store';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useAnnotationDefStore } from '../../store/annotation-def.store';
import { useAnnotationSelect } from './useAnnotationSelect';
import { defaultStyle } from '../../../../../style/annotation.style';
import { annotationDto, SourceModel } from '@mela/text/shared';
import { v4 as uuidv4 } from 'uuid';
import AnnotationForm from './AnnotationForm.vue';

export type AnnotationSelectionModalProps = {
  annotation?: W3CAnnotation;
  parentAnnotation?: W3CAnnotation;
  source: SourceModel;
  storeId: string;
  type: string;
};

const properties = defineProps<AnnotationSelectionModalProps>();
const annotationStore = useAnnotationStore(properties.storeId);
const annotationDefStore = useAnnotationDefStore();
const annotationDef = computed(
  () => annotationDefStore.definitions[properties.type],
);
const sectionStore = useSectionStore();
const formData = ref(null);

const editId = `edit-select-annotation-${Date.now()}--`;
const emits = defineEmits(['closeModal']);

const onCancel = () => {
  useAnnotationSelect().cancel();
  emits('closeModal', null);
};

const label = computed(() => {
  const _label = annotationDef.value?.label ?? properties.type;

  return {
    title: properties.annotation ? `Edit ${_label}` : `Create ${_label}`,
    selectLabel: properties.annotation
      ? `Adjust ${_label} selection`
      : `Select ${_label} selection`,
  };
});
const onSubmit = async () => {
  const selector = annotationEdit.value
    ? findTextPositionSelector(properties.source.uri)(annotationEdit.value)
    : null;

  annotationStore.saveOrCreateAnnotation(
    properties.annotation?.id ?? null,
    annotationDto.parse({
      type: properties.type,
      textSelector: {
        ...selector,
        sectionTextId: properties.source.id,
      },
      value: formData.value,
    }),
  );
  emits('closeModal', { valid: true });
  useAnnotationSelect().cancel();
};

let annotatedText: AnnotatedText<W3CAnnotation>;
const annotationEdit = ref<W3CAnnotation | null>(null);

const getMainAnnotation = () => {
  if (properties.parentAnnotation) return properties.parentAnnotation;
  return null;
};

const textPositionSelector = () => {
  const parent = getMainAnnotation();
  if (!parent) return null;

  const sourceUri = properties.source.uri;

  return findTextPositionSelector(sourceUri)(parent);
};

onMounted(() => {
  const annotations = properties.annotation ? [properties.annotation] : [];
  const language = properties.source.content.processingLanguage;
  const sourceUri = properties.source.uri;
  const textDirection = properties.source.content.textDirection;
  const text = properties.source.content.text;

  let selector = textPositionSelector();

  const limit = selector
    ? {
        start: selector.start,
        end: selector.end,
        ignoreLines: true,
      }
    : undefined;
  // colorFn: ((w3cAnnotation: W3CAnnotation) => color,
  annotatedText = createAnnotatedText<W3CAnnotation>(editId)
    .setTextAdapter(MarkdownTextAdapter({ limit, textDirection }))
    .setAnnotationAdapter(
      W3CAnnotationAdapter({
        sourceUri,
        language,
        edit: true,
        create: !properties.annotation,
      }),
    )
    .setSnapper(new WordSnapper())
    .setStyleParams({
      styleFn: defaultStyle,
    })
    .registerStyles(useAnnotationDefStore().styles)
    .setText(text)
    .setAnnotations(annotations)
    .on('annotation-create--end', ({ mouseEvent, event, data }) => {
      annotatedText.setAnnotationAdapter({ create: false, edit: true });
      annotationEdit.value = data.annotation;
    })
    .on('annotation-edit--end', ({ mouseEvent, event, data }) => {
      annotationEdit.value = data.annotation;
    });
});

const selectAll = () => {
  const source = properties.source;
  const selector = textPositionSelector() ?? {
    start: 0,
    end: source.content.text.length,
  };
  if (annotationEdit.value) {
    annotationEdit.value = updateTextSelectionAnnotation(
      annotationEdit.value,
      source.uri,
      source.content.processingLanguage,
      source.content.text,
      selector,
    );
  } else {
    annotationEdit.value = createTextSelectionAnnotation(
      source.uri,
      source.content.processingLanguage,
      source.content.text,
      { ...selector, id: `NEW-${uuidv4()}` },
    );
  }

  annotatedText
    .setAnnotations([annotationEdit.value])
    .setAnnotationAdapter({ create: false, edit: true });
};

onUnmounted(() => {
  annotatedText?.destroy();
});
</script>
