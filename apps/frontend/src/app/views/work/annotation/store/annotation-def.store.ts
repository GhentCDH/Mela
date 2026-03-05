import { defineStore } from 'pinia';
import { DataStore } from '../../../../repository/data.store';
import { useApi } from '@ghentcdh/tools-vue';
import { computed } from 'vue';
import { AnnotationDef } from '@mela/generated-types';
import {
  createHighlightStyle,
  createUnderlineStyle,
  CustomAnnotationStyle,
} from '@ghentcdh/annotated-text';

export const useAnnotationDefStore = defineStore('annotationDefStore', () => {
  const datastore = new DataStore<AnnotationDef[], null>({
    get: () =>
      useApi()
        .get('/annotation/def')
        .then((res) => res.data),
  });

  datastore.setId('id');

  const find = (id: string | null) =>
    computed(() => {
      if (!id) return '';
      return datastore.data.value.find((def) => def.id === id);
    });

  const getLabel = (id: string | null) => {
    if (!id) return '';
    return computed(() => find(id).value?.name);
  };

  const styles = computed(() => {
    const values = datastore.data.value;

    return values.reduce(
      (acc, value) => {
        acc[value.id] = {
          default: createUnderlineStyle(value.color),
          active: createHighlightStyle(value.color),
        };
        return acc;
      },
      {
        default: {
          default: createHighlightStyle('#464850'),
        },
      } as Record<string, CustomAnnotationStyle>,
    );
  });

  return {
    data: computed(() => datastore.data.value),
    getLabel: getLabel,
    styles,
  };
});
