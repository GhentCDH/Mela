import {
  AnnotationAdapter,
  BaseAnnotation,
  CustomAnnotationStyle,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { IconEnumDef } from '@ghentcdh/ui';
import { UISchemaElement } from '@jsonforms/core';
import type { JsonFormsLayout } from '@ghentcdh/json-forms-core';
import { tagLabelFn } from '@ghentcdh/annotated-text/lib/tag/TagRenderer';
import { TextAdapter } from '@ghentcdh/annotated-text/lib/adapter/text';
import { RenderParams } from '@ghentcdh/annotated-text/lib/adapter/annotation/renderer/annotation-render';
import { AnnotationStyleParams } from '@ghentcdh/annotated-text/lib/adapter/annotation';

type KeyLabel<KEY = string> = { key: KEY; label: string; icon?: IconEnumDef };

export type FormValidationDef = {
  uiSchema: UISchemaElement;
  jsonSchema: JsonFormsLayout;
  metaDataSchema: JsonFormsLayout;
  validation: (value: any) => any;
};

export type AnnotationDefinition = {
  id: string;
  schema: FormValidationDef;
  label: string;
  style: CustomAnnotationStyle;
  allowedChildren: Array<KeyLabel<string>>;
  allowedLinks: Array<KeyLabel<string>>;
  isRoot?: boolean;
};

export type AnnotationConfiguration<
  ANNOTATION extends BaseAnnotation = W3CAnnotation,
> = {
  definitions: AnnotationDefinition[];
  styles: Record<string, CustomAnnotationStyle>;
  rootTypes: Array<KeyLabel>;
  tagLabelFn: tagLabelFn<ANNOTATION> | null;
  textAdapter: () => TextAdapter;
  annotationAdapter: () => AnnotationAdapter<ANNOTATION>;
  renderParams: Partial<RenderParams<ANNOTATION>>;
  styleParams: Partial<AnnotationStyleParams<ANNOTATION>>;
};
