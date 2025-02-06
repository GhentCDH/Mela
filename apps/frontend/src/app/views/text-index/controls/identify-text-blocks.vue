<template>
  <control-wrapper v-bind="controlWrapper" :styles="styles" :hideLabel="true">
    <IdentifyAndTranslate
      :sourceText="sourceText"
      :translatedText="translatedText"
    />
  </control-wrapper>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
} from '@jsonforms/core';
import { rankWith } from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import { rendererProps, useJsonFormsControl } from '@jsonforms/vue';
import { defineComponent } from 'vue';

// import { default as ControlWrapper.vue } from './ControlWrapper.vue.vue';
import type { TextContent } from '@ghentcdh/mela/generated/types';
import AnnotateTextComponent from './annotate-text/annotate-text.vue';
import {
  ControlWrapper,
  isCustomControl,
  Select,
  useVanillaControlCustom,
} from '@ghentcdh/ui';
import IdentifyAndTranslate from './annotate-text/identify-and-translate.vue';

const controlRenderer = defineComponent({
  name: 'IdentifyTextBlocks',
  components: {
    IdentifyAndTranslate,
    ControlWrapper,
    AnnotateTextComponent,
    Select,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const controls = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => target.value ?? undefined,
    );
    return controls;
  },
  computed: {
    sourceText() {
      return this.control.data?.find(
        (d: TextContent) => d.text_type === 'SOURCE',
      );
    },
    translatedText() {
      return this.control.data?.find(
        (d: TextContent) => d.text_type === 'TRANSLATION',
      );
    },
  },
});

export default controlRenderer;

export const identifyTextBlocks: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isCustomControl('identify_text_blocks')),
};
</script>
