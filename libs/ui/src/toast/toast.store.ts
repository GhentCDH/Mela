import { defineStore } from 'pinia';
import { ref } from 'vue';

import { ToastMessage, ToastType } from './toast-message';

const NOTIFICATION_DURATION = 5000;

export const useNotificationStore = defineStore('toastStore', () => {
  const notifications = ref<ToastMessage[]>([]);

  const addNotification = (message: string, type: ToastType = 'info') => {
    const notification = {
      id: Date.now(),
      duration: NOTIFICATION_DURATION,
      message,
      type,
    };

    console.log('add notification', notification);
    notifications.value.push(notification);

    removeNotificationAfterDuration(notification);
  };

  const removeNotificationAfterDuration = (notification: ToastMessage) => {
    setTimeout(() => {
      removeNotification(notification.id);
    }, notification.duration);
  };

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    notifications,
    info: (message: string) => addNotification(message, 'info'),
    error: (message: string) => addNotification(message, 'error'),
    warning: (message: string) => addNotification(message, 'warning'),
    success: (message: string) => addNotification(message, 'success'),
    removeNotification,
  };
});
