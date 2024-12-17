import { computedAsync } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { ResponseData, SchemaModel } from '@ghentcdh/tools/form';

// TODO add warnings, success, ....
// TODO add pagination

export const useFormStore = (name) =>
  defineStore(`ghentCDH_form_${name}`, () => {
    const schemaUrl = ref<string>('');
    const httpStore = useHttpStore();
    const reload = ref(Date.now());

    const schema = computedAsync(async () => {
      if (!schemaUrl.value) return null;

      return httpStore.get<SchemaModel>(schemaUrl.value);
    });

    const formSchema = computed(() => schema.value?.formSchema);
    const uiSchema = computed(() => schema.value?.uiSchema);
    const columnSchema = computed(() => schema.value?.columnSchema);
    const uri = computed(() => schema.value?.uri);

    const data = computedAsync<T>(async () => {
      // TODO add pagination and so
      const r = reload.value;
      if (!uri.value) return null;

      return httpStore.get<ResponseData<T>>(uri.value);
    });

    const save = async <T>(id: string | null, data: T) => {
      if (!uri.value) return;

      if (!id) {
        await httpStore.post(uri.value, data);
      } else await httpStore.patch(`${uri.value}/${id}`, data);

      reload.value = Date.now();

      return;
    };

    const deleteFn = async <T>(data: T & { id?: string }) => {
      await httpStore.delete(`${uri.value}/${data.id}`);

      reload.value = Date.now();
    };

    const init = (urlSchema: string) => {
      schemaUrl.value = urlSchema;
    };

    return {
      formSchema,
      uiSchema,
      data,
      columnSchema,
      init,
      save,
      delete: deleteFn,
    };
  })();
