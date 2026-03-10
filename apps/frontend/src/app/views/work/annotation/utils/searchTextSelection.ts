import {
  findTextPositionSelector,
  getTarget,
  SourceModel,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';

export const searchTextSelection = (
  annotation: W3CAnnotation,
  sources: SourceModel[],
) => {
  if (!annotation) return null;
  console.log(annotation);
  console.log(annotation.target);
  const sourceUri = getTarget(annotation)?.find((t) => t.source)?.source;

  if (!sourceUri) {
    console.log('no source uri');
    return null;
  }

  const textPositionSelector = findTextPositionSelector(sourceUri)(annotation)!;
  const text = sources.find((s) => s.uri === sourceUri)!;

  return { textPositionSelector, text };
};
