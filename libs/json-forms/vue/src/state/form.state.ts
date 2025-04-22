export type FormEventType = any;
export type FormEventListener = (type: FormEventType, data: any) => void;

class FormState {
  static instance: FormState;

  private readonly events = new Map<string, FormEventListener>();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new FormState();
    }
    return this.instance;
  }

  registerEventListener(formName: string, callback: FormEventListener) {
    this.events.set(formName, callback);
  }

  dispatchEvent(formName: string, event: FormEventType, data: any) {
    for (const [key, callback] of this.events.entries()) {
      //TODO  if (key === formName) {
      callback(event, data);
      // }
    }
  }
}

export const useFormState = (form: any) => {
  return FormState.getInstance();
};
