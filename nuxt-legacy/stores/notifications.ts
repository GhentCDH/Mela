import type { Notification, NotificationCreate } from "~/types";

export const useNotifications = defineStore("notifications", () => {
  const notifications = ref<Notification[]>([]);

  function add(notification: NotificationCreate) {
    notification.id = Math.random();
    notifications.value.push(notification);
  }

  function addError(message: string) {
    add({ message, severity: "error", sticky: true });
  }

  function addSuccess(message: string) {
    add({ message, severity: "success", sticky: false });
  }

  function remove(id: string) {
    const index = notifications.value.findIndex(
      (notification) => notification.id === id,
    );
    if (index > -1) {
      notifications.value.splice(index, 1);
    }
  }

  return { notifications, add, addError, addSuccess, remove };
});
