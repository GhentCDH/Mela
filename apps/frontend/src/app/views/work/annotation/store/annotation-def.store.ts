import { defineStore } from 'pinia';
import { useApi } from '@ghentcdh/tools-vue';
import { computed, ref } from 'vue';
import { AnnotationDef } from '@mela/generated-types';
import {
  createHighlightStyle,
  CustomAnnotationStyle,
} from '@ghentcdh/annotated-text';
import { IconEnum, IconEnumDef } from '@ghentcdh/ui';
import { fromJSONSchema } from 'zod';
import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import { UISchemaElement } from '@jsonforms/core';

export type FormValidationDef = {
  uiSchema: UISchemaElement;
  jsonSchema: JsonFormsLayout;
  metaDataSchema: JsonFormsLayout;
  validation: (value: any) => any;
};
export const icons = {
  link_bucket: IconEnum.Link,
  translation: IconEnum.Language,
};
// TODO move this to shared
export const allowedChildrenPerType: Record<string, string[]> = {
  example: ['lemma'],
  lemma: [],
  paragraph: ['phrase', 'title', 'subtitle'],
  phrase: ['example'],
  subsection: ['phrase', 'title', 'subtitle'],
  subtitle: ['example'],
  title: ['example'],
  root: ['subsection', 'paragraph'],
};

// TODO move this to shared
export const allowedLinksPerType: Record<string, string[]> = {
  example: ['translation'],
  lemma: ['link_bucket'],
  paragraph: ['translation'],
  phrase: ['translation'],
  subsection: ['translation'],
  subtitle: ['translation'],
  title: ['translation'],
};

type KeyLabel<KEY = string> = { key: KEY; label: string; icon?: IconEnumDef };
export type AnnotationDefinition = {
  id: string;
  schema: FormValidationDef;
  label: string;
  style: CustomAnnotationStyle;
  allowedChildren: Array<KeyLabel<string>>;
  allowedLinks: Array<KeyLabel<'translation' | 'link_bucket'>>;
};

const getDefinition = (
  def: AnnotationDef,
  labels: KeyLabel[],
): AnnotationDefinition => {
  return {
    id: def.id,
    schema: {
      uiSchema: def.ui_schema,
      jsonSchema: def.json_schema,
      metaDataSchema: def.metadata_schema,
      validation: (value: any) => {
        if (value.jsonSchema) {
          return fromJSONSchema(value.json_schema).parse(value.uiSchema);
        }

        return value;
      },
    },
    label: def.name,
    style: {
      default: createHighlightStyle(def.color),
      active: createHighlightStyle(def.color),
    },
    allowedChildren: (allowedChildrenPerType[def.id] ?? [])
      .map((key) => labels.find((k) => k.key === key))
      .filter(Boolean),
    allowedLinks: (allowedLinksPerType[def.id] ?? [])
      .map((key) => labels.find((k) => k.key === key))
      .filter(Boolean),
  } as AnnotationDefinition;
};

const groupById = <KEY extends keyof AnnotationDefinition>(
  defs: AnnotationDefinition[],
  valueKey?: KEY,
) => {
  return defs.reduce(
    (acc, def) => {
      acc[def.id] = valueKey ? def[valueKey] : def;
      return acc;
    },
    {} as Record<string, AnnotationDefinition[KEY] | AnnotationDefinition>,
  );
};

export const useAnnotationDefStore = defineStore('annotationDefStore', () => {
  const annotationDefData = ref<AnnotationDef[]>();

  const init = () =>
    useApi()
      .get('/annotation/def')
      .then((res) => {
        annotationDefData.value = res.data;
      });

  const definition = computed(() => {
    return groupById(definitions.value) as Record<string, AnnotationDefinition>;
  });

  const styles = computed(() => {
    return groupById(definitions.value, 'style') as Record<
      string,
      CustomAnnotationStyle
    >;
  });

  const definitions = computed(() => {
    const defs = annotationDefData.value;
    if (!defs) return [];
    const keyLabels = defs.map((d) => ({
      key: d.id,
      label: d.name,
      icon: icons[d.id],
    }));
    return defs.map((d) => getDefinition(d, keyLabels));
  });

  return {
    init,
    definition,
    definitions,
    data: annotationDefData,
    styles,
    allowedChildrenRoot: allowedChildrenPerType.root,
  };
});
