import type { Annotation } from '@ghentcdh/mela/generated/types';
import {
  findTagging,
  findTextPositionSelector,
} from '@ghentcdh/vue-component-annotated-text';

import { findTextValue } from './translation';
import type { AnnotationType } from '../../identify.color';

// Type, can have children xxx
export const treeOrder: Record<AnnotationType, AnnotationType[]> = {
  lemma: [],
  paragraph: ['title', 'subtitle', 'phrase'],
  title: ['example'],
  subtitle: ['example'],
  phrase: ['example'],
  example: ['lemma'],
};

export const parentOrder: Record<AnnotationType, AnnotationType[]> = {
  lemma: ['example'],
  paragraph: [],
  title: ['paragraph'],
  subtitle: ['paragraph'],
  phrase: ['paragraph'],
  example: ['title', 'subtitle', 'phrase'],
};

export type TreeProp = {
  id: string;
  type: AnnotationType;
  start: number;
  end: number;
  content: string;
  parent: TreeProp | null;
  children: TreeProp[];
};

const isParent = (value: TreeProp, parent: TreeProp) => {
  let allowedTypes = parentOrder[value.type];
  if (!allowedTypes) {
    console.warn('type not found', value.type);
    allowedTypes = [];
  }

  if (!parent) return false;
  if (!allowedTypes.includes(parent.type)) return false;

  return isInRange(value, parent);
};

const findParent = (value: TreeProp, annotations: TreeProp[]) => {
  const found = annotations.find((a) => isParent(value, a));
  if (found) {
    return found;
  }
  return null;
};

const isInRange = (value1: TreeProp, value2: TreeProp) => {
  if (!value1 || !value2) return false;
  return (
    (value1.start >= value2.start && value1.start <= value2.end) ||
    (value1.end >= value2.start && value1.end <= value2.end)
  );
};

const createChildren = (property: TreeProp) => {
  if (property.children.length === 0) return property;

  const render = treeOrder[property.type];
  const rest = [];
  const children = [];
  property.children.forEach((child) => {
    if (render.includes(child.type)) {
      children.push(child);
    } else rest.push(child);
  });

  rest.forEach((child) => {
    const found = children.find((c) => isInRange(child, c));
    if (found) {
      found.children.push(child);
    } else {
      property.children.push(child);
    }
  });

  children.forEach((child) => createChildren(child));

  return { ...property, children };
};

export const createAnnotationTree = (
  sourceId: string,
  annotations: Annotation[],
) => {
  const mappedAnnotations = annotations
    .map((annotation) => {
      const purpose: AnnotationType = findTagging(annotation)
        ?.value as AnnotationType;

      if (!purpose) return;

      const selector = findTextPositionSelector(sourceId)(annotation);
      if (!selector) return;

      const text = findTextValue(annotation);
      const property: TreeProp = {
        id: annotation.id,
        type: purpose,
        start: selector.selector.start,
        end: selector.selector.end,
        content: text?.value,
        children: [],
        parent: null,
      };

      return property;
    })
    .filter((a) => !!a)
    .sort((a, b) => a.start - b.start);

  const childMap: Map<string, TreeProp[]> = new Map();
  const treeMap: Map<string, TreeProp> = new Map();

  const resultWithParent = mappedAnnotations.map((annotation) => {
    const parent = findParent(annotation, mappedAnnotations);

    if (parent) {
      const children = childMap.get(parent.id) ?? [];
      children.push(annotation);
      childMap.set(parent.id, children);
    }

    const withParent = { ...annotation, parent };

    treeMap.set(annotation.id, withParent);

    return withParent;
  });

  const addChildren = (annotation: TreeProp) => {
    const children = childMap.get(annotation.id);
    if (!children) return annotation;

    annotation.children = children.map(addChildren);

    return annotation;
  };

  const root = resultWithParent
    .filter((r) => r.parent === null)
    .map((r) => addChildren(r));

  return { childMap, treeMap, tree: root };
};

export class AnnotationTree {
  public tree: TreeProp[] = [];
  public childMap: Map<string, TreeProp[]> = new Map();
  public treeMap: Map<string, TreeProp> = new Map();

  constructor(
    private readonly sourceId: string,
    annotations: Annotation[],
  ) {
    this.updateAnnotations(annotations);
  }

  updateAnnotations(annotations: Annotation[]) {
    const calculated = createAnnotationTree(this.sourceId, annotations);
    this.childMap = calculated.childMap;
    this.treeMap = calculated.treeMap;
    this.tree = calculated.tree;
  }

  getTree() {
    return this.tree;
  }

  getTreeElement(id: string) {
    return this.treeMap.get(id);
  }

  getChildren(id: string) {
    return this.childMap.get(id) ?? [];
  }
}
