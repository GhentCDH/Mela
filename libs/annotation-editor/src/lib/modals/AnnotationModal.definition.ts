import type { Component, Ref } from 'vue';

export type ModalTypeConfig<
  DATA = void,
  SHOW_DATA = DATA,
  CLOSE_EVENT = void,
> = {
  data: DATA;
  show: SHOW_DATA;
  closeEvent: CLOSE_EVENT;
};

export type AnnotationModalFn<
  DATA = any,
  SHOW_DATA = DATA,
  CLOSE_EVENT = void,
> = {
  isVisible: Ref<boolean>;
  data: Ref<DATA>;
  close: (event: CLOSE_EVENT) => void;
  show: (data: SHOW_DATA) => void;
};

export type UseAnnotationModal<
  DATA = any,
  SHOW_DATA = DATA,
  CLOSE_EVENT = void,
> = () => AnnotationModalFn<DATA, SHOW_DATA, CLOSE_EVENT>;

export type ModalDefinition = {
  component: Component;
  useFn: UseAnnotationModal<any, any, any>;
};
