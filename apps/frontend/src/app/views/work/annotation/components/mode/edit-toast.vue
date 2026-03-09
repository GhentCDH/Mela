<template>
  <div class="toast toast-center z-[3000]">
    <div
      role="alert"
      class="alert border-primary bg-white"
    >
      <span>{{ toastMessage }}</span>
      <div class="flex gap-2">
        <Btn
          v-if="action"
          :color="Color.secondary"
          @click="close()"
        >
          {{ action.label || 'Close' }}
        </Btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Btn, Color } from '@ghentcdh/ui';
import { useActiveAnnotationStore } from '../../../text-index/controls/annotate-text/store/active-annotation.store';
import { ToastData, useToast } from './useToast';

// Create a new store each time we have a new text
const properties = defineProps<
  {
    storeId: string;
  } & ToastData
>();
const activeAnnotationStore = useActiveAnnotationStore(properties.storeId);

const close = () => {
  activeAnnotationStore.selectAnnotation(null);
  properties.action?.onClick();
  useToast().closeToast();
};
</script>
