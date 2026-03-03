<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { AnnotationInfoState } from './useAnnotationInfo';
import { getBody } from '@ghentcdh/annotated-text';

const properties = defineProps<{
  position: { x: number; y: number };
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
  if (cardRef.value && !cardRef.value.contains(e.target as Node)) {
    emit('close');
  }
}

const body = computed(() => {
  return getBody(properties?.data?.annotation);
});
</script>

<template>
  <div
    ref="cardRef"
    class="card bg-base-100 shadow-xl fixed z-50 "
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <div class="card-body p-2">
      <div class="rounded-box border border-base-content/5 bg-base-100">
        <table class="table table-zebra table-sm">
          <tbody>
            <tr
              v-for="b in body"
              :key="b.type + b.value"
            >
              <th>{{ b.type }}</th>
              <td>{{ b.purpose }}</td>
              <td>{{ b.value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <slot :data="data" />
      <div class="card-actions justify-end">
        <button
          class="btn btn-xs btn-ghost"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
