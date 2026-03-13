import { ExtractPublicPropTypes, PropType } from 'vue';

export type ToastAction = { label: string; onClick: () => void };

export const EditToastProperties = {
  toastMessage: { type: String, required: true },
  action: { type: Object as PropType<ToastAction>, required: false },
};

export type EditToast = ExtractPublicPropTypes<typeof EditToastProperties>;
