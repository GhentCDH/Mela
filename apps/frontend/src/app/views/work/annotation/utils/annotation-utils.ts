import {
  findTextPositionSelector,
  getTarget,
  W3CAnnotation,
} from '@ghentcdh/annotated-text';
import { findPurposeLowerCase } from '../../../../style/annotation.style';
import { allowedChildrenPerType } from '../../text-index/controls/identify.color';

type AnnotationPositionTree = {
  id: string;
  allowedChildren: string[];
  sourceUri: string;
  start: number;
  end: number;
  type: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

const getAnnotationPosition = (annotation: W3CAnnotation) => {
  const sourceUri = getTarget(annotation).find((t) => t.source)?.source;

  // skip this annotation if it doesn't have a source URI
  if (!sourceUri) {
    return null;
  }
  const textPositionSelector = findTextPositionSelector(sourceUri)(annotation);

  // If no text position selector, skip this annotation
  if (!textPositionSelector) {
    return null;
  }

  const type = findPurposeLowerCase(annotation);

  return {
    id: annotation.id,
    start: textPositionSelector.start,
    end: textPositionSelector.end,
    allowedChildren: allowedChildrenPerType[type] ?? [],
    sourceUri,
    type,
    w3cAnnotation: annotation,
    minX: textPositionSelector.start,
    minY: 0,
    maxX: textPositionSelector.end,
    maxY: 0,
  };
};

const mapToAnnotationPositions = (annotations: W3CAnnotation[]) => {
  const annotationIdMap = new Map<string, W3CAnnotation>();
  const annotationsWithPositons: Array<AnnotationPositionTree> = [];

  annotations.forEach((annotation) => {
    annotationIdMap.set(annotation.id, annotation);
    const position = getAnnotationPosition(annotation);
    if (position) {
      annotationsWithPositons.push(position);
    }
  });

  return { annotationIdMap, annotationsWithPositons };
};

const rootId = 'ROOT';

const buildChildParentMap = (annotations: W3CAnnotation[]) => {
  const { annotationIdMap, annotationsWithPositons } = mapToAnnotationPositions(
    annotations ?? [],
  );
  const childParentMap = new Map<string, W3CAnnotation | null>();
  const parentChildMap = new Map<string, W3CAnnotation[]>();

  annotationsWithPositons.forEach((annotation) => {
    console.group(annotation.type);
    console.log(annotation.start, annotation.end);
    // Find annotations that fully contain this annotation
    const parents = annotationsWithPositons
      .filter(
        (a: AnnotationPositionTree) =>
          a.id !== annotation.id &&
          a.sourceUri === annotation.sourceUri &&
          a.start <= annotation.start &&
          a.end >= annotation.end &&
          a.allowedChildren.includes(annotation.type),
      )
      // Pick the tightest parent (smallest containing range)
      .sort(
        (a: AnnotationPositionTree, b: AnnotationPositionTree) =>
          a.end - a.start - (b.end - b.start),
      );
    console.log(parents);
    const parentAnnotation = parents[0];
    const parentId = parentAnnotation?.id ?? rootId;
    const children = parentChildMap.get(parentId) ?? [];
    children.push(annotationIdMap.get(annotation.id)!);
    parentChildMap.set(parentAnnotation?.id ?? rootId, children);
    childParentMap.set(annotation.id, annotationIdMap.get(parentId) ?? null);

    console.log(childParentMap.get(annotation.id));
    console.log(parentId);
    // parentChildMap.set(parentAnnotation.id, [annotation]);

    console.groupEnd();
  });

  return { childParentMap, parentChildMap, annotationIdMap };
};

export const annotationUtils = (annotations: W3CAnnotation[]) => {
  console.group('annotationUtils', annotations?.length);
  const { childParentMap, parentChildMap, annotationIdMap } =
    buildChildParentMap(annotations);
  console.groupEnd();
  return {
    getAnnotation: (id: string) => annotationIdMap.get(id),
    getParent: (annotation: W3CAnnotation) =>
      childParentMap.get(annotation.id) ?? null,
    getChildren: (annotation: W3CAnnotation) =>
      parentChildMap.get(annotation.id) ?? {},
  };
};
