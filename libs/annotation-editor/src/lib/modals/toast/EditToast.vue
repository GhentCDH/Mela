<template>
  <div class="toast toast-center z-[3000]">
    <div role="alert" class="alert border-primary bg-white">
      <span>{{ toastMessage }}</span>
      <div class="flex gap-2">
        <Btn v-if="action" :color="Color.secondary" @click="close()">
          {{ action.label || 'Close' }}
        </Btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Btn, Color } from '@ghentcdh/ui';
import { EditToastProperties } from './EditToast.properties';

// Create a new store each time we have a new text
const properties = defineProps(EditToastProperties);

const emits = defineEmits(['close']);

const close = () => {
  properties.action?.onClick();
  emits('close');
};

console.log('EditToast', properties);
</script>
