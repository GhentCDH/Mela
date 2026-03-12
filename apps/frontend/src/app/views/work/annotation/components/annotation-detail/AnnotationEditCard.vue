<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { findPurpose } from '../../../../../style/annotation.style';
import { useAnnotationStore } from '../../store/anntotation.store';
import Navbar from '../navbar.vue';
import type { NavbarAction } from '../navbar.properties';
import { Alert, IconEnum } from '@ghentcdh/ui';
import { AnnotationType as Type } from '../../../text-index/controls/identify.color';
import { useAnnotationLink } from '../annotation-modal/useAnnotationLink';
import {
  AnnotationDefinition,
  useAnnotationDefStore,
} from '../../store/annotation-def.store';
import { getMetadata } from '../../utils/metadata';
import Metadata from './Metadata.vue';
import { useAnnotationSelect } from '../annotation-modal/useAnnotationSelect';
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';
import { useToast } from '../mode/useToast';
import LinksDetail from './LinksDetail.vue';
import { useAnnotationEditStore } from './AnnotationEdit.store';

const properties = defineProps<{
  position: { x: number; y: number };
  storeId: string;
  annotation: W3CAnnotation;
  source: SourceModel;
}>();
const annotationDefStore = useAnnotationDefStore();
const toastStore = useToast();
const annotationEditStore = useAnnotationEditStore();

const emit = defineEmits<{
  close: [];
}>();
const closeNextClick = ref(true);
const cardRef = ref<HTMLElement>();
onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

watch(
  () => properties.annotation,
  () => {
    closeNextClick.value = false;
    console.log('watch');
    console.log(properties.annotation);
  },
);

function handleOutsideClick(e: MouseEvent) {
  if (annotationEditStore.disabled) return;
  if (closeNextClick.value) {
    closeNextClick.value = false;
    return;
  }

  if (cardRef.value && !cardRef.value.contains(e.target as Node)) {
    console.log('close');
    // emit('close');
  }
}
const annotationDef = computed(() => {
  return annotationDefStore.definition[purpose.value];
});
const validation = computed(() => {
  return annotationDef.value.schema;
});

const metadata = computed(() => {
  return getMetadata(properties.annotation, validation.value);
});

const annotation = computed(() => properties.annotation);
const purpose = computed(() => {
  return annotation.value ? findPurpose(annotation.value) : 'default';
});

const annotationStore = useAnnotationStore(properties.storeId);

const addActions = (definition: AnnotationDefinition, _disabled: boolean) => {
  const actions = definition.allowedChildren;

  if (actions.length === 0) return null;

  if (actions.length === 1) {
    const action = actions[0];
    return {
      icon: IconEnum.Plus,
      disabled: _disabled,
      label: `Add ${action.label}`,
      action: () => {
        createAnnotation(action.key);
      },
    };
  }

  return {
    icon: IconEnum.Plus,
    label: 'Add',
    disabled: _disabled,
    children: actions.map((action) => ({
      label: action.label,
      action: () => {
        createAnnotation(action.key);
      },
    })),
  };
};

const createActionLinks = (
  definition: AnnotationDefinition,
  disabled: boolean,
) => {
  return definition.allowedLinks.map((link) => ({
    icon: link.icon ?? IconEnum.Link,
    label: `Add ${link.label}`,
    disabled,
    action: () => {
      useAnnotationLink().startLink(link.key, annotation.value);
    },
  }));
};

const actions: NavbarAction = computed(() => {
  const definition = annotationDef.value;
  const _disabled = annotationEditStore.disabled;
  const _purpose = purpose.value;
  return [
    addActions(definition, _disabled),
    {
      icon: IconEnum.Edit,
      label: 'Edit',
      disabled: _disabled,
      action: () => {
        editAnnotation(_purpose);
      },
    },
    createActionLinks(definition, _disabled),
    {
      icon: IconEnum.Delete,
      label: 'Delete',
      disabled: _disabled,
      action: () => {
        annotationStore.deleteAnnotation(annotation.value!).then((success) => {
          if (success) emit('close');
        });
      },
    },
  ]
    .filter((i) => !!i)
    .flat();
});

const createAnnotation = (annotationType: Type) => {
  useAnnotationSelect().createAnnotation({
    source: properties.source,
    parentAnnotation: properties.annotation,
    type: annotationType,
  });
};
const editAnnotation = () => {
  const parentAnnotation =
    annotationStore.utils.getParent(properties.annotation) ?? undefined;

  useAnnotationSelect().editAnnotation(
    {
      source: properties.source,
      type: purpose.value!,
      parentAnnotation,
    },
    properties.annotation,
  );
};

const purposeLabel = computed(() => {
  return annotationDef.value?.label;
});
</script>

<template>
  <div
    ref="cardRef"
    class="card bg-base-100 shadow-xl fixed z-50"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <div class="card-body p-2">
      <div><strong>Type:</strong> {{ purposeLabel }}</div>
      <Metadata
        v-if="metadata && validation.metaDataSchema"
        :data="metadata"
        :schema="validation.jsonSchema"
        :ui-schema="validation.metaDataSchema"
      />
      <LinksDetail
        :store-id="storeId"
        :annotation="annotation"
      />
      <Alert
        v-if="toastStore.isVisible"
        type="info"
        :message="toastStore.data?.toastMessage"
      />

      <Navbar :actions="actions" />
    </div>
  </div>
</template>
