import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MODES } from '../props';
import { ModalService } from '@ghentcdh/ui';

const warningMessages: Record<MODES, string> = {
  generate:
    'Generated blocks will be removed. Are you sure you want to proceed?',
  'create-annotation':
    'Creation of annotation is in progress. Are you sure you want to proceed?',
  edit: 'Edit of annotation is in progress. Are you sure you want to proceed',
};

export const useModeStore = defineStore('annotation_mode_store', () => {
  const activeMode = ref<MODES | null>(null);

  const resetMode = () => {
    activeMode.value = null;
  };

  const changeMode = (mode: MODES, onSuccess?: () => void) => {
    return new Promise((resolve) => {
      console.log('change mode', mode);
      const onChangeSuccess = () => {
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
        message: warningMessages[mode],
        onClose: (result) => {
          if (result.confirmed) onChangeSuccess();
          else resolve(false);
        },
      });
      // TODO add warning
    });
  };

  return { activeMode, changeMode, resetMode };
});
