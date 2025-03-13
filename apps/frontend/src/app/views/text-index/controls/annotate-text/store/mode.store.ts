import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ModalService } from '@ghentcdh/ui';

import type { MODES } from '../props';

const warningMessages: Record<MODES, string> = {
  generate:
    'Generated blocks will be removed. Are you sure you want to proceed?',
  'create-annotation':
    'Creation of annotation is in progress. Are you sure you want to proceed?',
  edit: 'Edit of annotation is in progress. Are you sure you want to proceed',
  translate:
    'Translation of annotation is in progress. Are you sure you want to proceed?',
  link_buckets:
    'Linking of buckets is in progress. Are you sure you want to proceed?',
};

export const useModeStore = defineStore('annotation_mode_store', () => {
  const activeMode = ref<MODES | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let onReset = () => {};

  const resetMode = () => {
    if (!activeMode.value) return;
    activeMode.value = null;
    onReset();
  };

  const changeMode = (mode: MODES | null, onSuccess?: () => void) => {
    return new Promise((resolve) => {
      const onChangeSuccess = () => {
        // TODO reset selected annotation
        // TODO reset selection filter
        activeMode.value = mode;
        onSuccess?.();
        resolve(true);
      };

      if (!activeMode.value || activeMode.value === mode) {
        onChangeSuccess();
        return;
      }
      ModalService.showConfirm({
        title: 'Warning',
        message: warningMessages[activeMode.value],
        onClose: (result) => {
          if (result.confirmed) onChangeSuccess();
          else resolve(false);
        },
      });
    });
  };

  return {
    activeMode,
    changeMode,
    resetMode,
    registerOnResetFn: (fn: () => void) => (onReset = fn),
  };
});
