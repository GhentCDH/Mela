import { useVanillaControl } from '@jsonforms/vue-vanilla';
import { computed, ref } from 'vue';

export type VanillaControlWrapper = {
  id: any;
  description: any;
  errors: any;
  label: any;
  visible: any;
  required: any;
  isFocused: any;
  isTouched: any;
};

export const useVanillaControlCustom = <
  I extends { control: any; handleChange: any },
>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v.value,
) => {
  const vanillaControl = useVanillaControl(input, adaptTarget);

  const isTouched = ref(false);

  const isFocused = ref(false);

  const onFocus = () => {
    isFocused.value = true;
  };

  const onBlur = () => {
    isTouched.value = true;
    isFocused.value = false;
  };

  const controlWrapper = computed(() => {
    return {
      ...vanillaControl.controlWrapper.value,
      isFocused: isFocused.value,
      isTouched: isTouched.value,
    } as VanillaControlWrapper;
  });

  return {
    ...vanillaControl,
    controlWrapper,
    isFocused,
    isTouched,
    onFocus,
    onBlur,
  };
};
