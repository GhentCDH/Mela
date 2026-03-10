import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnnotationEditStore = defineStore('use-annotation-edit', () => {
  const isEditing = ref(false);
  const disableEdit = ref(false);

  const startEdit = () => {
    isEditing.value = true;
    disableEdit.value = true;
  };
  const endEdit = () => {
    isEditing.value = false;
    disableEdit.value = false;
  };

  return { isEditing, start: startEdit, end: endEdit, disabled: disableEdit };
});
