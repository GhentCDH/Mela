<template>
  <control-wrapper v-bind="controlWrapper" :styles="styles">
    <div :id="mdId" />
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
import MdEditor from '@toast-ui/editor';
import { defineComponent, onMounted } from 'vue';

import ControlWrapper from './ControlWrapper.vue';
import { isMarkdownControl } from '../tester';
import { useVanillaControlCustom } from '@ghentcdh/ui';

import '@toast-ui/editor/dist/toastui-editor.css';

const controlRenderer = defineComponent({
  name: 'MarkdownControlRenderer',
  components: {
    ControlWrapper,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>, $refs) {
    const control = useVanillaControlCustom(
      useJsonFormsControl(props),
      (target) => (target.value === '' ? undefined : target.value),
    );

    const mdId = `md-${Date.now()}`;

    onMounted(() => {
      const { path, data } = control.control.value;
      const editor = new MdEditor({
        el: document.getElementById(mdId),
        height: '500px',
        initialEditType: 'wysiwyg',
        initialValue: data ?? '',
        toolbarItems: [['bold', 'italic', 'strike']],
        events: {
          change: () => {
            control.handleChange(path, editor.getMarkdown());
          },
        },
      });
    });

    return {
      ...control,
      mdId,
    };
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isMarkdownControl),
};
</script>
