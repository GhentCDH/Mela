export type AnnotationEventType =
  | 'click-outside'
  | 'click-annotation'
  | 'create--start'
  | 'create--end'
  | 'create--changing'
  | 'update--start'
  | 'update--end'
  | 'update--changing';

export type AnnotationEventHandlerPayloadData<PAYLOAD> = {
  annotationId: string;
  target: string;
  payload: PAYLOAD;
} & any;

export type AnnotationEmits = {
  onEvent: [
    type: AnnotationEventType,
    payload: AnnotationEventHandlerPayloadData<any>,
  ];
};
