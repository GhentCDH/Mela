<template>
  <div
    class="relative"
    @mouseenter="showFullText"
    @mouseleave="hideFullText"
  >
    <component
      :is="showSource ? Collapse : 'div'"
      v-bind="showSource ? { title: data?.text?.content.label } : {}"
    >
      <div class="flex flex-row items-center gap-2">
        <div
          :id="annotationTextId"
          class="flex-1"
        />
        <div v-if="showHover">
          ...
        </div>
      </div>
    </component>
    <div
      v-if="hoverPosition"
      :id="annotationTextFullId"
      class="absolute left-0 top-full z-[100] border border-1 border-gray-200 shadow-sm bg-white p-2"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  AnnotatedText,
  createAnnotatedText,
  MarkdownTextAdapter,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useSectionStore } from '../../../section-store';
import { v4 as uuidv4 } from 'uuid';
import { searchTextSelection } from '../../utils/searchTextSelection';
import { Collapse } from '@ghentcdh/ui';

const properties = defineProps<{
  storeId: string;
  annotation: W3CAnnotation;
  maxCharacters?: number;
  showSource?: boolean;
}>();

const annotationTextId = `annotation-text-${uuidv4()}`;
const annotationTextFullId = `annotation-text-full-${uuidv4()}`;
const sectionStore = useSectionStore();
const showHover = ref(false);

let annotatedText: AnnotatedText<W3CAnnotation>;
let annotatedTextFull: AnnotatedText<W3CAnnotation>;

const data = computed(() => {
  const _data = searchTextSelection(
    properties.annotation,
    sectionStore.sources,
  );

  if (!_data) {
    return null;
  }

  const { text, textPositionSelector } = _data;
  const end = properties.maxCharacters
    ? Math.min(
        textPositionSelector.end,
        textPositionSelector.start + properties.maxCharacters,
      )
    : textPositionSelector.end;

  return { textPositionSelector, text, end };
});

onMounted(() => {
  const _data = data.value;
  if (!_data) {
    showHover.value = false;
    return;
  }

  const { textPositionSelector, text, end } = _data;
  showHover.value = textPositionSelector.end > end;

  annotatedText = createAnnotatedText<W3CAnnotation>(annotationTextId)
    .setTextAdapter(
      MarkdownTextAdapter({
        textDirection: text.content.textDirection,
        limit: {
          start: textPositionSelector.start,
          end: end,
          ignoreLines: true,
        },
      }),
    )
    .setText(text.content.text);
});

watch(
  () => data.value,
  () => {
    hideFullText();
    const _data = data.value;
    if (!_data) {
      annotatedText?.destroy();
    }

    const { textPositionSelector, text, end } = _data;
    showHover.value = textPositionSelector.end > end;

    annotatedText
      .setTextAdapter({
        limit: {
          start: textPositionSelector.start,
          end: end,
          ignoreLines: true,
        },
      })
      .setText(text.content.text);
  },
);

const hoverPosition = ref<{ x: number; y: number } | null>(null);
const showFullText = (mouseEvent: MouseEvent) => {
  if (!showHover.value) return;
  if (hoverPosition.value) return;

  hoverPosition.value = { x: mouseEvent.clientX, y: mouseEvent.clientY };

  window.setTimeout(() => renderFullText(), 100);
};

const renderFullText = () => {
  const { textPositionSelector, text } = data.value!;

  annotatedTextFull = createAnnotatedText<W3CAnnotation>(annotationTextFullId)
    .setTextAdapter(
      MarkdownTextAdapter({
        textDirection: text.content.textDirection,
        limit: {
          start: textPositionSelector.start,
          end: textPositionSelector.end,
          ignoreLines: true,
        },
      }),
    )
    .setText(text.content.text);
};

const hideFullText = () => {
  annotatedTextFull?.destroy();
  hoverPosition.value = null;
};

onUnmounted(() => {
  annotatedText?.destroy();
  annotatedTextFull?.destroy();
});
</script>
