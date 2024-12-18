import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { SchemaModel } from '@ghentcdh/tools/form';

// TODO add warnings, success, ....

export const useFormStore = (name: string) =>
  defineStore(`ghentCDH_form_${name}`, () => {
    const schemaUrl = ref<string>('');
    const httpStore = useHttpStore();

    const schema = computedAsync(async () => {
      if (!schemaUrl.value) return null;

      return httpStore.get<SchemaModel>(schemaUrl.value);
    });

    const formSchema = computed(() => schema.value?.formSchema);
    const uiSchema = computed(() => schema.value?.uiSchema);
    const columnSchema = computed(() => schema.value?.columnSchema);
    const uri = computed(() => schema.value?.uri);

    const save = async <T>(id: string | null, data: T) => {
      if (!uri.value) return;

      if (!id) {
        await httpStore.post(uri.value, data);
      } else await httpStore.patch(`${uri.value}/${id}`, data);

      return;
    };

    const deleteFn = async <T>(data: T & { id?: string }) => {
      await httpStore.delete(`${uri.value}/${data.id}`);
    };

    const init = (urlSchema: string) => {
      if (schemaUrl.value === urlSchema) return;
      schemaUrl.value = urlSchema;
    };

    return {
      formSchema,
      uiSchema,
      uri,
      columnSchema,
      init,
      save,
      delete: deleteFn,
    };
  })();
