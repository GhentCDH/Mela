import type { Component, PropType } from 'vue';
import type { AnnotationModalFn } from './AnnotationModal.definition';

export type ModalStateDefinition = {
  key: string;
  component: Component;
  state: AnnotationModalFn<any, any, any>;
};

export type AnnotationModalConfig = {
  modals: ModalStateDefinition[];
  destroy: () => void;
  show: (modal: string, data: unknown) => void;
};

export const AnnotationModalProperties = {
  config: { type: Object as PropType<AnnotationModalConfig>, required: true },
};
