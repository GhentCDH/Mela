import { computed, ref } from 'vue';

export const ReloadRef = () => {
  const reload = ref(Date.now());

  return {
    reload: () => {
      reload.value = Date.now();
    },
    watchReload: computed(() => reload.value),
  };
};
