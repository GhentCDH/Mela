import {
  AnnotationModalConfig,
  ModalStateDefinition,
} from './AnnotationModal.properties';
import { ref } from 'vue';
import {
  AnnotationModalAction,
  AnnotationModalActionMap,
  annotationModalDefaults,
} from './AnnotationModal.defaults';
import { ModalDefinition } from './AnnotationModal.definition';

const createModalConfig = (
  modalDefinitions: Record<string, ModalDefinition> = {},
): AnnotationModalConfig => {
  const modalMap = new Map<string, ModalStateDefinition>();
  Object.entries(modalDefinitions).forEach(([key, { component, useFn }]) => {
    const modal: ModalStateDefinition = {
      key,
      component,
      state: useFn(),
    };
    modalMap.set(key, modal);
  });

  const show = (modal: string, data: unknown) => {
    const config = modalMap.get(modal);
    if (!config) {
      console.warn(`Modal ${modal} not found`);
      return;
    }

    config.state.show(data);
  };

  const modals = Array.from(modalMap.values());
  return {
    modals,
    show,
    destroy: () => modals.forEach((modal) => modal.state.close()),
  };
};

export const useAnnotationModal = () => {
  const config = ref<AnnotationModalConfig>(
    createModalConfig(annotationModalDefaults),
  );

  const setModalDefinitions = (
    modalDefinitions: Record<string, ModalDefinition> = {},
  ) => {
    const allDefs = { ...annotationModalDefaults, ...modalDefinitions };

    config.value = createModalConfig(allDefs);
  };

  const destroy = () => {
    config.value?.destroy();
  };

  const show = <K extends AnnotationModalAction>(
    modal: K,
    data: AnnotationModalActionMap[K]['show'],
  ) => {
    config.value?.show(modal, data);
  };

  const close = <K extends AnnotationModalAction>(
    modal: K,
    event: AnnotationModalActionMap[K]['closeEvent'],
  ) => {
    const modalState = config.value?.modals.find((m) => m.key === modal);
    modalState?.state.close(event);
  };

  return {
    config,
    setModalDefinitions,
    destroy,
    show,
    close,
  };
};
