import { defineStore } from 'pinia';
import { Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const setValue = (
  refValue: Ref<string>,
  newValue: string,
  oldValue: string,
) => {
  if (newValue !== oldValue) {
    refValue.value = newValue;
  }
};

export const useRouteParams = defineStore(`route_params`, () => {
  const route = useRoute();
  const sectionId = ref<string>('');
  const workId = ref<string>('');

  const setValues = (params: Record<string, string>) => {
    setValue(sectionId, params.sectionId, sectionId.value);
    setValue(workId, params.workId, sectionId.value);
  };
  setValues(route.params);

  watch(
    () => route.params,
    () => {
      setValues(route.params);
    },
  );

  // watch(
  //   () => route.params.sectionId,
  //   (newId, oldId) => {
  //     if (newId !== oldId) sectionId.value = newId as string;
  //   },
  // );
  // watch(
  //   () => route.params.workId,
  //   (newId, oldId) => {
  //     if (newId !== oldId) workId.value = newId as string;
  //   },
  // );

  return { sectionId, workId };
});
