import type { EditToast } from './toast/EditToast.properties';
import {
  ModalDefinition,
  ModalTypeConfig,
} from './AnnotationModal.definition';
import { useEditToast } from './toast/useToast.composable';
import EditToastComponent from './toast/EditToast.vue';

export type AnnotationModalActionMap = {
  'edit-toast': ModalTypeConfig<EditToast, EditToast, void>;
};

export type AnnotationModalAction = keyof AnnotationModalActionMap;

export const annotationModalDefaults: Record<
  AnnotationModalAction,
  ModalDefinition
> = {
  'edit-toast': { component: EditToastComponent, useFn: useEditToast },
};
