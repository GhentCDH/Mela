<template>
  <template v-if="modalService.showModal.value">
    <component
      :is="modal?.component"
      v-bind="modal?.props"
      :open="true"
      @close-modal="modal?.props.onClose"
    />
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { ModalService } from './modal.service';

const modalService = ModalService.getInstance();

const modal = computed(() =>
  modalService.showModal.value ? modalService.modal : null,
);
</script>
