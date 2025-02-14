<template>
  <fieldset
    v-if="control.visible"
    :class="styles.arrayList.root"
  >
    <legend
      v-if="!labelKey"
      :class="styles.arrayList.legend"
    >
      <label :class="styles.arrayList.label">
        {{ control.label }}
      </label>
    </legend>
    <div :class="styles.fixedArrayList.root">
      <div
        v-for="(element, index) in control.data"
        :key="`${control.path}-${index}`"
        :class="styles.fixedArrayList.item"
      >
        <fieldset class="fieldset">
          <legend
            v-if="labelKey"
            :class="styles.arrayList.legend"
          >
            {{ element[labelKey]?.toLowerCase() }}
          </legend>

          <dispatch-renderer
            :schema="control.schema"
            :uischema="childUiSchema"
            :path="composePaths(control.path, `${index}`)"
            :enabled="control.enabled"
            :renderers="control.renderers"
            :cells="control.cells"
          />
        </fieldset>
      </div>
    </div>
    <div
      v-if="noData"
      :class="styles.arrayList.noData"
    >
      {{ translations.noDataMessage }}
    </div>
  </fieldset>
</template>

<script lang="ts">
import type {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  JsonFormsSubStates,
} from '@jsonforms/core';
import {
  arrayDefaultTranslations,
  composePaths,
  createDefaultValue,
  defaultJsonFormsI18nState,
  getArrayTranslations,
  rankWith,
} from '@jsonforms/core';
import type { RendererProps } from '@jsonforms/vue';
import {
  DispatchRenderer,
  rendererProps,
  useJsonFormsArrayControl,
} from '@jsonforms/vue';
import { useVanillaArrayControl } from '@jsonforms/vue-vanilla';
import { defineComponent, inject } from 'vue';

import { isFixedArray } from '../tester';

const controlRenderer = defineComponent({
  name: 'FixedArrayListRenderer',
  components: {
    DispatchRenderer,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useVanillaArrayControl(useJsonFormsArrayControl(props));
  },
  computed: {
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
    },
    translations(): any {
      const jsonforms = inject<JsonFormsSubStates>('jsonforms');
      return getArrayTranslations(
        jsonforms?.i18n?.translate ?? defaultJsonFormsI18nState.translate,
        arrayDefaultTranslations,
        this.control.i18nKeyPrefix,
        this.control.label,
      );
    },
    labelKey(): string {
      const key = this.uischema?.options?.labelKey;
      if (!key) return null;

      return key;
    },
  },
  methods: {
    composePaths,
    createDefaultValue,
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isFixedArray),
};
</script>
