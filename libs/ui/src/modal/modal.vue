<template>
  <dialog :id="id" class="modal">
    <div :class="[`modal-box bg-white`, ModalSize[width]]">
      <button
        v-if="!disableClose"
        type="button"
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="closeModal"
      >
        ✕
      </button>
      <h3 class="font-bold">
        {{ modalTitle }}
      </h3>
      <div class="pt-4">
        <slot name="content" />
      </div>
      <div class="modal-action">
        <slot name="actions" />
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { Size } from '../const';

// Dictionary of Modal size classes
const ModalSize: Record<Size, string> = {
  xs: 'max-w-xs w-[50VW]',
  sm: 'max-w-sm w-[50VW]',
};

const properties = withDefaults(
  defineProps<{
    modalTitle: string;
    buttonLabel?: string;
    buttonSaveLabel?: string;
    data?: any;
    open: boolean;
    disableClose?: boolean;
    width?: Size;
  }>(),
  { open: false, disableClose: false, width: Size.sm },
);

const id = `modal_${Math.floor(Math.random() * 1000)}`;

const emits = defineEmits<{
  closeModal: [];
}>();

const openModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal?.showModal();
};

const closeModal = () => {
  const modal = document.getElementById(id) as HTMLDialogElement;
  modal?.close();
  emits('closeModal');
};

defineExpose({ closeModal, openModal });

watch(
  () => properties.open,
  (value, oldValue, onCleanup) => {
    if (properties.open) openModal();
    else closeModal();
  },
);

onMounted(() => {
  if (properties.open) openModal();
});
</script>
