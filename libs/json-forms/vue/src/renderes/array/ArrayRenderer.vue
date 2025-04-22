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
    <div>
      <div
        v-for="(element, index) in control.data"
        :key="`${control.path}-${index}`"
      >
        <fieldset class="fieldset">
          <legend
            v-if="labelKey"
            :class="styles.arrayList.legend"
          >
            {{ element[labelKey]?.toLowerCase() }}
          </legend>

          <div class="flex gap-2 items-center">
            <dispatch-renderer
              :schema="control.schema"
              :uischema="childUiSchema"
              :path="composePaths(control.path, `${index}`)"
              :enabled="control.enabled"
              :renderers="control.renderers"
              :cells="control.cells"
            />
            <div class="mt-3 flex gap-2">
              <template v-for="action in actions">
                <Btn
                  v-if="action.show(element)"
                  :key="action.label"
                  :icon="action.icon"
                  :outline="true"
                  @click="dispatchEvent(action.label, element)"
                />
              </template>

              <Btn
                v-if="showDelete"
                :icon="IconEnum.Delete"
                :outline="true"
                @click="deleteButtonClick(index)"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="py-2">
      <Btn
        :icon="IconEnum.Plus"
        :outline="true"
        @click="addButtonClick"
      >
        Add
      </Btn>
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
import { useRouter } from 'vue-router';

import { Btn, IconEnum } from '@ghentcdh/ui';

import { isArrayRenderer } from '../tester';
import type { Action} from './map-array-actions';
import { mapArrayActions } from './map-array-actions';
import { useFormState } from '../../state/form.state';

const controlRenderer = defineComponent({
  name: 'ArrayListRenderer',
  components: {
    DispatchRenderer,
    Btn,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    const vanillaArrayControl = useVanillaArrayControl(
      useJsonFormsArrayControl(props),
    );
    const control = vanillaArrayControl.control.value;
    if (!control.data || control.data.length < 1) {
      vanillaArrayControl.addItem(
        control.path,
        createDefaultValue(control.schema, control.rootSchema),
      )();
    }

    return vanillaArrayControl;
  },
  computed: {
    IconEnum() {
      return IconEnum;
    },
    noData(): boolean {
      return !this.control.data || this.control.data.length === 0;
    },
    actions(): Action[] {
      const actions = this.uischema.options?.actions ?? [];

      return mapArrayActions(useRouter(), actions);
    },
    showDelete(): boolean {
      return this.control.data?.length > 1;
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
    deleteButtonClick(index: number) {
      this.removeItems(this.control.path, [index])();
    },
    dispatchEvent: (event, data) => {
      const form_id = '';
      useFormState(form_id).dispatchEvent(form_id, event, data);
    },
    addButtonClick() {
      this.addItem(
        this.control.path,
        createDefaultValue(this.control.schema, this.control.rootSchema),
      )();
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isArrayRenderer),
};
</script>
