<template>
  <div>
    <Collapse :title="source.content.label">
      <ContentNavbar :source="source" :store-id="storeId" />
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
  annotationStyles,
  defaultRender,
  defaultStyle,
  findPurpose,
} from '../../../../style/annotation.style';
import { SourceModel } from '@mela/text/shared';
import ContentNavbar from './content-navbar.vue';

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

onMounted(() => {
  textAnnotation = createAnnotatedText<W3CAnnotation>(textUuid)
    .setTagLabelFn(findPurpose)
    .setRenderParams({
      renderFn: defaultRender,
    })
    .setStyleParams({
      styleFn: defaultStyle,
    })
    .registerStyles(annotationStyles)
    .on('mouse-enter', (event) => {
      annotationInfo.show(event.mouseEvent, {
        annotation: event.data.annotation,
        source: properties.source,
      });
    });

  setTextContent();
});

onUnmounted(() => {
  textAnnotation?.destroy();
});
</script>
