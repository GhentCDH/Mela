<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnnotationInfoState } from './useAnnotationInfo';
import { getBody } from '@ghentcdh/annotated-text';
import { findPurpose } from '../../../../../style/annotation.style';
import { useAnnotationStore } from '../../store/anntotation.store';
import Navbar, { NavbarAction } from '../navbar.vue';
import { IconEnum } from '@ghentcdh/ui';
import {
  addActionsPerType,
  AnnotationType as Type,
  AnnotationTypeLabelValue
} from '../../../text-index/controls/identify.color';
import {
  ModalSelectionService
} from '../../../text-index/controls/annotate-text/view/selection/modal-selection.service';
import { useModeStore } from '../../../text-index/controls/annotate-text/store/mode.store';
import { useAnnotationTranslation } from '../annotation-translation/useAnnotationTranslation';

const properties = defineProps<{
  position: { x: number; y: number };
  storeId: string;
  data?: AnnotationInfoState;
}>();

const emit = defineEmits<{
  close: [];
}>();

const cardRef = ref<HTMLElement>();
onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

function handleOutsideClick(e: MouseEvent) {
  if (useModeStore().activeMode) return;

  if (cardRef.value && !cardRef.value.contains(e.target as Node)) {
    emit('close');
  }
}

const body = computed(() => {
  return getBody(properties?.data?.annotation);
});
const annotation = computed(() => properties.data?.annotation);
const purpose = computed(() => {
  return annotation.value ? findPurpose(annotation.value) : '';
});
const annotationStore = useAnnotationStore(properties.storeId);
const modeStore = useModeStore();

const sentenceActions = {
  children: [
    {
      label: 'Add title',
      action: () => {
        createAnnotation('title');
      },
    },
    {
      label: 'Add subtitle',
      action: () => {
        createAnnotation('subtitle');
      },
    },
    {
      label: 'Add phrase',
      action: () => {
        createAnnotation('phrase');
      },
    },
  ],
};

const addActions = computed(() => {
  const disabled = !!modeStore.activeMode;
  const actions = addActionsPerType[purpose.value];
  if (actions.length === 1)
    return {
      icon: IconEnum.Plus,
      disabled,
      label: `Add ${AnnotationTypeLabelValue[actions[0]].label}`,
      action: () => {
        createAnnotation(actions[0]);
      },
    };

  return {
    icon: IconEnum.Plus,
    label: 'Add',
    disabled,
    children: actions.map((action) => ({
      label: AnnotationTypeLabelValue[action].label,
      action: () => {
        createAnnotation(action);
      },
    })),
  };
});

const actions: NavbarAction = computed(() => {
  const disabled = !!modeStore.activeMode;
  return [
    addActions.value,
    {
      icon: IconEnum.Edit,
      label: 'Edit',
      disabled,
      action: () => {
        editAnnotation(purpose.value);
      },
    },
    {
      icon: IconEnum.Edit,
      // TODO icon: IconEnum.Translate,
      label: 'Add translation link',
      disabled,
      action: () => {
        useAnnotationTranslation().startTranslation(annotation.value);
      },
    },
    {
      icon: IconEnum.Delete,
      label: 'Delete',
      disabled,
      action: () => {
        annotationStore.deleteAnnotation(annotation.value!);
      },
    },
  ];
});

const createAnnotation = (annotationType: Type) => {
  ModalSelectionService.createSelection({
    source: properties.data?.source,
    parentAnnotation: properties.data?.annotation,
    annotationType,
    storeId: properties.storeId,
    onClose: (result) => {},
  });
};
const editAnnotation = (annotationType: Type) => {
  ModalSelectionService.editSelection({
    source: properties.data?.source,
    annotation: properties.data?.annotation,
    // TODO find parent if there is one
    // parentAnnotation: properties.data?.annotation,
    annotationType,
    storeId: properties.storeId,
    onClose: (result) => {},
  });
};
</script>

<template>
  <div
    ref="cardRef"
    class="card bg-base-100 shadow-xl fixed z-50"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <div class="card-body p-2">
      <div><strong>Type:</strong> {{ purpose }}</div>
      <div v-if="modeStore.activeMode">
        Action in progress
      </div>
      <Navbar :actions="actions" />
    </div>
  </div>
</template>
