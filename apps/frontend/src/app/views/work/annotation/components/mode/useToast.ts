import { ref } from 'vue';
import { defineStore } from 'pinia';

export type ToastData = {
  toastMessage: string;
  action?: {
    label?: string;
    onClick: () => void;
  };
};

export const useToast = defineStore('use-toast', () => {
  const isVisible = ref(false);
  const data = ref<ToastData | null>(null);
  const closeToast = () => {
    isVisible.value = false;
    data.value = null;
  };

  const showToastMessage = (message: string) => {
    isVisible.value = true;
    data.value = { toastMessage: message };
  };

  const showToastWithAction = (
    message: string,
    action: ToastData['action'],
  ) => {
    isVisible.value = true;
    data.value = { toastMessage: message, action };
  };

  return { isVisible, data, closeToast, showToastMessage, showToastWithAction };
});
