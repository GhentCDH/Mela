import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export type StepperEventTypes = 'changeStep' | 'submit';

export type StepperEvent = {
  nextStep: number;
  activeStep: number;
};

export type StepperEventListener = (
  event: StepperEventTypes,
  value: StepperEvent,
) => void;

// TODO make it unique for a from
export const useStepperStore = () =>
  defineStore('ghentCDH_form_stepper', () => {
    const stepQuery = useRoute()?.query?.step;
    const router = useRouter();
    let step = 1;
    let eventListener: StepperEventListener = () => {
      return;
    };

    if (stepQuery) {
      step = parseInt(stepQuery as string);
      step = step > 0 ? step : 1;
    }
    const activeStep = ref(step);

    const changeStep = (step: number) => {
      if (step < 1) return;

      eventListener('changeStep', {
        nextStep: step,
        activeStep: activeStep.value,
      });
      activeStep.value = step;
      router?.replace({
        query: { step: step },
      });
    };

    const submit = () => {
      eventListener('submit', {
        nextStep: activeStep.value,
        activeStep: activeStep.value,
      });
    };

    return {
      activeStep,
      changeStep,
      submit,
      previous: () => {
        changeStep(activeStep.value - 1);
      },
      next: () => {
        changeStep(activeStep.value + 1);
      },
      registerListener: (event: StepperEventListener) => {
        eventListener = event;
      },
    };
  })();
