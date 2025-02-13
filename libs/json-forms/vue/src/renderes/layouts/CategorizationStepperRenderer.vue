<template>
  <Card class="flex flex-col gap-2 h-full">
    <div class="steps w-full">
      <template
        v-for="(category, index) in visibleCategories"
        :key="`tab-${index}`"
      >
        <button
          v-if="category.value.visible"
          :class="['step', { 'step-primary': index < selected }]"
          :disabled="!category.value.enabled"
          @click="changeStep(index + 1)"
        >
          <label>{{ category.value.label }}</label>
        </button>
      </template>
    </div>

    <div :class="[styles.categorization.panel, 'h-full flex-1 overflow-auto']">
      <DispatchRenderer
        v-if="visibleCategories[selected - 1]"
        :schema="layout.schema"
        :uischema="visibleCategories[selected - 1].value.uischema"
        :path="layout.path"
        :enabled="layout.enabled"
        :renderers="layout.renderers"
        :cells="layout.cells"
      />
    </div>

    <template
      v-if="appliedOptions?.showNavButtons"
      #actions
    >
      <div
        v-if="selected > 1"
        :class="styles.categorization.stepperButtonBack"
      >
        <Btn
          :disabled="!visibleCategories[selected - 1].value.enabled"
          :outline="true"
          @click="back"
        >
          {{ 'Back' }}
        </Btn>
      </div>

      <div
        v-if="selected < visibleCategories.length"
        :class="styles.categorization.stepperButtonNext"
      >
        <Btn
          :disabled="!visibleCategories[selected].value.enabled"
          :color="Color.primary"
          @click="next"
        >
          {{ 'Next' }}
        </Btn>
      </div>
      <div
        v-if="selected === visibleCategories.length"
        :class="styles.categorization.stepperButtonNext"
      >
        <Btn
          :disabled="!visibleCategories[selected - 1].value.enabled"
          :color="Color.primary"
          @click="submit"
        >
          {{ 'Submit' }}
        </Btn>
      </div>
    </template>
  </Card>
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
import { useRouter } from 'vue-router';

import { Btn, Card, Color } from '@ghentcdh/ui';

import { useStepperStore } from './stepper.store';

const layoutRenderer = defineComponent({
  name: 'CategorizationStepperRenderer',
  components: {
    Btn,
    Card,
    DispatchRenderer,
  },
  props: {
    ...rendererProps<Layout>(),
  },
  setup(props: RendererProps<Layout>) {
    const layout = useVanillaLayout(useJsonFormsCategorization(props));
    return {
      ...layout,
      router: useRouter(),
      stepperStore: useStepperStore(),
    };
  },
  computed: {
    selected() {
      return this.stepperStore.activeStep;
    },
    Color() {
      return Color;
    },
    visibleCategories() {
      return this.categories.filter((category) => category.value.visible);
    },
  },
  methods: {
    next() {
      this.stepperStore.next();
    },
    back() {
      this.stepperStore.previous();
    },
    submit() {
      this.stepperStore.submit();
    },
    changeStep(step: number) {
      this.stepperStore.changeStep(step);
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
