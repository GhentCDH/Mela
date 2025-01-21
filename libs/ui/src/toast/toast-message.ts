export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastMessage = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};
