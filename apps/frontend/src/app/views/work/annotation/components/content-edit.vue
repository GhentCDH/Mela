<template>
  <div>
    <Collapse :title="source.content.label">
      <ContentNavbar
        :source="source"
        :store-id="storeId"
      />
      <div :id="textUuid" />
    </Collapse>
  </div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';
import {
  AnnotatedText,
  createAnnotatedText,
  MarkdownTextAdapter,
  W3CAnnotation,
  W3CAnnotationAdapter,
} from '@ghentcdh/annotated-text';
import { Collapse } from '@ghentcdh/ui';
import { v4 as uuid } from 'uuid';
import { useAnnotationInfo } from './annotation-detail/useAnnotationInfo';
import {
  defaultRender,
  defaultStyle,
  findPurpose,
} from '../../../../style/annotation.style';
import { SourceModel } from '@mela/text/shared';
import ContentNavbar from './content-navbar.vue';
import { useAnnotationLink } from './annotation-modal/useAnnotationLink';
import { useAnnotationDefStore } from '../store/annotation-def.store';
import { useToast } from './mode/useToast';

const properties = defineProps<{
  source: SourceModel;
  annotations: W3CAnnotation[];
  storeId: string;
}>();

const textUuid = `text-content-${uuid()}`;
let textAnnotation: AnnotatedText<W3CAnnotation>;

const annotationInfo = useAnnotationInfo();

const setTextContent = () => {
  const content = properties.source?.content;
  const sourceUri = properties.source?.uri ?? null;

  if (!textAnnotation) return;

  textAnnotation
    .setText(content?.text ?? '')
    .setTextAdapter(
      MarkdownTextAdapter({
        textDirection: content?.textDirection,
      }),
    )
    .setAnnotationAdapter(W3CAnnotationAdapter({ sourceUri }))
    .setAnnotations(properties.annotations ?? []);
};

watch(
  () => properties.source,
  () => {
    setTextContent();
  },
  { immediate: true },
);

watch(
  () => properties.annotations,
  () => {
    textAnnotation?.setAnnotations(properties.annotations ?? []);
  },
  { immediate: true },
);
const annotationDefStore = useAnnotationDefStore();

onMounted(() => {
  console.log(annotationDefStore.definitions);
  textAnnotation = createAnnotatedText<W3CAnnotation>(textUuid)
    .setTagLabelFn(findPurpose)
    .setRenderParams({
      renderFn: defaultRender,
    })
    .setStyleParams({
      styleFn: defaultStyle,
    })
    .registerStyles(annotationDefStore.styles)
    .on('mouse-enter', (event) => {
      // onMouseEnter(event.mouseEvent!, event.data.annotation);
    })
    .on('click', (event) => {
      onMouseClick(event.mouseEvent!, event.data.annotation);
    });

  setTextContent();
});

onUnmounted(() => {
  textAnnotation?.destroy();
});

const toastStore = useToast();

const showInfoForAnnotation = (
  mouseEvent: MouseEvent,
  annotation: W3CAnnotation,
) => {
  annotationInfo.show(mouseEvent, {
    annotation: annotation,
    source: properties.source,
  });
};

watch(
  () => annotationInfo.data,
  () => {
    textAnnotation?.selectAnnotations([
      annotationInfo.data?.annotation.id ?? '',
    ]);
  },
);
const annotationLink = useAnnotationLink();
const onMouseClick = (mouseEvent: MouseEvent, annotation: W3CAnnotation) => {
  // Don't do anything if some operation is active
  if (annotationLink.isActive) {
    annotationLink.selectLink(annotation);
  } else {
    showInfoForAnnotation(mouseEvent, annotation);
  }
};
</script>
