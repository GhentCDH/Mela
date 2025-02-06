import type { MelaAnnotation } from './w3c/types';

const _demoOriginal = [
  {
    id: '8e1a3cc7-ddbe-4ef1-9b6e-cfb975fdd9a4',
    start: 1,
    end: 14,
    target: 'text',
    weight: 0,
    metadata: {
      type: 'title',
      translation: {
        id: 'cff5aed6-33e1-4231-a2dc-ca6208964b0b',
        start: 1,
        end: 28,
        target: 'text',
        weight: 0,
      },
    },
  },
  {
    id: '9873e35a-d8f9-4396-a591-509aefb544d2',
    start: 20,
    end: 28,
    target: 'text',
    weight: 0,
    metadata: {
      type: 'subtitle',
      translation: {
        id: 'ca8e9dce-1f40-43c6-83aa-70673d2f317e',
        start: 34,
        end: 42,
        target: 'text',
        weight: 0,
      },
    },
  },
  {
    id: '13e6cc7e-8b38-49ee-b3c9-cb593120a128',
    start: 38,
    end: 151,
    target: 'text',
    weight: 0,
    metadata: {
      type: 'phrase',
      translation: {
        id: '6512705b-d513-4bff-bbee-1ac823875df1',
        start: 56,
        end: 184,
        target: 'text',
        weight: 0,
      },
    },
  },
  {
    id: '74b0d6b9-d1a8-4153-9515-62a8c2b22d77',
    start: 31,
    end: 1141,
    target: 'text',
    weight: 0,
    metadata: {
      type: 'paragraph',
      translation: {
        id: 'd8988a92-58bc-44ca-9ce7-cf62cd1ccf2d',
        start: 46,
        end: 1286,

        target: 'text',
        weight: 0,
      },
    },
  },
] as unknown as MelaAnnotation[];

export const demoOriginal = _demoOriginal;
