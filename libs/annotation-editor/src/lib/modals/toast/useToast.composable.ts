import { reactive, toRefs } from 'vue';
import { EditToast } from './EditToast.properties';
import { UseAnnotationModal } from '../AnnotationModal.definition';

export const useEditToast: UseAnnotationModal<EditToast> = () => {
  const state = reactive<{ isVisible: boolean; data: EditToast | null }>({
    isVisible: false,
    data: null,
  });

  const closeToast = () => {
    state.isVisible = false;
    state.data = null;
  };

  const show = (data: EditToast) => {
    state.isVisible = true;
    state.data = data;
  };

  return {
    ...toRefs(state),
    close: closeToast,
    show,
  };
};
