import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import { FormSchemaModel } from '@ghentcdh/tools/form';

// TODO add warnings, success, ....

export const useFormStore = (name: string) =>
  defineStore(`ghentCDH_form_${name}`, () => {
    const uri = ref<string>(null);
    const httpStore = useHttpStore();

    const save = async <T>(id: string | null, data: T) => {
      if (!uri.value) return;

      if (!id) {
        await httpStore.post(uri.value, data);
      } else await httpStore.patch(`${uri.value}/${id}`, data);

      return;
    };

    const init = (schema: FormSchemaModel) => {
      if (uri.value === schema.uri) return;
      uri.value = schema.uri;
      console.log('init', schema.uri);
    };

    const deleteFn = async <T>(data: T & { id?: string }) => {
      await httpStore.delete(`${uri.value}/${data.id}`);
    };

    return {
      init,
      save,
      delete: deleteFn,
    };
  })();
