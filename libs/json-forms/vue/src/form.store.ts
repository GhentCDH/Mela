import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useHttpStore } from '@ghentcdh/authentication/frontend';
import type { FormSchemaModel } from '@ghentcdh/tools/form';
import { Debugger } from '@ghentcdh/tools/logging/frontend';
import { useNotificationStore } from '@ghentcdh/ui';

// TODO add warnings, success, ....

export const useFormStore = (name: string) =>
  defineStore(`ghentCDH_form_${name}`, () => {
    const uri = ref<string | null>(null);
    const httpStore = useHttpStore();
    const notificationStore = useNotificationStore();

    const save = async <T>(id: string | null, data: T) => {
      if (!uri.value) return;

      const promise = id
        ? httpStore.patch(`${uri.value}/${id}`, data)
        : httpStore.post(uri.value, data);

      return promise
        .then(() => {
          notificationStore.success('Data saved');
        })
        .catch((error) => {
          Debugger.error(error);

          notificationStore.error('Error saving data');
        });
    };

    const init = (schema: FormSchemaModel) => {
      if (uri.value === schema.uri) return;
      uri.value = schema.uri;
    };

    const deleteFn = async <T>(data: T & { id?: string }) => {
      await httpStore
        .delete(`${uri.value}/${data.id}`)
        .then(() => {
          notificationStore.success('Data deleted');
        })
        .catch((error) => {
          Debugger.error(error);

          notificationStore.error('Error deleting data');
        });
    };

    return {
      init,
      save,
      delete: deleteFn,
    };
  })();
