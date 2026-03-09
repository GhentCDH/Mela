<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { findPurpose } from '../../../../../style/annotation.style';
import { useAnnotationStore } from '../../store/anntotation.store';
import Navbar, { NavbarAction } from '../navbar.vue';
import { Alert, IconEnum } from '@ghentcdh/ui';
import { AnnotationType as Type } from '../../../text-index/controls/identify.color';
import { useAnnotationLink } from '../annotation-modal/useAnnotationLink';
import { AnnotationDefinition, useAnnotationDefStore } from '../../store/annotation-def.store';
import { getMetadata } from '../../utils/metadata';
import Metadata from './Metadata.vue';
import { useAnnotationSelect } from '../annotation-modal/useAnnotationSelect';
import { SourceModel, W3CAnnotation } from '@ghentcdh/annotated-text';
import { useToast } from '../mode/useToast';

const properties = defineProps<{
  position: { x: number; y: number };
  storeId: string;
  annotation: W3CAnnotation;
  source: SourceModel;
}>();
const annotationDefStore = useAnnotationDefStore();
const toastStore = useToast();
const annotationLink = useAnnotationLink();

const emit = defineEmits<{
  close: [];
}>();

const disabled = computed(() => {
  return annotationLink.isActive;
});

const cardRef = ref<HTMLElement>();
onMounted(() => {
  // document.addEventListener('click', handleOutsideClick);
});
onUnmounted(() => {
  // document.removeEventListener('click', handleOutsideClick);
});

function handleOutsideClick(e: MouseEvent) {
  if (disabled.value) return;

  if (cardRef.value && !cardRef.value.contains(e.target as Node)) {
    emit('close');
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
    disabled,
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
  const _disabled = disabled.value;
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
        annotationStore.deleteAnnotation(annotation.value!);
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
  console.log('parent', parentAnnotation);
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
      <Alert
        v-if="annotationLink.isActive"
        type="info"
        :message="toastStore.data?.toastMessage"
      />

      <Navbar :actions="actions" />
    </div>
  </div>
</template>
