import { CustomAnnotationStyle, MarkdownTextAdapter, W3CAnnotationAdapter } from '@ghentcdh/annotated-text';
import { AnnotationConfiguration, AnnotationDefinition } from '../types/AnnotationConfiguration.model';
import { defaultRender, defaultStyle, findPurpose } from '../style/annotation.style';
import { SourceModel } from '../types/source.model';

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

export const useAnnotationConfiguration = (props: {
  annotationDefinitions: AnnotationDefinition[];
}): AnnotationConfiguration => {
  const definitions = props.annotationDefinitions ?? [];
  const rootTypes = definitions
    .filter((d) => d.isRoot)
    .map((d) => ({
      key: d.id,
      label: d.label,
    }));
  const styles = groupById(definitions, 'style') as Record<
    string,
    CustomAnnotationStyle
  >;
  return {
    definitions,
    styles,
    rootTypes,
    tagLabelFn: findPurpose,
    textAdapter: () => MarkdownTextAdapter(),
    annotationAdapter: (source: SourceModel) =>
      W3CAnnotationAdapter({ sourceUri: source.uri }),
    styleParams: {
      styleFn: defaultStyle,
    },
    renderParams: {
      renderFn: defaultRender,
    },
  };
};
