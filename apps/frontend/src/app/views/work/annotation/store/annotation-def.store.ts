import { defineStore } from 'pinia';
import { DataStore } from '../../../../repository/data.store';
import { useApi } from '@ghentcdh/tools-vue';
import { computed, ref } from 'vue';
import { AnnotationDef } from '@mela/generated-types';
import {
  createHighlightStyle,
  CustomAnnotationStyle,
} from '@ghentcdh/annotated-text';
import { fromJSONSchema } from 'zod';

export type FormValidationDef = {
  uiSchema: any;
  jsonSchema: any;
  validation: (value: any) => any;
};

export const useAnnotationDefStore = defineStore('annotationDefStore', () => {
  const schemaDefinitions = ref<Record<string, FormValidationDef>>({});
  const labels = ref<Record<string, string>>({});
  const styles = ref<Record<string, CustomAnnotationStyle>>({});

  const datastore = new DataStore<AnnotationDef[], null>({
    get: () =>
      useApi()
        .get('/annotation/def')
        .then((res) => {
          const _labels: Record<string, any> = {};
          const _schemaDefinitions: Record<string, FormValidationDef> = {};
          const _styles: Record<string, CustomAnnotationStyle> = {};

          res.data.forEach((def: AnnotationDef) => {
            const id = def.id as string;
            _labels[id] = def.name;

            _schemaDefinitions[id] = {
              uiSchema: def.ui_schema,
              jsonSchema: def.json_schema,
              validation: (value: any) => {
                if (value.jsonSchema) {
                  return fromJSONSchema(value.json_schema).parse(
                    value.uiSchema,
                  );
                }

                return value;
              },
            };

            _styles[id] = {
              default: createHighlightStyle(def.color),
              active: createHighlightStyle(def.color),
            };
          });

          labels.value = _labels;
          schemaDefinitions.value = _schemaDefinitions;
          styles.value = _styles;

          console.log(_labels);
          console.log(_schemaDefinitions);
          console.log(_schemaDefinitions);

          return res.data;
        }),
  });

  datastore.setId('id');

  return {
    data: computed(() => datastore.data.value),
    labels,
    schemaDefinitions,
    styles,
  };
});
