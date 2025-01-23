<template>
  <div class="flex flex-col gap-2">
    <div class="steps">
      <template
        v-for="(category, index) in visibleCategories"
        :key="`tab-${index}`"
      >
        <button
          v-if="category.value.visible"
          :class="['step', { 'step-primary': index <= selected }]"
          :disabled="!category.value.enabled"
          @click="selected = index"
        >
          <label>{{ category.value.label }}</label>
        </button>
      </template>
    </div>

    <div :class="styles.categorization.panel">
      <DispatchRenderer
        v-if="visibleCategories[selected]"
        :schema="layout.schema"
        :uischema="visibleCategories[selected].value.uischema"
        :path="layout.path"
        :enabled="layout.enabled"
        :renderers="layout.renderers"
        :cells="layout.cells"
      />
    </div>

    <footer
      v-if="appliedOptions?.showNavButtons"
      class="flex justify-end gap-2"
      :class="styles.categorization.stepperFooter"
    >
      <div
        v-if="selected > 0"
        :class="styles.categorization.stepperButtonBack"
        @click="selected = selected - 1"
      >
        <Btn
          :disabled="!visibleCategories[selected - 1].value.enabled"
          :outline="true"
        >
          {{ 'Back' }}
        </Btn>
      </div>

      <div
        v-if="selected + 1 < visibleCategories.length"
        :class="styles.categorization.stepperButtonNext"
        @click="selected = selected + 1"
      >
        <Btn
          :disabled="!visibleCategories[selected + 1].value.enabled"
          color="primary"
        >
          {{ 'Next' }}
        </Btn>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import type { JsonFormsRendererRegistryEntry, Layout } from '@jsonforms/core';
import {
  and,
  categorizationHasCategory,
  isCategorization,
  optionIs,
  rankWith,
} from '@jsonforms/core';
import {
  DispatchRenderer,
  type RendererProps,
  rendererProps,
  useJsonFormsCategorization,
} from '@jsonforms/vue';
import { useVanillaLayout } from '@jsonforms/vue-vanilla';
import { defineComponent } from 'vue';

import Btn from '../../../button/btn.vue';

const layoutRenderer = defineComponent({
  name: 'CategorizationStepperRenderer',
  components: {
    Btn,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    return useVanillaLayout(useJsonFormsCategorization(props));
  },
  data() {
    return {
      selected: 0,
    };
  },
  computed: {
    visibleCategories() {
      return this.categories.filter((category) => category.value.visible);
    },
  },
});

export default layoutRenderer;
export const entry: JsonFormsRendererRegistryEntry = {
  renderer: layoutRenderer,
  tester: rankWith(
    3,
    and(
      isCategorization,
      categorizationHasCategory,
      optionIs('variant', 'stepper'),
    ),
  ),
};
</script>
