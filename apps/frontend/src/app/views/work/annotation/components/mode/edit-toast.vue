<template>
  <div v-if="modeToast" class="toast toast-center z-[3000]">
    <div role="alert" class="alert border-primary bg-white">
      <span>{{ modeToast.text }}</span>
      <div class="flex gap-2">
        <Btn
          v-if="modeToast.deny"
          :color="Color.secondary"
          @click="modeToast.deny"
        >
          Close
        </Btn>
        <Btn v-if="modeToast.save" @click="modeToast.save"> Save </Btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { Btn, Color } from '@ghentcdh/ui';
import type { MODES } from './props';
import { useActiveAnnotationStore } from '../../../text-index/controls/annotate-text/store/active-annotation.store';
import { useModeStore } from '../../../text-index/controls/annotate-text/store/mode.store';
import { useWorkMenu } from '../../../work-menu.store';
import { useAnnotationStore } from '../../store/anntotation.store';

// Create a new store each time we have a new text
const properties = defineProps<{
  storeId: string;
}>();

const annotationStore = useAnnotationStore(properties.storeId);
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);
const modeStore = useModeStore();
const workMenuStore = useWorkMenu();

const modeToasts: Record<
  MODES,
  { deny?: () => void; save?: () => void; text: string }
> = {
  translate: {
    deny: () => modeStore.resetMode(),
    text: 'Select an annotation for translation',
  },
  link_buckets: {
    deny: () => modeStore.resetMode(),
    text: 'Select an annotation to link',
  },
};

const modeToast = computed(() =>
  modeStore.activeMode ? modeToasts[modeStore.activeMode] : null,
);

onMounted(() => {
  workMenuStore.setView('annotate');
  modeStore.registerOnResetFn(() => {
    activeAnnotationStore.selectAnnotation(null);
    // annotationStore.changeSelectionFilter({});
    // annotationStore.cancelNewAnnotations();
  });
  closeAnnotation();
});

const closeAnnotation = () => {
  activeAnnotationStore.selectAnnotation(null);
  // annotationStore.changeSelectionFilter({});
  // annotationStore.cancelNewAnnotations();
  modeStore.resetMode();
};
</script>
