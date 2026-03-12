<template>
  <Collapse :title="source.content.label">
    <SourceNavbar v-bind="properties" />
    <div :id="textUuid"
  /></Collapse>
</template>
<script lang="ts" setup>
import { SourceEditProperties } from './SourceEdit.properties';

import { Collapse } from '@ghentcdh/ui';
import { v4 as uuid } from 'uuid';
import {
  AnnotatedText,
  createAnnotatedText,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { onMounted, watch } from 'vue';
import SourceNavbar from './SourceNavbar.vue';

const properties = defineProps(SourceEditProperties);

const textUuid = `text-content-${uuid()}`;

let textAnnotation: AnnotatedText<W3CAnnotation> = undefined;

const setTextContent = () => {
  const content = properties.source?.content;
  const config = properties.config!;

  if (!textAnnotation) return;

  textAnnotation
    .setText(content?.text ?? '')
    .setTextAdapter({
      textDirection: content?.textDirection,
    })
    .setAnnotationAdapter(config.annotationAdapter(properties.source!))
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
  const config = properties.config!;

  textAnnotation = createAnnotatedText<W3CAnnotation>(textUuid)
    .setTextAdapter(config.textAdapter())
    .setTagLabelFn(config.tagLabelFn)
    .setRenderParams(config.renderParams)
    .setStyleParams(config.styleParams)
    .registerStyles(config.styles)
    .on('mouse-enter', (event) => {
      // onMouseEnter(event.mouseEvent!, event.data.annotation);
    })
    .on('click', (event) => {
      onMouseClick(event.mouseEvent!, event.data.annotation);
    });

  setTextContent();
});

const onMouseClick = (mouseEvent: MouseEvent, annotation: W3CAnnotation) => {
  console.log('onMouseClick', annotation);
  // Don't do anything if some operation is active
  // if (annotationEditStore.isEditing) {
  //   annotationLink.selectLink(annotation);
  // } else {
  //   showInfoForAnnotation(mouseEvent, annotation);
  // }
};
</script>
