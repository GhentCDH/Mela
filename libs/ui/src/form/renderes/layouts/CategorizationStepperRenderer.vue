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
          @click="selectCategory(index)"
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
      >
        <Btn
          :disabled="!visibleCategories[selected - 1].value.enabled"
          :outline="true"
          @click="selectCategory(selected - 1)"
        >
          {{ 'Back' }}
        </Btn>
      </div>

      <div
        v-if="selected + 1 < visibleCategories.length"
        :class="styles.categorization.stepperButtonNext"
      >
        <Btn
          :disabled="!visibleCategories[selected + 1].value.enabled"
          :color="Color.primary"
          @click="selectCategory(selected + 1)"
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
import { useRoute, useRouter } from 'vue-router';

import Btn from '../../../button/btn.vue';
import { Color } from '../../../const/colors';

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
    return {
      ...useVanillaLayout(useJsonFormsCategorization(props)),
      router: useRouter(),
    };
  },
  data() {
    return {
      selected: 0,
    };
  },
  computed: {
    Color() {
      return Color;
    },
    visibleCategories() {
      return this.categories.filter((category) => category.value.visible);
    },
  },
  mounted() {
    const stepQuery = useRoute()?.query?.step;
    if (stepQuery) {
      const step = parseInt(stepQuery as string) - 1;
      if (step > 0 && step < this.categories.length) {
        this.selected = step;
      }
    }
  },
  methods: {
    selectCategory(index: number) {
      this.selected = index;

      this.router?.replace({
        query: { step: index + 1 },
      });
      console.log('----' + 'select category', index);
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
